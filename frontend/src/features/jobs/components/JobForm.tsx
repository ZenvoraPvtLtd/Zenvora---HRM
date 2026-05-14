import React from 'react';
import { ChevronLeft } from 'lucide-react';

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  field: string;
  experience: string;
  salary: string;
  description: string;
  [key: string]: unknown;
}

export const JobForm = ({ 
  newJob, 
  setNewJob, 
  handleCreateJob, 
  setIsCreatingJob 
}: {
  newJob: JobFormData,
  setNewJob: (job: JobFormData) => void,
  handleCreateJob: (e: React.FormEvent) => void,
  setIsCreatingJob: (creating: boolean) => void
}) => {
  return (
    <div className="animate-fade-in" style={{ padding: '0 0.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={() => setIsCreatingJob(false)}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0 0 1.5rem 0', fontWeight: 500 }}
      >
        <ChevronLeft size={18} /> Back to Job Board
      </button>

      <div className="card" style={{ padding: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Create New Job Posting</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Fill in the details below to publish a new open position.</p>

        <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Job Title</label>
              <input required type="text" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} placeholder="e.g. Senior Frontend Developer" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Company Name</label>
              <input required type="text" value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} placeholder="e.g. Zenvora" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Location</label>
              <input required type="text" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} placeholder="e.g. Remote, USA" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Business Field</label>
              <input required type="text" value={newJob.field} onChange={e => setNewJob({...newJob, field: e.target.value})} placeholder="e.g. Technology" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Experience Required</label>
              <select value={newJob.experience} onChange={e => setNewJob({...newJob, experience: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }}>
                <option>Fresher</option>
                <option>1-3 Years</option>
                <option>4-5 Years</option>
                <option>5+ Years</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Salary</label>
              <input type="text" value={newJob.salary} onChange={e => setNewJob({...newJob, salary: e.target.value})} placeholder="e.g. $100,000 /Month" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Job Description</label>
            <textarea required value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} placeholder="Describe the role..." style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none', minHeight: '120px', resize: 'vertical' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => setIsCreatingJob(false)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
            <button type="submit" style={{ background: 'var(--text-purple)', border: 'none', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>Publish Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};
