import { useState, useEffect, useRef } from "react";
import api from "../../utils/axiosInstance";
import {
  FileText, CheckCircle, Clock, Video, AlertCircle,
  Calendar, Download, Eye, Briefcase, Upload, Trash2,
  Loader2, Bell, Search, Sun, Moon,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface ResumeData {
  url: string;
  originalName: string;
  mimeType: string;
  uploadedAt: string;
}

export default function CandidateDashboard() {
  const { isDark, toggle } = useTheme();
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [resumeLoading, setResumeLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const userName = localStorage.getItem("userName") || "Candidate";
  const avatarLetter = userName.charAt(0).toUpperCase();

  useEffect(() => { fetchResume(); }, []);

  const fetchResume = async () => {
    setResumeLoading(true);
    try {
      const res = await api.get("/api/candidate/resume");
      setResume(res.data.resume);
    } catch (err: any) {
      if (err.response?.status !== 404) setError("Failed to load resume.");
      setResume(null);
    } finally {
      setResumeLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) { setError("Only PDF, DOC, or DOCX files are allowed."); return; }
    if (file.size > 5 * 1024 * 1024) { setError("File size must be under 5 MB."); return; }
    setError(null); setSuccess(null); setUploading(true);
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const res = await api.post("/api/candidate/resume", formData);
      setResume(res.data.resume);
      setSuccess(resume ? "Resume updated successfully!" : "Resume uploaded successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your resume?")) return;
    setError(null); setSuccess(null); setDeleting(true);
    try {
      await api.delete("/api/candidate/resume");
      setResume(null);
      setSuccess("Resume deleted successfully.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Delete failed.");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto py-4 sm:py-6">

      {/* Top Header Bar */}
      <div
        className="flex items-center justify-between gap-2 mb-4 sm:mb-8 rounded-2xl p-3 sm:p-4"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
      >
        {/* Left: icon + title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}
          >
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "var(--text-purple)" }} />
          </div>
          <h1 className="text-base sm:text-2xl font-bold tracking-tight truncate" style={{ color: "var(--text-primary)" }}>
            Dashboard
          </h1>
        </div>

        {/* Right: search + bell + welcome + avatar + theme toggle */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Search — hidden on mobile */}
          <div className="relative hidden sm:block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
            <input
              type="text"
              placeholder="Search jobs, applications..."
              className="pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none"
              style={{ width: "240px", background: "var(--bg-primary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
            />
          </div>
          <button title="Notifications" style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "flex", padding: "4px" }}>
            <Bell size={18} />
          </button>
          {/* Welcome + avatar — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Welcome, <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{userName}</span>
            </span>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
              style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", color: "var(--text-purple)" }}
            >
              {avatarLetter}
            </div>
          </div>
          <button
            onClick={toggle}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center"
            style={{ background: "var(--bg-primary)", border: "1px solid var(--border)", color: "var(--text-secondary)", cursor: "pointer" }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>

      {/* Welcome + Profile Completeness */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-8">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Welcome back, <span style={{ color: "var(--text-purple)" }}>{userName}</span>
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Here is the status of your applications.
          </p>
        </div>
        <div
          className="rounded-2xl p-4 flex items-center gap-4 w-full sm:w-72"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
        >
          <div className="flex-1 min-w-0">
            <div className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>Profile Completeness</div>
            <div className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>85%</div>
          </div>
          <div className="w-20 sm:w-24 h-2 rounded-full overflow-hidden shrink-0" style={{ background: "var(--bg-hover)" }}>
            <div className="h-full rounded-full" style={{ width: "85%", background: "linear-gradient(to right, #a855f7, #3b82f6)" }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-3 sm:gap-6">

          {/* Application Status Tracker */}
          <div className="rounded-2xl p-4 sm:p-6" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-5 sm:mb-6">
              <Briefcase size={20} style={{ color: "var(--text-purple)" }} />
              <h2 className="text-base sm:text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                Frontend Developer Application
              </h2>
            </div>

            {/* Desktop Progress Steps */}
            <div className="hidden sm:flex relative justify-between items-center mb-8">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0" style={{ background: "var(--border)" }} />
              <div className="absolute top-1/2 left-0 w-3/4 h-0.5 -translate-y-1/2 z-0" style={{ background: "var(--text-purple)" }} />
              {[
                { label: "Applied", done: true },
                { label: "Screening", done: true },
                { label: "Technical Round", done: true },
                { label: "Interview", active: true },
                { label: "Offer", done: false },
              ].map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{
                      background: step.done ? "var(--text-purple)" : step.active ? "var(--bg-secondary)" : "var(--bg-hover)",
                      color: step.done ? "#fff" : step.active ? "var(--text-purple)" : "var(--text-secondary)",
                      border: step.active ? "2px solid var(--text-purple)" : "none",
                    }}
                  >
                    {step.done ? <CheckCircle size={16} /> : step.active ? <div className="w-2 h-2 rounded-full" style={{ background: "var(--text-purple)" }} /> : index + 1}
                  </div>
                  <span className="text-xs whitespace-nowrap" style={{ color: step.active ? "var(--text-purple)" : "var(--text-secondary)", fontWeight: step.active ? 600 : 400 }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile Progress Bar */}
            <div className="block sm:hidden mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold" style={{ color: "var(--text-purple)" }}>Interview</span>
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Step 4 of 5</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-hover)" }}>
                <div className="h-full rounded-full" style={{ width: "75%", background: "var(--text-purple)" }} />
              </div>
            </div>

            <div
              className="rounded-xl p-3 sm:p-4 flex items-start sm:items-center gap-3"
              style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}
            >
              <Clock size={16} style={{ color: "var(--text-purple)", flexShrink: 0 }} />
              <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                Your application is currently under review for the interview stage.
              </p>
            </div>
          </div>

          {/* Upcoming Interview & Resume Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
            {/* Upcoming Interview */}
            <div className="rounded-2xl p-4 sm:p-6 flex flex-col justify-between" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Video size={20} style={{ color: "var(--text-purple)" }} />
                  <h2 className="text-base sm:text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Upcoming Interview</h2>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}
                  >
                    <Calendar size={20} style={{ color: "#3b82f6" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base" style={{ color: "var(--text-primary)" }}>Technical Round</h3>
                    <p className="text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>Today, 2:00 PM – 3:00 PM</p>
                  </div>
                </div>
                <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                  Interviewer: <strong style={{ color: "var(--text-primary)" }}>Sarah Jenkins</strong> (Lead Engineer)
                </p>
              </div>
              <button
                className="w-full py-2.5 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm sm:text-base transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(to right, #3b82f6, #a855f7)", color: "#fff", border: "none", cursor: "pointer" }}
              >
                <Video size={16} /> Join Video Call
              </button>
            </div>

            {/* Resume */}
            <div className="rounded-2xl p-4 sm:p-6 flex flex-col justify-between" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={20} style={{ color: "var(--text-purple)" }} />
                  <h2 className="text-base sm:text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Resume</h2>
                </div>

                {error && (
                  <div className="mb-3 p-3 rounded-xl text-sm" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>{error}</div>
                )}
                {success && (
                  <div className="mb-3 p-3 rounded-xl text-sm" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981" }}>{success}</div>
                )}

                <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />

                {resumeLoading ? (
                  <div className="flex justify-center items-center py-6">
                    <Loader2 size={24} className="animate-spin" style={{ color: "var(--text-purple)" }} />
                  </div>
                ) : resume ? (
                  <div
                    className="rounded-xl p-4 flex flex-col items-center gap-2 mb-4"
                    style={{ border: "1px dashed rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.05)" }}
                  >
                    <FileText size={28} style={{ color: "var(--text-purple)" }} />
                    <p className="font-semibold text-sm text-center break-all" style={{ color: "var(--text-primary)" }}>{resume.originalName}</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Uploaded {formatDate(resume.uploadedAt)}</p>
                  </div>
                ) : (
                  <div
                    onClick={() => !uploading && fileInputRef.current?.click()}
                    className="rounded-xl p-5 sm:p-6 flex flex-col items-center gap-2 mb-4 cursor-pointer transition-colors"
                    style={{ border: "1px dashed rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.05)" }}
                  >
                    {uploading ? <Loader2 size={28} className="animate-spin" style={{ color: "var(--text-purple)" }} /> : <Upload size={28} style={{ color: "var(--text-purple)" }} />}
                    <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{uploading ? "Uploading..." : "Upload Resume"}</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>PDF, DOC, DOCX — max 5 MB</p>
                  </div>
                )}
              </div>

              {resume && (
                <div className="flex gap-2 mt-2">
                  <a
                    href={`${BASE_URL}${resume.url}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg flex items-center justify-center transition-colors"
                    style={{ border: "1px solid var(--border)", color: "var(--text-purple)" }}
                  >
                    <Eye size={15} />
                  </a>
                  <a
                    href={`${BASE_URL}${resume.url}`} download={resume.originalName}
                    className="flex-1 py-2 rounded-lg flex items-center justify-center transition-colors"
                    style={{ border: "1px solid var(--border)", color: "var(--text-purple)" }}
                  >
                    <Download size={15} />
                  </a>
                  <button
                    onClick={() => fileInputRef.current?.click()} disabled={uploading}
                    className="flex-1 py-2 rounded-lg flex items-center justify-center gap-1 text-xs sm:text-sm font-medium transition-colors"
                    style={{ background: "rgba(168,85,247,0.1)", color: "var(--text-purple)", border: "none", cursor: "pointer" }}
                  >
                    {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />} Update
                  </button>
                  <button
                    onClick={handleDelete} disabled={deleting}
                    className="flex-1 py-2 rounded-lg flex items-center justify-center transition-colors"
                    style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "none", cursor: "pointer" }}
                  >
                    {deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-6">
          {/* Action Items */}
          <div className="rounded-2xl p-4 sm:p-6" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={20} style={{ color: "#f59e0b" }} />
              <h2 className="text-base sm:text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Action Items</h2>
            </div>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="w-5 h-5 rounded mt-0.5 shrink-0" style={{ border: "2px solid var(--border)" }} />
                <div>
                  <h4 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Complete Technical Round</h4>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>Technical interview pending evaluation.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="w-5 h-5 rounded mt-0.5 shrink-0" style={{ border: "2px solid var(--border)" }} />
                <div>
                  <h4 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Interview Round</h4>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>Schedule your final interview with HR.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle size={20} className="shrink-0 mt-0.5" style={{ color: "#10b981" }} />
                <div>
                  <h4 className="text-sm font-medium line-through" style={{ color: "var(--text-secondary)" }}>Screening Round</h4>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>Completed on Oct 24.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Assessment Results */}
          <div className="rounded-2xl p-4 sm:p-6" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={20} style={{ color: "var(--text-purple)" }} />
              <h2 className="text-base sm:text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Recent Results</h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-xl p-3 sm:p-4" style={{ border: "1px solid var(--border)", background: "var(--bg-hover)" }}>
                <div className="flex justify-between mb-2">
                  <span className="text-xs sm:text-sm font-medium" style={{ color: "var(--text-primary)" }}>Frontend Coding Challenge</span>
                  <span className="text-xs sm:text-sm font-bold" style={{ color: "#10b981" }}>92/100</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div className="h-full rounded-full" style={{ width: "92%", background: "#10b981" }} />
                </div>
                <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>Excellent performance in React & TypeScript.</p>
              </div>
              <div className="rounded-xl p-3 sm:p-4" style={{ border: "1px solid var(--border)", background: "var(--bg-hover)" }}>
                <div className="flex justify-between mb-2">
                  <span className="text-xs sm:text-sm font-medium" style={{ color: "var(--text-primary)" }}>Cognitive Aptitude Test</span>
                  <span className="text-xs sm:text-sm font-bold" style={{ color: "#3b82f6" }}>85/100</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div className="h-full rounded-full" style={{ width: "85%", background: "#3b82f6" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
