import { useState, useEffect, useRef } from "react";
import api from "../../utils/axiosInstance";
import { darkTheme, lightTheme } from "../../styles/theme";
import { useTheme } from "../../context/ThemeContext";
import { AuthLayout } from "../../pages/auth/AuthLayout";
import {
  FileText,
  CheckCircle,
  Clock,
  Video,
  AlertCircle,
  Calendar,
  Download,
  Eye,
  Briefcase,
  Upload,
  Trash2,
  Loader2,
  Search,
  Bell,
} from "lucide-react";

interface ResumeData {
  url: string;
  originalName: string;
  mimeType: string;
  uploadedAt: string;
}

export default function CandidateDashboard() {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [resumeLoading, setResumeLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    setResumeLoading(true);
    try {
      const res = await api.get("/api/candidate/resume");
      setResume(res.data.resume);
    } catch (err: any) {
      if (err.response?.status !== 404) {
        setError("Failed to load resume.");
      }
      setResume(null);
    } finally {
      setResumeLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      setError("Only PDF, DOC, or DOCX files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be under 5 MB.");
      return;
    }

    setError(null);
    setSuccess(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await api.post("/api/candidate/resume", formData);
      setResume(res.data.resume);
      setSuccess(
        resume
          ? "Resume updated successfully!"
          : "Resume uploaded successfully!",
      );
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Upload failed. Please try again.",
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your resume?")) return;
    setError(null);
    setSuccess(null);
    setDeleting(true);
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

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <AuthLayout fullWidth noShadow>
      <div className={`px-6 py-10 max-w-7xl mx-auto rounded-xl ${theme.page} ${theme.heading}`}>
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-4 mb-10 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          {/* Search Bar */}
          <div className="relative w-full max-w-[450px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search candidates, jobs..." 
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          {/* User Profile & Notifications */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="text-gray-400 hover:text-white transition-colors" title="Notifications">
              <Bell size={22} />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="text-right text-sm text-white hidden sm:block">
                <span className="text-gray-400">Welcome back, </span>
                <span className="font-semibold">{localStorage.getItem('userName') || 'Candidate'}</span>
              </div>
              
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-base">
                {(localStorage.getItem('userName') || 'Candidate').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-600/20 flex items-center justify-center border border-purple-500/30">
                <Briefcase className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${theme.heading}`}>
                Candidate Dashboard
              </h1>
            </div>
            <p className={`${theme.subtext} mt-2 text-sm sm:text-base`}>
              Welcome back! Here is the status of your applications.
            </p>
          </div>
          
          {/* Profile Completeness */}
          <div className={`${theme.card} rounded-3xl p-4 flex items-center gap-4 w-full sm:w-72 shadow-[0_0_40px_rgba(124,58,237,0.08)]`}>
            <div className="flex-1">
              <div className={`text-sm ${theme.subtext} mb-1`}>Profile Completeness</div>
              <div className={`text-xl font-bold ${theme.heading}`}>85%</div>
            </div>
            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-linear-to-r from-purple-500 to-blue-500" style={{ width: "85%" }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Application Status Tracker */}
            <div className={`${theme.card} rounded-3xl p-6 shadow-[0_0_40px_rgba(124,58,237,0.08)]`}>
              <div className="flex items-center gap-2 mb-6">
                <Briefcase size={20} className="text-purple-400" />
                <h2 className={`text-lg font-semibold ${theme.heading}`}>Frontend Developer Application</h2>
              </div>
              
              {/* Desktop Progress Bar */}
              <div className="hidden sm:flex relative justify-between items-center mb-8">
                {/* Progress Bar Background */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>
                {/* Progress Bar Active */}
                <div className="absolute top-1/2 left-0 w-3/4 h-0.5 bg-purple-500 -translate-y-1/2 z-0"></div>
                
                {[
                  { label: "Applied", done: true },
                  { label: "Screening", done: true },
                  { label: "Technical Round", done: true },
                  { label: "Interview", active: true },
                  { label: "Offer", done: false },
                ].map((step, index) => (
                  <div key={index} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm
                      ${step.done ? "bg-purple-500" : step.active ? "bg-white border-2 border-purple-500 text-purple-500" : "bg-gray-200 dark:bg-gray-700 text-gray-500"}`}>
                      {step.done ? <CheckCircle size={16} /> : step.active ? <div className="w-2 h-2 rounded-full bg-purple-500"></div> : index + 1}
                    </div>
                    <span className={`text-xs ${step.active ? "text-purple-500 font-semibold" : theme.subtext} whitespace-nowrap`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mobile Progress Bar (Simple Linear) */}
              <div className="block sm:hidden mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-purple-500">Interview</span>
                  <span className={`text-xs ${theme.subtext}`}>Step 4 of 5</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: "75%" }}></div>
                </div>
              </div>
              
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 flex items-center gap-3">
                <Clock size={16} className="text-purple-400" />
                <p className={`text-sm ${theme.heading}`}>
                  Your application is currently under review for the interview stage.
                </p>
              </div>
            </div>

            {/* Upcoming Interview & Resume Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upcoming Interview */}
              <div className={`${theme.card} rounded-3xl p-6 shadow-[0_0_40px_rgba(124,58,237,0.08)] flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Video size={20} className="text-purple-400" />
                    <h2 className={`text-lg font-semibold ${theme.heading}`}>Upcoming Interview</h2>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${theme.heading}`}>Technical Round</h3>
                      <p className={`text-sm ${theme.subtext}`}>Today, 2:00 PM - 3:00 PM</p>
                    </div>
                  </div>
                  
                  <p className={`text-sm ${theme.subtext} mb-4`}>
                    Interviewer: <strong>Sarah Jenkins</strong> (Lead Engineer)
                  </p>
                </div>
                
                <button className="w-full py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
                  <Video size={18} /> Join Video Call
                </button>
              </div>

              {/* Resume Section */}
              <div className={`${theme.card} rounded-3xl p-6 shadow-[0_0_40px_rgba(124,58,237,0.08)] flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText size={20} className="text-purple-400" />
                    <h2 className={`text-lg font-semibold ${theme.heading}`}>Resume</h2>
                  </div>
                  
                  {error && (
                    <div className="mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="mb-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                      {success}
                    </div>
                  )}
                  
                  <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                  
                  {resumeLoading ? (
                    <div className="flex justify-center items-center py-6">
                      <Loader2 size={24} className="text-purple-400 animate-spin" />
                    </div>
                  ) : resume ? (
                    <div className="border border-dashed border-purple-500/20 rounded-xl p-4 flex flex-col items-center gap-2 mb-4 bg-purple-500/5">
                      <FileText size={32} className="text-purple-400" />
                      <p className={`font-semibold text-sm text-center break-all ${theme.heading}`}>{resume.originalName}</p>
                      <p className={`text-xs ${theme.subtext}`}>Uploaded {formatDate(resume.uploadedAt)}</p>
                    </div>
                  ) : (
                    <div onClick={() => !uploading && fileInputRef.current?.click()} className="border border-dashed border-purple-500/20 rounded-xl p-6 flex flex-col items-center gap-2 mb-4 bg-purple-500/5 cursor-pointer hover:border-purple-500 transition">
                      {uploading ? <Loader2 size={32} className="text-purple-400 animate-spin" /> : <Upload size={32} className="text-purple-400" />}
                      <p className={`font-medium text-sm ${theme.heading}`}>{uploading ? "Uploading..." : "Upload Resume"}</p>
                      <p className={`text-xs ${theme.subtext}`}>PDF, DOC, DOCX — max 5 MB</p>
                    </div>
                  )}
                </div>
                
                {resume && (
                  <div className="flex gap-2">
                    <a href={`${BASE_URL}${resume.url}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 border border-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 hover:bg-purple-500/5 transition">
                      <Eye size={16} />
                    </a>
                    <a href={`${BASE_URL}${resume.url}`} download={resume.originalName} className="flex-1 py-2 border border-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 hover:bg-purple-500/5 transition">
                      <Download size={16} />
                    </a>
                    <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex-2 py-2 bg-purple-500/10 text-purple-400 rounded-lg flex items-center justify-center gap-1 text-sm font-medium hover:bg-purple-500/20 transition">
                      {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                      Update
                    </button>
                    <button onClick={handleDelete} disabled={deleting} className="flex-1 py-2 bg-red-500/10 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition">
                      {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Action Items */}
            <div className={`${theme.card} rounded-3xl p-6 shadow-[0_0_40px_rgba(124,58,237,0.08)]`}>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={20} className="text-yellow-400" />
                <h2 className={`text-lg font-semibold ${theme.heading}`}>Action Items</h2>
              </div>
              
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 mt-0.5"></div>
                  <div>
                    <h4 className={`text-sm font-medium ${theme.heading}`}>Complete Technical Round</h4>
                    <p className={`text-xs ${theme.subtext}`}>Technical interview pending evaluation.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 mt-0.5"></div>
                  <div>
                    <h4 className={`text-sm font-medium ${theme.heading}`}>Interview Round</h4>
                    <p className={`text-xs ${theme.subtext}`}>Schedule your final interview with HR.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-500 mt-0.5" />
                  <div>
                    <h4 className={`text-sm font-medium line-through ${theme.subtext}`}>Screening Round</h4>
                    <p className={`text-xs ${theme.subtext}`}>Completed on Oct 24.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Assessment Results */}
            <div className={`${theme.card} rounded-3xl p-6 shadow-[0_0_40px_rgba(124,58,237,0.08)]`}>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={20} className="text-purple-400" />
                <h2 className={`text-lg font-semibold ${theme.heading}`}>Recent Results</h2>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-medium ${theme.heading}`}>Frontend Coding Challenge</span>
                    <span className="text-sm font-bold text-green-500">92/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "92%" }}></div>
                  </div>
                  <p className={`text-xs ${theme.subtext} mt-2`}>Excellent performance in React & TypeScript.</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-medium ${theme.heading}`}>Cognitive Aptitude Test</span>
                    <span className="text-sm font-bold text-blue-500">85/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}




