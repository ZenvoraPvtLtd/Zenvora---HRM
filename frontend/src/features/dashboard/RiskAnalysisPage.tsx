import {
  Shield,
  FileText,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  BookOpen,
  Target,
  Zap,
  Loader2,
  Users,
  RefreshCw,
} from "lucide-react";
import { useState, useEffect } from "react";

interface RiskAnalysis {
  risk_score: number;
  decision: string;
  semantic_similarity: number;
  skill_overlap_score: number;
  matched_skills: string[];
  missing_skills: string[];
  risk_factors: string[];
  grammar_score: number;
}

interface CandidateEntry {
  id: string;
  name: string;
  email: string;
  role: string;
  appliedDate: string;
  matchScore: number;
  status: string;
  detectedSkills: string[];
  riskAnalysis: RiskAnalysis;
  rankingResult: Record<string, any>;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getRiskColor = (score: number) => {
  if (score >= 60)
    return { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.2)", text: "#22c55e", hex: "#22c55e", label: "Low Risk", message: "This candidate has a low risk level. Overall profile looks good!" };
  if (score >= 40)
    return { bg: "rgba(234,179,8,0.1)", border: "rgba(234,179,8,0.2)", text: "#eab308", hex: "#eab308", label: "Medium Risk", message: "Some improvements recommended in experience and certifications." };
  return { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)", text: "#ef4444", hex: "#ef4444", label: "High Risk", message: "High risk content detected. Review and improve the candidate's profile." };
};

// FastAPI risk_score = risk level (0 = safe, 100 = very risky)
// UI safety score = 100 - risk_score
const getSafetyScore = (risk_score: number) =>
  Math.min(100, Math.max(0, 100 - (risk_score ?? 0)));

const getStrokeDashoffset = (score: number) => 553 * (1 - score / 100);
const normalise = (v: number) => (v <= 1 ? Math.round(v * 100) : Math.round(v));

const decisionLabel = (d: string) => {
  if (!d) return "Pending";
  const u = d.toUpperCase();
  if (u === "SAFE") return "Shortlist";
  if (u === "REVIEW") return "Review";
  if (u === "REJECT") return "Reject";
  return d;
};

const decisionStyles: Record<string, React.CSSProperties> = {
  Shortlist: { background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#22c55e" },
  Review:    { background: "rgba(234,179,8,0.1)",  border: "1px solid rgba(234,179,8,0.2)",  color: "#eab308" },
  Reject:    { background: "rgba(239,68,68,0.1)",  border: "1px solid rgba(239,68,68,0.2)",  color: "#ef4444" },
  Pending:   { background: "var(--icon-accent-bg)", border: "1px solid var(--border)",        color: "var(--accent)" },
};

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{label}</span>
        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{value}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-hover)" }}>
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function Chip({ label, variant }: { label: string; variant: "matched" | "missing" | "risk" }) {
  const styles = {
    matched: { background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#86efac" },
    missing: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5" },
    risk:    { background: "rgba(234,179,8,0.1)",  border: "1px solid rgba(234,179,8,0.2)",  color: "#fde047" },
  };
  return <span className="px-3 py-1.5 rounded-xl text-sm" style={styles[variant]}>{label}</span>;
}

export default function RiskAnalysisPage() {
  const [candidates, setCandidates] = useState<CandidateEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/candidates/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      const list: CandidateEntry[] = (data.candidates || []).filter(
        (c: CandidateEntry) => c.riskAnalysis && Object.keys(c.riskAnalysis).length > 0
      );
      setCandidates(list);
      setCurrentIndex(0);
    } catch (e: any) {
      setError(e.message || "Failed to load candidate data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCandidates(); }, []);

  const card: React.CSSProperties = {
    background: "var(--bg-secondary)",
    border: "1px solid var(--border)",
    borderRadius: "1.5rem",
  };
  const navBtn: React.CSSProperties = {
    width: 40, height: 40, borderRadius: "0.75rem",
    border: "1px solid var(--border)", background: "var(--bg-secondary)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", color: "var(--accent)",
  };

  // ── LOADING ──
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Loader2 size={32} style={{ color: "var(--accent)", animation: "spin 1s linear infinite" }} />
        <p style={{ color: "var(--text-secondary)" }}>Loading candidate risk data...</p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── ERROR ──
  if (error) {
    return (
      <div className="px-4 sm:px-6 py-6 max-w-xl mx-auto">
        <div className="px-4 py-4 rounded-xl text-sm mb-4" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
          {error}
        </div>
        <button onClick={fetchCandidates} className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-sm">
          <RefreshCw size={15} /> Retry
        </button>
      </div>
    );
  }

  // ── EMPTY STATE ──
  if (candidates.length === 0) {
    return (
      <div className="px-4 sm:px-6 py-6 max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--icon-accent-bg)", border: "1px solid var(--border)" }}>
            <Shield className="w-5 h-5" style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Risk Analysis</h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>AI-powered candidate risk insights</p>
          </div>
        </div>
        <div style={{ ...card, padding: "3rem 2rem", textAlign: "center" }}>
          <Users size={48} style={{ color: "var(--text-secondary)", margin: "0 auto 1rem" }} />
          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>No candidates yet</h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Risk analysis will appear here once candidates upload their resumes.
          </p>
          <button onClick={fetchCandidates} className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-sm mt-4 mx-auto">
            <RefreshCw size={15} /> Refresh
          </button>
        </div>
      </div>
    );
  }

  // ── RESULTS ──
  const entry = candidates[currentIndex];
  const risk = entry.riskAnalysis;
  const safetyScore = getSafetyScore(risk.risk_score);
  const riskColors = getRiskColor(safetyScore);
  const overlapPct = normalise(risk.skill_overlap_score ?? 0);
  const semanticPct = normalise(risk.semantic_similarity ?? 0);
  const grammarPct = normalise(risk.grammar_score ?? 90);
  const label = decisionLabel(risk.decision);
  const dStyle = decisionStyles[label] ?? decisionStyles.Pending;
  const matchedSkills = risk.matched_skills ?? [];
  const missingSkills = risk.missing_skills ?? [];
  const riskFactors = risk.risk_factors ?? [];

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--icon-accent-bg)", border: "1px solid var(--border)" }}>
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "var(--accent)" }} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Risk Analysis</h1>
          </div>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
            AI-powered risk scores from candidate resume submissions.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {candidates.length > 1 && (
            <>
              <button style={navBtn} onClick={() => setCurrentIndex((p) => (p === 0 ? candidates.length - 1 : p - 1))}>
                <ChevronLeft size={18} />
              </button>
              <span className="px-3 py-1.5 rounded-xl text-sm font-medium" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                {currentIndex + 1} / {candidates.length}
              </span>
              <button style={navBtn} onClick={() => setCurrentIndex((p) => (p === candidates.length - 1 ? 0 : p + 1))}>
                <ChevronRight size={18} />
              </button>
            </>
          )}
          <button onClick={fetchCandidates} className="btn-ghost flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium">
            <RefreshCw size={15} /> Refresh
          </button>
        </div>
      </div>

      {/* Candidate Intro Card */}
      <div style={{ ...card, padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
        <div className="flex items-center gap-3 sm:gap-4 mb-5 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#22c55e" }}>
            <CheckCircle2 size={13} /><span>Resume Parsed</span>
          </div>
          <span className="text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>{entry.email}</span>
          <span className="ml-auto px-3 py-1.5 rounded-full border text-xs sm:text-sm font-semibold" style={dStyle}>
            {label}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white" style={{ background: "var(--accent)", color: "var(--accent-text)" }}>
              {entry.name?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={16} style={{ color: "var(--accent)" }} />
              <h2 className="text-base sm:text-xl font-semibold" style={{ color: "var(--text-primary)" }}>Candidate Brief</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div style={{ borderRight: "1px solid var(--border)", paddingRight: "1rem" }}>
                <p className="text-xs sm:text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Name</p>
                <h3 className="text-lg sm:text-xl font-semibold" style={{ color: "var(--accent)" }}>{entry.name || "—"}</h3>
              </div>
              <div style={{ borderRight: "1px solid var(--border)", paddingRight: "1rem" }}>
                <p className="text-xs sm:text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Applied Role</p>
                <h3 className="text-base font-semibold" style={{ color: "var(--accent)" }}>{entry.role || "—"}</h3>
              </div>
              <div style={{ borderRight: "1px solid var(--border)", paddingRight: "1rem" }}>
                <p className="text-xs sm:text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Applied Date</p>
                <p className="text-sm" style={{ color: "var(--text-primary)" }}>{entry.appliedDate || "—"}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Matched Skills</p>
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.length > 0
                    ? matchedSkills.slice(0, 4).map((skill) => <Chip key={skill} label={skill} variant="matched" />)
                    : <span className="text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>None matched</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Risk Score Circle */}
        <div style={{ ...card, padding: "1.25rem 1.5rem" }} className="lg:col-span-4">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "var(--accent)" }} />
            <h3 className="text-lg sm:text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>Risk Score</h3>
          </div>
          <div className="flex flex-col items-center justify-center mt-6 sm:mt-10">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 208 208">
                <circle cx="104" cy="104" r="88" stroke="var(--border)" strokeWidth="8" fill="transparent" />
                <circle cx="104" cy="104" r="88" stroke={riskColors.hex} strokeWidth="8" fill="transparent"
                  strokeDasharray={553} strokeDashoffset={getStrokeDashoffset(safetyScore)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="text-4xl sm:text-6xl font-bold" style={{ color: "var(--text-primary)" }}>{safetyScore}</h1>
                <p className="text-base sm:text-xl" style={{ color: "var(--text-secondary)" }}>/100</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 px-4 py-1.5 rounded-full text-sm font-medium" style={{ background: riskColors.bg, border: `1px solid ${riskColors.border}`, color: riskColors.text }}>
              {riskColors.label}
            </div>
            <p className="text-center text-xs sm:text-sm mt-3 sm:mt-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{riskColors.message}</p>
            <button className="btn-primary mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold">
              {safetyScore >= 60 ? "Schedule Interview" : safetyScore >= 40 ? "Review" : "Reject"}
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 sm:gap-6">
          <div style={{ ...card, padding: "1.25rem 1.5rem" }}>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Target className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "var(--accent)" }} />
              <h3 className="text-base sm:text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>Score Breakdown</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-10 sm:gap-y-5">
              <ScoreBar label="Semantic Similarity" value={semanticPct} color="#a855f7" />
              <ScoreBar label="Skill Overlap" value={overlapPct} color={riskColors.hex} />
              <ScoreBar label="Grammar Score" value={grammarPct} color="#38bdf8" />
              <ScoreBar label="Match Score" value={entry.matchScore ?? 0} color={riskColors.hex} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div style={{ ...card, padding: "1.25rem 1.5rem" }}>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#f87171" }} />
                <h3 className="text-base sm:text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Missing Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingSkills.length > 0
                  ? missingSkills.map((s) => <Chip key={s} label={s} variant="missing" />)
                  : <div className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: "#22c55e" }}><CheckCircle2 size={16} /> No missing skills!</div>}
              </div>
            </div>

            <div style={{ ...card, padding: "1.25rem 1.5rem" }}>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#eab308" }} />
                <h3 className="text-base sm:text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Risk Factors</h3>
              </div>
              <div className="flex flex-col gap-2">
                {riskFactors.length > 0
                  ? riskFactors.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 shrink-0" style={{ color: "#eab308" }} />
                      <span className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f}</span>
                    </div>
                  ))
                  : <div className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: "#22c55e" }}><CheckCircle2 size={16} /> No risk factors identified.</div>}
              </div>
            </div>
          </div>

          {/* Detected Skills */}
          {entry.detectedSkills?.length > 0 && (
            <div style={{ ...card, padding: "1.25rem 1.5rem" }}>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4" style={{ color: "var(--accent)" }} />
                <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>All Detected Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.detectedSkills.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-lg text-xs" style={{ background: "var(--bg-hover)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
