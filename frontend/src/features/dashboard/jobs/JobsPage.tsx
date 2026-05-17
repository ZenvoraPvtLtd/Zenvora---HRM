import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { JobDetail } from "./JobDetail";
import { JobForm, type JobFormData } from "./JobForm";
import {
  createEmptyJobForm,
  deleteJob,
  fetchJobs,
  toJobFormData,
  updateJob,
} from "./jobStore";

export default function JobsPage({
  isCandidateView = false,
}: {
  isCandidateView?: boolean;
}) {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | number | null>(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [newJob, setNewJob] = useState<JobFormData>(createEmptyJobForm());

  useEffect(() => {
    (async () => {
      setLoading(true);
      setApiError(null);
      try {
        setJobs(await fetchJobs());
      } catch (err: any) {
        setApiError(err.message || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJobId) return;
    try {
      const updated = await updateJob(editingJobId, newJob);
      setJobs(jobs.map((j) => (j.id === editingJobId ? updated : j)));
      setEditingJobId(null);
      setIsCreatingJob(false);
      setNewJob(createEmptyJobForm());
    } catch (err: any) {
      setApiError(err.message || "Failed to update job");
    }
  };

  const handleDeleteJob = async (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteJob(id);
      setJobs(jobs.filter((j) => j.id !== id));
      if (selectedJobId === id) setSelectedJobId(null);
    } catch (err: any) {
      setApiError(err.message || "Failed to delete job");
    }
  };

  const handleEditJob = (id: string | number) => {
    const job = jobs.find((j) => j.id === id);
    if (job) {
      setNewJob(toJobFormData(job));
      setEditingJobId(id);
      setIsCreatingJob(true);
    }
  };

  const closeJobForm = (val: boolean) => {
    if (!val) {
      setEditingJobId(null);
      setNewJob(createEmptyJobForm());
    }
    setIsCreatingJob(val);
  };

  if (isCreatingJob) {
    return (
      <JobForm
        newJob={newJob}
        setNewJob={setNewJob}
        handleCreateJob={handleCreateJob}
        setIsCreatingJob={closeJobForm}
        isEditing={!!editingJobId}
      />
    );
  }

  if (selectedJobId !== null) {
    return (
      <JobDetail
        jobs={jobs}
        selectedJobId={selectedJobId}
        setSelectedJobId={setSelectedJobId}
        onApply={() => {}}
        isAdmin={!isCandidateView}
      />
    );
  }

  const activeJobs = jobs.filter((j) => j.status === "active" || j.isActive || j.status !== "closed");
  const closedJobs = jobs.filter((j) => j.status === "closed");

  const tabJobs =
    activeTab === "active" ? activeJobs :
    activeTab === "closed" ? closedJobs :
    jobs;

  const filtered = tabJobs.filter((j) => {
    const q = search.toLowerCase();
    return (
      !q ||
      (j.title || j.role || "").toLowerCase().includes(q) ||
      (j.department || j.location || "").toLowerCase().includes(q) ||
      (j.type || j.jobType || "").toLowerCase().includes(q)
    );
  });

  const statusColor = (job: any) => {
    if (job.status === "closed") return { bg: "rgba(239,68,68,0.15)", color: "#f87171" };
    return { bg: "rgba(16,185,129,0.15)", color: "#10b981" };
  };

  const statusLabel = (job: any) =>
    job.status === "closed" ? "Closed" : "Active";

  return (
    <div className="animate-fade-in px-2 sm:px-4">
      <h1
        className="page-title text-xl sm:text-2xl font-bold mb-4 sm:mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        Create Jobs
      </h1>

      {apiError && (
        <div
          className="rounded-xl px-4 py-3 mb-4 text-sm"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}
        >
          {apiError}
        </div>
      )}

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
      >
        {/* Tabs */}
        <div
          className="flex overflow-x-auto gap-4 sm:gap-10 px-4 sm:px-8"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {[
            { key: "all", label: "All Jobs", count: jobs.length },
            { key: "active", label: "Active", count: activeJobs.length },
            { key: "closed", label: "Closed", count: closedJobs.length },
          ].map((tab) => (
            <div
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="py-4 shrink-0 cursor-pointer text-sm font-medium transition-colors border-b-2 flex items-center gap-2"
              style={{
                borderBottomColor: activeTab === tab.key ? "var(--text-purple)" : "transparent",
                color: activeTab === tab.key ? "var(--text-purple)" : "var(--text-secondary)",
              }}
            >
              {tab.label}
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  background: activeTab === tab.key ? "var(--icon-accent-bg)" : "var(--bg-hover)",
                  color: activeTab === tab.key ? "var(--text-purple)" : "var(--text-secondary)",
                }}
              >
                {tab.count}
              </span>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-secondary)" }}
            />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{
                background: "var(--bg-primary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {!isCandidateView && (
            <button
              onClick={() => navigate("/createjobs/create")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--text-purple)", color: "#fff", border: "none", cursor: "pointer" }}
            >
              <Plus size={16} /> Create Job
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-4 sm:px-8 pb-6">
          <table className="w-full text-left border-collapse" style={{ minWidth: "600px" }}>
            <thead>
              <tr
                className="text-xs font-semibold"
                style={{ borderBottom: "1px solid var(--border)", color: "var(--text-secondary)" }}
              >
                <th className="py-3 px-2">#</th>
                <th className="py-3 px-2">Job Title</th>
                <th className="py-3 px-2">Department</th>
                <th className="py-3 px-2">Type</th>
                <th className="py-3 px-2">Location</th>
                <th className="py-3 px-2">Status</th>
                {!isCandidateView && <th className="py-3 px-2 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                    Loading jobs...
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                    No jobs found.
                  </td>
                </tr>
              )}
              {!loading && filtered.map((job, index) => {
                const { bg, color } = statusColor(job);
                return (
                  <tr
                    key={job.id}
                    className="text-sm transition-colors"
                    style={{ borderBottom: "1px solid var(--border)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td className="py-4 px-2" style={{ color: "var(--text-secondary)" }}>
                      {index + 1}
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-semibold text-sm"
                          style={{ background: "var(--icon-accent-bg)", color: "var(--text-purple)" }}
                        >
                          {(job.title || job.role || "J").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div
                            className="font-medium cursor-pointer hover:underline"
                            style={{ color: "var(--text-primary)" }}
                            onClick={() => setSelectedJobId(job.id)}
                          >
                            {job.title || job.role || "—"}
                          </div>
                          {job.salary && (
                            <div className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                              {job.salary}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2" style={{ color: "var(--text-secondary)" }}>
                      {job.department || "—"}
                    </td>
                    <td className="py-4 px-2" style={{ color: "var(--text-secondary)" }}>
                      {job.type || job.jobType || "—"}
                    </td>
                    <td className="py-4 px-2" style={{ color: "var(--text-secondary)" }}>
                      {job.location || "—"}
                    </td>
                    <td className="py-4 px-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: bg, color }}
                      >
                        {statusLabel(job)}
                      </span>
                    </td>
                    {!isCandidateView && (
                      <td className="py-4 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditJob(job.id)}
                            className="p-1.5 rounded-lg transition-colors"
                            style={{ color: "var(--text-secondary)", border: "1px solid var(--border)", background: "transparent", cursor: "pointer" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-purple)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="p-1.5 rounded-lg transition-colors"
                            style={{ color: "var(--text-secondary)", border: "1px solid var(--border)", background: "transparent", cursor: "pointer" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
