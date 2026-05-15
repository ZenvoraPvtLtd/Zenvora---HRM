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
import { darkTheme, lightTheme } from "../../styles/theme";
import { useTheme } from "../../context/ThemeContext";
import AuthLayout from "../../pages/auth/AuthLayout";

// ─── API Return Type ────────────────────────────────────────────────────────

export interface CandidateRiskResult {
  risk_score: number;           // 0–100
  decision: string;             // e.g. "Shortlist", "Reject", "Review"
  semantic_similarity: number;  // 0–1 float
  skill_overlap_score: number;  // 0–100 or 0–1; normalise below
  matched_skills: string[];
  missing_skills: string[];
  risk_factors: string[];
  grammar_score: number;        // 0–100

  // Additional display fields you may include in the API response:
  name?: string;
  experience?: number;
  intro?: string;
  file?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const getRiskColor = (score: number) => {
  if (score >= 60)
    return {
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      text: "text-green-400",
      bar: "bg-green-500",
      hex: "#22c55e",
      label: "Low Risk",
      message: "This candidate has a low risk level. Overall profile looks good!",
    };
  if (score >= 40)
    return {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      text: "text-yellow-400",
      bar: "bg-yellow-500",
      hex: "#eab308",
      label: "Medium Risk",
      message: "Some improvements recommended in experience and certifications.",
    };
  return {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-400",
    bar: "bg-red-500",
    hex: "#ef4444",
    label: "High Risk",
    message: "High risk content detected. Review and improve the candidate's profile.",
  };
};

const getStrokeDashoffset = (score: number) => 553 * (1 - score / 100);

// Normalise skill_overlap_score to 0–100 in case the API returns 0–1
const normaliseOverlap = (v: number) => (v <= 1 ? Math.round(v * 100) : Math.round(v));

// Normalise semantic_similarity (0–1) to percentage
const normaliseSemantic = (v: number) =>
  v <= 1 ? Math.round(v * 100) : Math.round(v);

// ─── Sub-components ─────────────────────────────────────────────────────────

function ScoreBar({
  label,
  value,
  color,
  theme,
}: {
  label: string;
  value: number;
  color: string;
  theme: typeof darkTheme;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className={`text-sm ${theme.subtext}`}>{label}</span>
        <span className={`text-sm font-semibold ${theme.heading}`}>{value}%</span>
      </div>
      <div className={`h-2 rounded-full ${theme.toggleBtn} overflow-hidden`}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function Chip({
  label,
  variant,
}: {
  label: string;
  variant: "matched" | "missing" | "risk";
}) {
  const styles = {
    matched:
      "px-3 py-1.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 text-sm",
    missing:
      "px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm",
    risk: "px-3 py-1.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm",
  };
  return <span className={styles[variant]}>{label}</span>;
}

// ─── Mock data (replace with real API call / props) ─────────────────────────

const mockResults: CandidateRiskResult[] = [
  {
    name: "Raman Paal",
    experience: 5.2,
    intro:
      "Results-driven professional with experience in data analysis, business intelligence and building insightful dashboards.",
    file: "John_Doe_Resume.pdf",
    risk_score: 85,
    decision: "Shortlist",
    semantic_similarity: 0.87,
    skill_overlap_score: 78,
    matched_skills: ["Data Analysis", "SQL", "Excel", "Python", "Power BI", "Tableau"],
    missing_skills: ["R", "Spark"],
    risk_factors: ["Short tenure at last role", "No leadership experience listed"],
    grammar_score: 92,
  },
  {
    name: "Suman Joshi",
    experience: 7.5,
    intro:
      "Experienced software engineer specialising in full-stack development with a strong track record in cloud technologies.",
    file: "Sarah_Smith_Resume.pdf",
    risk_score: 92,
    decision: "Shortlist",
    semantic_similarity: 0.93,
    skill_overlap_score: 91,
    matched_skills: ["AWS", "Docker", "Kubernetes", "Node.js", "React", "PostgreSQL"],
    missing_skills: [],
    risk_factors: [],
    grammar_score: 97,
  },
  {
    name: "Mica lal jay kisan ",
    experience: 3.8,
    intro:
      "Junior developer with growing expertise in web technologies and demonstrated ability to learn quickly.",
    file: "Michael_Johnson_Resume.pdf",
    risk_score: 58,
    decision: "Review",
    semantic_similarity: 0.61,
    skill_overlap_score: 54,
    matched_skills: ["JavaScript", "HTML/CSS", "Vue.js", "Git"],
    missing_skills: ["TypeScript", "Testing", "CI/CD", "REST APIs"],
    risk_factors: ["Limited work history", "No certifications", "Gaps in employment"],
    grammar_score: 74,
  },
  {
    name: "Emily Brown",
    experience: 2.1,
    intro:
      "Entry-level professional with foundational knowledge in programming and web development.",
    file: "Emily_Brown_Resume.pdf",
    risk_score: 35,
    decision: "Reject",
    semantic_similarity: 0.38,
    skill_overlap_score: 32,
    matched_skills: ["Python", "HTML"],
    missing_skills: ["JavaScript", "SQL", "React", "CSS Frameworks", "Version Control"],
    risk_factors: [
      "Very limited experience",
      "Low semantic match to JD",
      "Missing core skills",
      "Grammar issues detected",
    ],
    grammar_score: 58,
  },
  {
    name: "David Lee",
    experience: 8.9,
    intro:
      "Senior architect with proven expertise in designing scalable systems and leading enterprise-level implementations.",
    file: "David_Lee_Resume.pdf",
    risk_score: 95,
    decision: "Shortlist",
    semantic_similarity: 0.96,
    skill_overlap_score: 94,
    matched_skills: ["System Design", "Cloud Architecture", "Microservices", "Java", "Kubernetes", "AWS"],
    missing_skills: [],
    risk_factors: [],
    grammar_score: 99,
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────

interface RiskAnalysisProps {
  /** Pass real API results here; falls back to mock data if omitted */
  results?: CandidateRiskResult[];
}

export default function RiskAnalysis({ results = mockResults }: RiskAnalysisProps) {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const [currentIndex, setCurrentIndex] = useState(0);

  const candidate = results[currentIndex];
  const riskColors = getRiskColor(candidate.risk_score);

  const overlapPct = normaliseOverlap(candidate.skill_overlap_score);
  const semanticPct = normaliseSemantic(candidate.semantic_similarity);

  const decisionStyles: Record<string, string> = {
    Shortlist: "bg-green-500/10 border-green-500/20 text-green-400",
    Review: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
    Reject: "bg-red-500/10 border-red-500/20 text-red-400",
  };
  const decisionStyle =
    decisionStyles[candidate.decision] ??
    "bg-purple-500/10 border-purple-500/20 text-purple-400";

  return (
    <AuthLayout fullWidth>
      <div className={`px-6 py-10 max-w-7xl mx-auto rounded-xl ${theme.page} ${theme.heading}`}>

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-600/20 flex items-center justify-center border border-purple-500/30">
                <Shield className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h1 className={`text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight ${theme.heading}`}>
                Risk Analysis
              </h1>
            </div>
            <p className={`${theme.subtext} mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg`}>
              Get a detailed risk score and insights about the candidate.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() =>
                setCurrentIndex((p) => (p === 0 ? results.length - 1 : p - 1))
              }
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-purple-500/20 ${theme.toggleBtn} flex items-center justify-center hover:bg-purple-600/10 transition`}
            >
              <ChevronLeft className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <span
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded-xl border border-purple-500/20 ${theme.toggleBtn} ${theme.subtext} text-xs sm:text-sm font-medium whitespace-nowrap`}
            >
              {currentIndex + 1} / {results.length}
            </span>
            <button
              onClick={() =>
                setCurrentIndex((p) => (p === results.length - 1 ? 0 : p + 1))
              }
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-purple-500/20 ${theme.toggleBtn} flex items-center justify-center hover:bg-purple-600/10 transition`}
            >
              <ChevronRight className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* ── Candidate Intro Card ── */}
        <div className={`${theme.card} rounded-3xl p-4 sm:p-6 shadow-[0_0_40px_rgba(124,58,237,0.08)]`}>
          {/* Status row */}
          <div className="flex items-center gap-2 sm:gap-4 mb-5 flex-wrap">
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-2">
              <CheckCircle2 size={14} className="hidden sm:block" />
              <CheckCircle2 size={12} className="sm:hidden" />
              <span>Resume Parsed</span>
            </div>
            {candidate.file && (
              <span className={`${theme.subtext} text-xs sm:text-sm`}>{candidate.file}</span>
            )}
            {/* Decision badge */}
            <span
              className={`ml-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold ${decisionStyle}`}
            >
              {candidate.decision}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="min-w-[70px] sm:min-w-[90px]">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 sm:mb-5">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Shield size={12} className="sm:hidden text-purple-400" />
                  <Shield size={16} className="hidden sm:block text-purple-400" />
                </div>
                <h2 className={`text-base sm:text-xl lg:text-2xl font-semibold ${theme.heading}`}>
                  Candidate Brief Intro
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
                {/* Name */}
                <div className={`sm:border-r  sm:pr-4 lg:pr-6`}>
                  <p className={`${theme.subtext} text-xs sm:text-sm mb-2 sm:mb-3`}>Name</p>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-purple-400">
                    {candidate.name ?? "—"}
                  </h3>
                </div>

                {/* Experience */}
                <div className={`sm:border-r  sm:pr-4 lg:pr-6`}>
                  <p className={`${theme.subtext} text-xs sm:text-sm mb-2 sm:mb-3`}>Years of Experience</p>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-purple-400">
                    {candidate.experience != null ? `${candidate.experience} Years` : "—"}
                  </h3>
                </div>

                {/* Intro */}
                <div className={`sm:border-r  sm:pr-4 lg:pr-6`}>
                  <p className={`${theme.subtext} text-xs sm:text-sm mb-2 sm:mb-3`}>Brief Intro</p>
                  <p className={`${theme.label} leading-6 sm:leading-7 text-sm`}>{candidate.intro ?? "—"}</p>
                </div>

                {/* Matched Skills */}
                <div>
                  <p className={`${theme.subtext} text-xs sm:text-sm mb-2 sm:mb-3`}>Matched Skills</p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {candidate.matched_skills.length > 0 ? (
                      candidate.matched_skills.map((skill) => (
                        <Chip key={skill} label={skill} variant="matched" />
                      ))
                    ) : (
                      <span className={`${theme.subtext} text-xs sm:text-sm`}>None matched</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mt-6">

          {/* ── Risk Score circle ── */}
          <div className={`lg:col-span-4 ${theme.card} rounded-3xl p-4 sm:p-6`}>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              <h3 className={`text-lg sm:text-2xl font-semibold ${theme.heading}`}>Risk Score</h3>
            </div>

            <div className="flex flex-col items-center justify-center mt-6 sm:mt-10">
              <div className="relative w-40 h-40 sm:w-52 sm:h-52">
                <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 208 208">
                  <circle cx="104" cy="104" r="88" stroke="#1f2937" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="104"
                    cy="104"
                    r="88"
                    stroke={riskColors.hex}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={553}
                    strokeDashoffset={getStrokeDashoffset(candidate.risk_score)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h1 className={`text-4xl sm:text-6xl font-bold ${theme.heading}`}>{candidate.risk_score}</h1>
                  <p className={`${theme.subtext} text-base sm:text-xl`}>/100</p>
                </div>
              </div>

              <div className={`mt-4 sm:mt-6 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full ${riskColors.bg} border ${riskColors.border} ${riskColors.text} text-sm sm:text-base`}>
                {riskColors.label}
              </div>

              <p className={`text-center ${theme.subtext} mt-3 sm:mt-5 leading-6 sm:leading-7 text-xs sm:text-sm`}>
                {riskColors.message}
              </p>

              <button className={`mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-lg ${
                candidate.risk_score >= 60
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : candidate.risk_score >= 40
                  ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}>
                {candidate.risk_score >= 60
                  ? "Schedule Interview"
                  : candidate.risk_score >= 40
                  ? "Review"
                  : "Reject"}
              </button>
            </div>
          </div>

          {/* ── Right column: scores + skills ── */}
          <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 sm:gap-6">

            {/* Score Metrics */}
            <div className={`${theme.card} rounded-3xl p-4 sm:p-6`}>
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <h3 className={`text-base sm:text-2xl font-semibold ${theme.heading}`}>Score Breakdown</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-10 sm:gap-y-5">
                <ScoreBar label="Semantic Similarity" value={semanticPct} color="#a855f7" theme={theme} />
                <ScoreBar label="Skill Overlap" value={overlapPct} color={riskColors.hex} theme={theme} />
                <ScoreBar label="Grammar Score" value={candidate.grammar_score} color="#38bdf8" theme={theme} />
                <ScoreBar label="Risk Score" value={candidate.risk_score} color={riskColors.hex} theme={theme} />
              </div>
            </div>

            {/* Missing Skills + Risk Factors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

              {/* Missing Skills */}
              <div className={`${theme.card} rounded-3xl p-4 sm:p-6`}>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                  <h3 className={`text-base sm:text-lg font-semibold ${theme.heading}`}>Missing Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {candidate.missing_skills.length > 0 ? (
                    candidate.missing_skills.map((s) => (
                      <Chip key={s} label={s} variant="missing" />
                    ))
                  ) : (
                    <div className="flex items-center gap-2 text-green-400 text-xs sm:text-sm">
                      <CheckCircle2 size={16} />
                      No missing skills — full match!
                    </div>
                  )}
                </div>
              </div>

              {/* Risk Factors */}
              <div className={`${theme.card} rounded-3xl p-4 sm:p-6`}>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  <h3 className={`text-base sm:text-lg font-semibold ${theme.heading}`}>Risk Factors</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {candidate.risk_factors.length > 0 ? (
                    candidate.risk_factors.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mt-0.5 shrink-0" />
                        <span className={`${theme.subtext} text-xs sm:text-sm leading-6`}>{f}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 text-green-400 text-xs sm:text-sm">
                      <CheckCircle2 size={16} />
                      No risk factors identified.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AuthLayout>
  );
}