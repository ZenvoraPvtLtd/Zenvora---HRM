import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  UploadCloud,
  X,
  FileText,
  CheckCircle,
  Loader2,
} from "lucide-react";
import api from "../../utils/axiosInstance";

export interface JobApplicationData {
  id: number;
  title: string;
  company: string;
  location: string;
  [key: string]: unknown;
}

export const JobApplicationForm = ({
  jobId,
  jobs,
  onCancel,
}: {
  jobId: number;
  jobs: JobApplicationData[];
  onCancel: () => void;
}) => {
  const job = jobs.find((j) => j.id === jobId);

  const savedName = localStorage.getItem("userName") || "";
  const nameParts = savedName.trim().split(" ");
  const defaultFirstName = nameParts[0] || "";
  const defaultLastName = nameParts.slice(1).join(" ") || "";
  const defaultEmail = localStorage.getItem("userEmail") || "";
  const defaultPhone =
    localStorage.getItem("userPhone") ||
    localStorage.getItem("userPhoneNumber") ||
    "";

  const [form, setForm] = useState({
    firstName: defaultFirstName,
    lastName: defaultLastName,
    email: defaultEmail,
    phone: defaultPhone,
    linkedin: "",
    portfolio: "",
    coverLetter: "",
  });

  const [savedResume, setSavedResume] = useState<{
    url: string;
    originalName: string;
  } | null>(null);
  const [newResumeFile, setNewResumeFile] = useState<File | null>(null);
  const [useNewResume, setUseNewResume] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api
      .get("/api/candidate/resume")
      .then((res) => {
        const resume = res.data.resume;
        setSavedResume(resume);

        if (!defaultFirstName && resume?.originalName) {
          const nameFromResume = resume.originalName
            .replace(/\.[^.]+$/, "")
            .replace(/resume|cv/gi, "")
            .replace(/[_-]+/g, " ")
            .trim()
            .split(/\s+/)
            .filter(Boolean);

          if (nameFromResume.length) {
            setForm((current) => ({
              ...current,
              firstName: current.firstName || nameFromResume[0],
              lastName: current.lastName || nameFromResume.slice(1).join(" "),
            }));
          }
        }
      })
      .catch(() => setSavedResume(null));
  }, [defaultFirstName]);

  if (!job) return null;

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid var(--border)",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
    outline: "none",
    fontSize: "0.95rem",
    boxSizing: "border-box" as const,
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5 MB.");
      return;
    }
    setNewResumeFile(file);
    setUseNewResume(true);
    setError(null);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("jobId", String(job.id));
      formData.append("jobTitle", job.title);
      formData.append("company", job.company);
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      if (form.linkedin) formData.append("linkedin", form.linkedin);
      if (form.portfolio) formData.append("portfolio", form.portfolio);
      if (form.coverLetter) formData.append("coverLetter", form.coverLetter);
      if (useNewResume && newResumeFile)
        formData.append("resume", newResumeFile);

      await api.post("/api/applications", formData);
      setSuccess(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Submission failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div
        className="animate-fade-in"
        style={{ padding: "0 0.5rem", maxWidth: "800px", margin: "0 auto" }}
      >
        <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
          <CheckCircle
            size={56}
            style={{ color: "#10b981", margin: "0 auto 1.5rem" }}
          />
          <h2
            style={{
              fontSize: "1.75rem",
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
            }}
          >
            Application Submitted!
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: "2rem",
              fontSize: "1rem",
            }}
          >
            Your application for{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              {job.title}
            </strong>{" "}
            at{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              {job.company}
            </strong>{" "}
            has been submitted. Our HR team will review it shortly.
          </p>
          <button
            onClick={onCancel}
            style={{
              background: "var(--accent)",
              border: "none",
              color: "var(--accent-text)",
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="animate-fade-in"
      style={{ padding: "0 0.5rem", maxWidth: "800px", margin: "0 auto" }}
    >
      <div className="card" style={{ padding: "2.5rem" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div
            role="button"
            onClick={onCancel}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontWeight: 500,
              padding: 0,
            }}
          >
            <ChevronLeft size={18} /> Back
          </div>
          <button
            onClick={onCancel}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              padding: "0.5rem",
              borderRadius: "50%",
            }}
          >
            <X size={16} />
          </button>
        </div>

        <h2
          style={{
            fontSize: "1.75rem",
            color: "var(--text-primary)",
            marginBottom: "0.25rem",
            marginTop: 0,
          }}
        >
          Apply for {job.title}
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "2rem",
            fontSize: "1rem",
          }}
        >
          {job.company} • {job.location}
        </p>

        {error && (
          <div
            style={{
              marginBottom: "1.5rem",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#ef4444",
              fontSize: "0.875rem",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Name */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                }}
              >
                First Name *
              </label>
              <input
                required
                type="text"
                placeholder="John"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                style={inputStyle}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                }}
              >
                Last Name *
              </label>
              <input
                required
                type="text"
                placeholder="Doe"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Email */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              Email Address *
            </label>
            <input
              required
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />
          </div>

          {/* Phone */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              Phone Number *
            </label>
            <input
              required
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={inputStyle}
            />
          </div>

          {/* LinkedIn + Portfolio */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                }}
              >
                LinkedIn (Optional)
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/..."
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                }}
              >
                Portfolio (Optional)
              </label>
              <input
                type="url"
                placeholder="https://yourportfolio.com"
                value={form.portfolio}
                onChange={(e) =>
                  setForm({ ...form, portfolio: e.target.value })
                }
                style={inputStyle}
              />
            </div>
          </div>

          {/* Resume */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <label
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              Resume / CV
            </label>

            {/* Saved resume option */}
            {savedResume && (
              <div
                onClick={() => setUseNewResume(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.875rem 1rem",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  border: `1px solid ${!useNewResume ? "var(--accent)" : "var(--border)"}`,
                  background: !useNewResume
                    ? "var(--icon-accent-bg)"
                    : "transparent",
                  transition: "all 0.15s",
                }}
              >
                <FileText
                  size={20}
                  style={{
                    color: !useNewResume
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {savedResume.originalName}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Saved resume
                  </div>
                </div>
                {!useNewResume && (
                  <CheckCircle
                    size={16}
                    style={{ color: "var(--accent)", flexShrink: 0 }}
                  />
                )}
              </div>
            )}

            {/* New file option */}
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${useNewResume ? "var(--accent)" : "var(--border)"}`,
                borderRadius: "0.5rem",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: useNewResume
                  ? "var(--icon-accent-bg)"
                  : "rgba(255,255,255,0.02)",
                cursor: "pointer",
                transition: "all 0.15s",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => {
                if (!useNewResume)
                  e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                if (!useNewResume)
                  e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <UploadCloud
                size={28}
                style={{
                  color: useNewResume
                    ? "var(--accent)"
                    : "var(--text-secondary)",
                }}
              />
              <div
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                }}
              >
                {newResumeFile
                  ? newResumeFile.name
                  : "Upload a different resume"}
              </div>
              <div
                style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}
              >
                PDF, DOC, DOCX — max 5 MB
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {!savedResume && !newResumeFile && (
              <p style={{ fontSize: "0.8rem", color: "#f59e0b", margin: 0 }}>
                No saved resume found. Please upload one above or go to your
                dashboard to upload it first.
              </p>
            )}
          </div>

          {/* Cover Letter */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              Cover Letter (Optional)
            </label>
            <textarea
              placeholder="Why are you a good fit for this role?"
              value={form.coverLetter}
              onChange={(e) =>
                setForm({ ...form, coverLetter: e.target.value })
              }
              style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }}
            />
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              marginTop: "0.5rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <button
              type="button"
              onClick={onCancel}
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                background: "var(--accent)",
                border: "none",
                color: "var(--accent-text)",
                padding: "0.75rem 2rem",
                borderRadius: "0.5rem",
                cursor: submitting ? "not-allowed" : "pointer",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? (
                <>
                  <Loader2
                    size={16}
                    style={{ animation: "spin 1s linear infinite" }}
                  />{" "}
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
