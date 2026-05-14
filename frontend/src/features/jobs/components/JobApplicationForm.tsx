import React from 'react';
import { ChevronLeft, UploadCloud } from 'lucide-react';

export const JobApplicationForm = ({ 
  jobId, 
  jobs, 
  onCancel 
}: { 
  jobId: number, 
  jobs: any[], 
  onCancel: () => void 
}) => {
  const job = jobs.find(j => j.id === jobId);
  
  if (!job) return null;

  return (
    <div className="animate-fade-in" style={{ padding: '0 0.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={onCancel}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0 0 1.5rem 0', fontWeight: 500 }}
      >
        <ChevronLeft size={18} /> Back
      </button>

      <div className="card" style={{ padding: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Apply for {job.title}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>at {job.company} • {job.location}</p>

        <form onSubmit={(e) => { e.preventDefault(); alert('Application submitted successfully! Our HR team will review your resume.'); onCancel(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>First Name</label>
              <input required type="text" placeholder="John" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Last Name</label>
              <input required type="text" placeholder="Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Email Address</label>
            <input required type="email" placeholder="john.doe@example.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Phone Number</label>
            <input required type="tel" placeholder="+1 (555) 000-0000" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Resume / CV</label>
            <div style={{ 
              border: '2px dashed var(--border)', borderRadius: '0.5rem', padding: '2rem', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
              background: 'rgba(255,255,255,0.02)', cursor: 'pointer' 
            }}>
              <UploadCloud size={32} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
              <div style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.25rem' }}>Click to upload or drag and drop</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>PDF, DOCX up to 10MB</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Cover Letter (Optional)</label>
            <textarea placeholder="Why are you a good fit for this role?" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none', minHeight: '120px', resize: 'vertical' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <button type="button" onClick={onCancel} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
            <button type="submit" style={{ background: 'var(--accent)', border: 'none', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>Submit Application</button>
          </div>
        </form>
      </div>
    </div>
  );
};
