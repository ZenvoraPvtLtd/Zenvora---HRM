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
} from "lucide-react";
import { useState } from "react";

export interface CandidateRiskResult {
  risk_score: number;
  decision: string;
  semantic_similarity: number;
  skill_overlap_score: number;
  matched_skills: string[];
  missing_skills: string[];
  risk_factors: string[];
  grammar_score: number;
  name?: string;
  experience?: number;
  intro?: string;
  file?: string;
}

const getRiskColor = (score: number) => {
  if (score >= 60)
    return { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.2)", text: "#22c55e", bar: "#22c55e", hex: "#22c55e", label: "Low Risk", message: "This candidate has a low risk level. Overall profile looks good!" };
  if (score >= 40)
    return { bg: "rgba(234,179,8,0.1)", border: "rgba(234,179,8,0.2)", text: "#eab308", bar: "#eab308", hex: "#eab308", label: "Medium Risk", message: "Some improvements recommended in experience and certifications." };
  return { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)", text: "#ef4444", bar: "#ef4444", hex: "#ef4444", label: "High Risk", message: "High risk content detected. Review and improve the candidate's profile." };
};

const getStrokeDashoffset = (score: number) => 553 * (1 - score / 100);
const normaliseOverlap = (v: number) => (v <= 1 ? Math.round(v * 100) : Math.round(v));
const normaliseSemantic = (v: number) => (v <= 1 ? Math.round(v * 100) : Math.round(v));

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
    risk: { background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.2)", color: "#fde047" },
  };
  return (
    <span className="px-3 py-1.5 rounded-xl text-sm" style={styles[variant]}>{label}</span>
  );
}

const mockResults: CandidateRiskResult[] = [
  { name: "Raman Paal", experience: 5.2, intro: "Results-driven professional with experience in data analysis, business intelligence and building insightful dashboards.", file: "John_Doe_Resume.pdf", risk_score: 85, decision: "Shortlist", semantic_similarity: 0.87, skill_overlap_score: 78, matched_skills: ["Data Analysis", "SQL", "Excel", "Python", "Power BI", "Tableau"], missing_skills: ["R", "Spark"], risk_factors: ["Short tenure at last role", "No leadership experience listed"], grammar_score: 92 },
  { name: "Suman Joshi", experience: 7.5, intro: "Experienced software engineer specialising in full-stack development with a strong track record in cloud technologies.", file: "Sarah_Smith_Resume.pdf", risk_score: 92, decision: "Shortlist", semantic_similarity: 0.93, skill_overlap_score: 91, matched_skills: ["AWS", "Docker", "Kubernetes", "Node.js", "React", "PostgreSQL"], missing_skills: [], risk_factors: [], grammar_score: 97 },
  { name: "Mica lal jay kisan", experience: 3.8, intro: "Junior developer with growing expertise in web technologies and demonstrated ability to learn quickly.", file: "Michael_Johnson_Resume.pdf", risk_score: 58, decision: "Review", semantic_similarity: 0.61, skill_overlap_score: 54, matched_skills: ["JavaScript", "HTML/CSS", "Vue.js", "Git"], missing_skills: ["TypeScript", "Testing", "CI/CD", "REST APIs"], risk_factors: ["Limited work history", "No certifications", "Gaps in employment"], grammar_score: 74 },
  { name: "Emily Brown", experience: 2.1, intro: "Entry-level professional with foundational knowledge in programming and web development.", file: "Emily_Brown_Resume.pdf", risk_score: 35, decision: "Reject", semantic_similarity: 0.38, skill_overlap_score: 32, matched_skills: ["Python", "HTML"], missing_skills: ["JavaScript", "SQL", "React", "CSS Frameworks", "Version Control"], risk_factors: ["Very limited experience", "Low semantic match to JD", "Missing core skills", "Grammar issues detected"], grammar_score: 58 },
  { name: "David Lee", experience: 8.9, intro: "Senior architect with proven expertise in designing scalable systems and leading enterprise-level implementations.", file: "David_Lee_Resume.pdf", risk_score: 95, decision: "Shortlist", semantic_similarity: 0.96, skill_overlap_score: 94, matched_skills: ["System Design", "Cloud Architecture", "Microservices", "Java", "Kubernetes", "AWS"], missing_skills: [], risk_factors: [], grammar_score: 99 },
];

interface RiskAnalysisProps {
  results?: CandidateRiskResult[];
}

export default function RiskAnalysisPage({ results = mockResults }: RiskAnalysisProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const candidate = results[currentIndex];
  const riskColors = getRiskColor(candidate.risk_score);
  const overlapPct = normaliseOverlap(candidate.skill_overlap_score);
  const semanticPct = normaliseSemantic(candidate.semantic_similarity);

  const decisionStyles: Record<string, React.CSSProperties> = {
    Shortlist: { background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#22c55e" },
    Review: { background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.2)", color: "#eab308" },
    Reject: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" },
  };
  const decisionStyle = decisionStyles[candidate.decision] ?? { background: "var(--icon-accent-bg)", border: "1px solid var(--border)", color: "var(--text-purple)" };

  const card: React.CSSProperties = { background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "1.5rem" };

  const navBtn: React.CSSProperties = {
    width: 40, height: 40, borderRadius: "0.75rem",
    border: "1px solid var(--border)",
    background: "var(--bg-secondary)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", color: "var(--text-purple)",
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--icon-accent-bg)", border: "1px solid var(--border)" }}>
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "var(--text-purple)" }} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Risk Analysis
            </h1>
          </div>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--text-secondary)" }}>
            Get a detailed risk score and insights about the candidate.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button style={navBtn} onClick={() => setCurrentIndex((p) => (p === 0 ? results.length - 1 : p - 1))}>
            <ChevronLeft size={18} />
          </button>
          <span className="px-3 py-1.5 rounded-xl text-sm font-medium" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
            {currentIndex + 1} / {results.length}
          </span>
          <button style={navBtn} onClick={() => setCurrentIndex((p) => (p === results.length - 1 ? 0 : p + 1))}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Candidate Intro Card */}
      <div style={{ ...card, padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
        <div className="flex items-center gap-3 sm:gap-4 mb-5 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#22c55e" }}>
            <CheckCircle2 size={13} />
            <span>Resume Parsed</span>
          </div>
          {candidate.file && <span className="text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>{candidate.file}</span>}
          <span className="ml-auto px-3 py-1.5 rounded-full border text-xs sm:text-sm font-semibold" style={decisionStyle}>
            {candidate.decision}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center" style={{ background: "var(--icon-accent-bg)", border: "1px solid var(--border)" }}>
              <FileText className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: "var(--text-purple)" }} />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={16} style={{ color: "var(--text-purple)" }} />
              <h2 className="text-base sm:text-xl font-semibold" style={{ color: "var(--text-primary)" }}>Candidate Brief Intro</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div style={{ borderRight: "1px solid var(--border)", paddingRight: "1rem" }}>
                <p className="text-xs sm:text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Name</p>
                <h3 className="text-lg sm:text-xl font-semibold" style={{ color: "var(--text-purple)" }}>{candidate.name ?? "—"}</h3>
              </div>
              <div style={{ borderRight: "1px solid var(--border)", paddingRight: "1rem" }}>
                <p className="text-xs sm:text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Years of Experience</p>
                <h3 className="text-lg sm:text-xl font-semibold" style={{ color: "var(--text-purple)" }}>{candidate.experience != null ? `${candidate.experience} Years` : "—"}</h3>
              </div>
              <div style={{ borderRight: "1px solid var(--border)", paddingRight: "1rem" }}>
                <p className="text-xs sm:text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Brief Intro</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{candidate.intro ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Matched Skills</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.matched_skills.length > 0
                    ? candidate.matched_skills.map((skill) => <Chip key={skill} label={skill} variant="matched" />)
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
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "var(--text-purple)" }} />
            <h3 className="text-lg sm:text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>Risk Score</h3>
          </div>

          <div className="flex flex-col items-center justify-center mt-6 sm:mt-10">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52">
              <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 208 208">
                <circle cx="104" cy="104" r="88" stroke="var(--border)" strokeWidth="8" fill="transparent" />
                <circle cx="104" cy="104" r="88" stroke={riskColors.hex} strokeWidth="8" fill="transparent" strokeDasharray={553} strokeDashoffset={getStrokeDashoffset(candidate.risk_score)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="text-4xl sm:text-6xl font-bold" style={{ color: "var(--text-primary)" }}>{candidate.risk_score}</h1>
                <p className="text-base sm:text-xl" style={{ color: "var(--text-secondary)" }}>/100</p>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 px-4 py-1.5 rounded-full text-sm font-medium" style={{ background: riskColors.bg, border: `1px solid ${riskColors.border}`, color: riskColors.text }}>
              {riskColors.label}
            </div>
            <p className="text-center text-xs sm:text-sm mt-3 sm:mt-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {riskColors.message}
            </p>

            <button
              className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300"
              style={{
                background: candidate.risk_score >= 60 ? "#22c55e" : candidate.risk_score >= 40 ? "#eab308" : "#ef4444",
                color: candidate.risk_score >= 40 && candidate.risk_score < 60 ? "#000" : "#fff",
                border: "none", cursor: "pointer",
              }}
            >
              {candidate.risk_score >= 60 ? "Schedule Interview" : candidate.risk_score >= 40 ? "Review" : "Reject"}
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 sm:gap-6">

          {/* Score Breakdown */}
          <div style={{ ...card, padding: "1.25rem 1.5rem" }}>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Target className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "var(--text-purple)" }} />
              <h3 className="text-base sm:text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>Score Breakdown</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-10 sm:gap-y-5">
              <ScoreBar label="Semantic Similarity" value={semanticPct} color="#a855f7" />
              <ScoreBar label="Skill Overlap" value={overlapPct} color={riskColors.hex} />
              <ScoreBar label="Grammar Score" value={candidate.grammar_score} color="#38bdf8" />
              <ScoreBar label="Risk Score" value={candidate.risk_score} color={riskColors.hex} />
            </div>
          </div>

          {/* Missing Skills + Risk Factors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div style={{ ...card, padding: "1.25rem 1.5rem" }}>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#f87171" }} />
                <h3 className="text-base sm:text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Missing Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {candidate.missing_skills.length > 0
                  ? candidate.missing_skills.map((s) => <Chip key={s} label={s} variant="missing" />)
                  : <div className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: "#22c55e" }}><CheckCircle2 size={16} /> No missing skills — full match!</div>}
              </div>
            </div>

            <div style={{ ...card, padding: "1.25rem 1.5rem" }}>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#eab308" }} />
                <h3 className="text-base sm:text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Risk Factors</h3>
              </div>
              <div className="flex flex-col gap-2">
                {candidate.risk_factors.length > 0
                  ? candidate.risk_factors.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 shrink-0" style={{ color: "#eab308" }} />
                      <span className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f}</span>
                    </div>
                  ))
                  : <div className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: "#22c55e" }}><CheckCircle2 size={16} /> No risk factors identified.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
