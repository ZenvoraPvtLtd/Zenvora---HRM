import { useState } from 'react';
import { AlertCircle, CheckCircle, ChevronLeft, UploadCloud, X } from 'lucide-react';
import API_BASE_URL from '../../../config/apiConfig';

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
  onCancel 
}: { 
  jobId: number, 
  jobs: JobApplicationData[], 
  onCancel: () => void 
}) => {
  const job = jobs.find(j => j.id === jobId);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  
  if (!job) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    if (!resumeFile) {
      setApiError('Please upload your resume before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('job_title', String(job.title));
    formData.append('title', String(job.title));
    formData.append('department', String(job.field || ''));
    formData.append('field', String(job.field || ''));
    formData.append('location', String(job.location));
    formData.append('experience_required', String(job.experience));
    formData.append('experience', String(job.experience));
    formData.append('required_skills', JSON.stringify(job.tags || []));
    formData.append('tags', JSON.stringify(job.tags || []));
    formData.append('job_description', String(job.description));
    formData.append('description', String(job.description));

    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/candidate/applications`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Application submission failed.');
      }

      setAnalysis(result.analysis);
    } catch (error: any) {
      setApiError(error?.message || 'Application submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '0 0.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div 
            role="button"
            onClick={onCancel}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500, padding: 0 }}
          >
            <ChevronLeft size={18} /> Back
          </div>
          <button 
            onClick={onCancel}
            title="Cancel"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <X size={16} />
          </button>
        </div>

        <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Apply for {job.title}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>at {job.company} • {job.location}</p>

        {analysis && (
          <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '0.5rem', color: 'var(--text-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              <CheckCircle size={18} style={{ color: '#10b981' }} /> Application analyzed
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', fontSize: '0.875rem' }}>
              <div><strong>Candidate:</strong> {analysis.candidate?.name || 'Candidate'}</div>
              <div><strong>Role:</strong> {analysis.application?.role || job.title}</div>
              <div><strong>Match:</strong> {analysis.application?.matchScore ?? 0}%</div>
              <div><strong>Status:</strong> {analysis.application?.status || 'Pending'}</div>
              <div><strong>Risk:</strong> {analysis.ai?.riskAnalysis?.decision || 'SAFE'}</div>
              <div><strong>Ranking:</strong> {analysis.ai?.rankingResult?.ranking || 'Analysis Complete'}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>First Name</label>
              <input required type="text" placeholder="John" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none', fontSize: '1rem' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Last Name</label>
              <input required type="text" placeholder="Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none', fontSize: '1rem' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Email Address</label>
            <input required type="email" placeholder="john.doe@example.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none', fontSize: '1rem' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Phone Number</label>
            <input required type="tel" placeholder="+1 (555) 000-0000" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none', fontSize: '1rem' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>LinkedIn Profile (Optional)</label>
              <input type="url" placeholder="https://linkedin.com/in/johndoe" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none', fontSize: '1rem' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Portfolio URL (Optional)</label>
              <input type="url" placeholder="https://johndoe.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none', fontSize: '1rem' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Resume / CV</label>
            <label style={{ 
              border: '2px dashed var(--border)', borderRadius: '0.5rem', padding: '2rem', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
              background: 'rgba(255,255,255,0.02)', cursor: 'pointer' 
            }}>
              <input
                required
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(event) => setResumeFile(event.target.files?.[0] || null)}
                style={{ display: 'none' }}
              />
              <UploadCloud size={32} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
              <div style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.25rem', fontSize: '1rem' }}>Click to upload or drag and drop</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{resumeFile ? resumeFile.name : 'PDF, DOCX up to 5MB'}</div>
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Cover Letter (Optional)</label>
            <textarea placeholder="Why are you a good fit for this role?" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none', minHeight: '120px', resize: 'vertical', fontSize: '1rem' }} />
          </div>

          {apiError && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1rem', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '0.5rem', color: '#ef4444', background: 'rgba(239, 68, 68, 0.08)' }}>
              <AlertCircle size={18} /> {apiError}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <button type="button" onClick={onCancel} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
            <button disabled={isSubmitting} type="submit" style={{ background: 'var(--accent)', border: 'none', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Analyzing...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
