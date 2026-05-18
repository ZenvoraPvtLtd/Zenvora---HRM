import { useState, useEffect, useRef } from 'react';
import api from '../../utils/axiosInstance';
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
  Loader2
} from 'lucide-react';

interface ResumeData {
  url: string;
  originalName: string;
  mimeType: string;
  uploadedAt: string;
}

export default function CandidateDashboard() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [resumeLoading, setResumeLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    setResumeLoading(true);
    try {
      const res = await api.get('/api/candidate/resume');
      setResume(res.data.resume);
    } catch (err: any) {
      if (err.response?.status !== 404) {
        setError('Failed to load resume.');
      }
      setResume(null);
    } finally {
      setResumeLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) {
      setError('Only PDF, DOC, or DOCX files are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5 MB.');
      return;
    }

    setError(null);
    setSuccess(null);
    setUploading(true);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await api.post('/api/candidate/resume', formData);
      setResume(res.data.resume);
      setSuccess(resume ? 'Resume updated successfully!' : 'Resume uploaded successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your resume?')) return;
    setError(null);
    setSuccess(null);
    setDeleting(true);
    try {
      await api.delete('/api/candidate/resume');
      setResume(null);
      setSuccess('Resume deleted successfully.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Delete failed.');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="animate-fade-in candidate-dashboard">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="page-title">Candidate Dashboard</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>Welcome back! Here is the status of your applications.</p>
        </div>
        <div className="profile-completeness card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem', width: '300px' }}>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Profile Completeness</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--text-primary)' }}>85%</div>
          </div>
          <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '85%', height: '100%', background: 'linear-gradient(to right, #6366f1, #a855f7)', borderRadius: '4px' }}></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Application Status Tracker */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={20} style={{ color: 'var(--accent)' }} /> Frontend Developer Application
            </h2>
            <div className="status-tracker" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '14px', left: '20px', right: '20px', height: '2px', backgroundColor: 'var(--border)', zIndex: 0 }}></div>
              <div style={{ position: 'absolute', top: '14px', left: '20px', width: '75%', height: '2px', backgroundColor: 'var(--accent)', zIndex: 0 }}></div>
              {[
                { label: 'Applied', done: true },
                { label: 'Screening', done: true },
                { label: 'Technical Round', done: true },
                { label: 'Interview', active: true },
                { label: 'Offer', done: false },
              ].map((step) => (
                <div key={step.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1 }}>
                  <div style={{
                    width: '30px', height: '30px', borderRadius: '50%',
                    backgroundColor: step.done ? 'var(--accent)' : step.active ? 'var(--bg-primary)' : 'var(--bg-primary)',
                    border: step.active ? '2px solid var(--accent)' : step.done ? 'none' : '2px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                  }}>
                    {step.done ? <CheckCircle size={16} /> : step.active ? (
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                    ) : null}
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: step.active ? 500 : undefined, color: step.active ? 'var(--accent)' : step.done ? undefined : 'var(--text-secondary)' }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} style={{ color: 'var(--accent)' }} /> Your application is currently under review for the interview stage.
              </p>
            </div>
          </div>

          {/* Upcoming Interview + Resume */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>

            {/* Upcoming Interview */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Video size={20} style={{ color: 'var(--accent)' }} /> Upcoming Interview
              </h2>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', minWidth: '48px', borderRadius: '0.75rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Technical Round</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Today, 2:00 PM - 3:00 PM</p>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Interviewer: <strong>Sarah Jenkins</strong> (Lead Engineer)
                </p>
              </div>
              <button style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', background: 'linear-gradient(to right, #3b82f6, #6366f1)', color: 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Video size={18} /> Join Video Call
              </button>
            </div>

            {/* Resume Section */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} style={{ color: 'var(--accent)' }} /> Resume
              </h2>

              {/* Feedback messages */}
              {error && (
                <div style={{ marginBottom: '0.75rem', padding: '0.6rem 0.875rem', borderRadius: '0.5rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '0.8rem' }}>
                  {error}
                </div>
              )}
              {success && (
                <div style={{ marginBottom: '0.75rem', padding: '0.6rem 0.875rem', borderRadius: '0.5rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', fontSize: '0.8rem' }}>
                  {success}
                </div>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {resumeLoading ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                  <Loader2 size={24} style={{ color: 'var(--accent)', animation: 'spin 1s linear infinite' }} />
                </div>
              ) : resume ? (
                <>
                  {/* Resume info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', border: '1px dashed var(--border)', borderRadius: '0.75rem', marginBottom: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', gap: '0.375rem' }}>
                    <FileText size={36} style={{ color: 'var(--accent)' }} />
                    <p style={{ fontWeight: 600, fontSize: '0.875rem', textAlign: 'center', wordBreak: 'break-all' }}>{resume.originalName}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Uploaded {formatDate(resume.uploadedAt)}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a
                      href={`${BASE_URL}${resume.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View"
                      style={{ flex: 1, padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border)', backgroundColor: 'transparent', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                    >
                      <Eye size={16} />
                    </a>
                    <a
                      href={`${BASE_URL}${resume.url}`}
                      download={resume.originalName}
                      title="Download"
                      style={{ flex: 1, padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border)', backgroundColor: 'transparent', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                    >
                      <Download size={16} />
                    </a>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      title="Update"
                      style={{ flex: 2, padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--accent)', backgroundColor: 'rgba(99,102,241,0.1)', color: 'var(--accent)', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', fontSize: '0.875rem' }}
                    >
                      {uploading ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={15} />}
                      {uploading ? 'Uploading...' : 'Update'}
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      title="Delete"
                      style={{ flex: 1, padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid rgba(239,68,68,0.4)', backgroundColor: 'rgba(239,68,68,0.08)', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {deleting ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={15} />}
                    </button>
                  </div>
                </>
              ) : (
                /* No resume — upload zone */
                <div
                  onClick={() => !uploading && fileInputRef.current?.click()}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 1rem', border: '2px dashed var(--border)', borderRadius: '0.75rem', cursor: uploading ? 'not-allowed' : 'pointer', backgroundColor: 'rgba(255,255,255,0.02)', gap: '0.5rem', transition: 'border-color 0.2s' }}
                  onMouseEnter={(e) => { if (!uploading) e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  {uploading ? (
                    <Loader2 size={32} style={{ color: 'var(--accent)', animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <Upload size={32} style={{ color: 'var(--text-secondary)' }} />
                  )}
                  <p style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {uploading ? 'Uploading...' : 'Upload Resume'}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                    PDF, DOC, DOCX — max 5 MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Action Items */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={20} style={{ color: '#f59e0b' }} /> Action Items
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '20px', height: '20px', minWidth: '20px', borderRadius: '4px', border: '2px solid var(--border)', marginTop: '2px' }}></div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Complete Technical Round</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Technical interview pending evaluation.</p>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '20px', height: '20px', minWidth: '20px', borderRadius: '4px', border: '2px solid var(--border)', marginTop: '2px' }}></div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Interview Round</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Schedule your final interview with HR.</p>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle size={20} style={{ color: '#10b981', marginTop: '2px', minWidth: '20px' }} />
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>Screening Round</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Completed on Oct 24.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Assessment Results */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={20} style={{ color: 'var(--accent)' }} /> Recent Results
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>Frontend Coding Challenge</span>
                  <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.875rem' }}>92/100</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '92%', height: '100%', backgroundColor: '#10b981' }}></div>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Excellent performance in React & TypeScript.</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>Cognitive Aptitude Test</span>
                  <span style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '0.875rem' }}>85/100</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', backgroundColor: '#3b82f6' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
