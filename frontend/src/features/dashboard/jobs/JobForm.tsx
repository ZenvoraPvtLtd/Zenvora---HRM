import React from 'react';
import { ChevronLeft } from 'lucide-react';

export interface JobFormData {
  title: string;
  description: string;
  department: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: string;
  salaryMax: string;
  skills: string;
  responsibilities: string;
  qualifications: string;
  openings: string;
  status: string;
  applicationDeadline: string;
  [key: string]: any;
}

export const JobForm = ({ 
  newJob, 
  setNewJob, 
  handleCreateJob, 
  setIsCreatingJob,
  isEditing = false
}: {
  newJob: JobFormData,
  setNewJob: (job: JobFormData) => void,
  handleCreateJob: (e: React.FormEvent) => void,
  setIsCreatingJob: (creating: boolean) => void,
  isEditing?: boolean
}) => {
  return (
    <div className="animate-fade-in" style={{ padding: '0 0.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <div className="card" style={{ padding: '2.5rem' }}>
        <div 
          role="button"
          onClick={() => setIsCreatingJob(false)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0 0 1.5rem 0', fontWeight: 500 }}
        >
          <ChevronLeft size={18} /> Back to Job Board
        </div>

        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem', marginTop: 0 }}>
          {isEditing ? 'Edit Job Posting' : 'Create New Job Posting'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Please provide the detailed specifications for this position.
        </p>

        <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Basic Info */}
          <div className="profile-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Job Title</label>
              <input required type="text" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} placeholder="e.g. Senior Frontend Developer" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Department</label>
              <input required type="text" value={newJob.department} onChange={e => setNewJob({...newJob, department: e.target.value})} placeholder="e.g. Engineering" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
          </div>

          <div className="profile-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Location</label>
              <input required type="text" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} placeholder="e.g. Remote / New York" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Job Type</label>
              <select required value={newJob.jobType} onChange={e => setNewJob({...newJob, jobType: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          {/* Details & Experience */}
          <div className="profile-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Experience Level</label>
              <input required type="text" value={newJob.experienceLevel} onChange={e => setNewJob({...newJob, experienceLevel: e.target.value})} placeholder="e.g. 5+ Years" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Openings</label>
              <input type="number" value={newJob.openings} onChange={e => setNewJob({...newJob, openings: e.target.value})} placeholder="1" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
          </div>

          {/* Salary Range */}
          <div className="profile-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Salary Min (Annual)</label>
              <input type="number" value={newJob.salaryMin} onChange={e => setNewJob({...newJob, salaryMin: e.target.value})} placeholder="e.g. 50000" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Salary Max (Annual)</label>
              <input type="number" value={newJob.salaryMax} onChange={e => setNewJob({...newJob, salaryMax: e.target.value})} placeholder="e.g. 80000" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
          </div>

          {/* Status & Deadline */}
          <div className="profile-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</label>
              <select value={newJob.status} onChange={e => setNewJob({...newJob, status: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }}>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Paused">Paused</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Application Deadline</label>
              <input type="date" value={newJob.applicationDeadline} onChange={e => setNewJob({...newJob, applicationDeadline: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
            </div>
          </div>

          {/* Multiline Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Job Description</label>
            <textarea required value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} placeholder="Overall job purpose..." style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none', minHeight: '100px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Responsibilities (One per line)</label>
            <textarea required value={newJob.responsibilities} onChange={e => setNewJob({...newJob, responsibilities: e.target.value})} placeholder="List primary duties..." style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none', minHeight: '100px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Qualifications (One per line)</label>
            <textarea required value={newJob.qualifications} onChange={e => setNewJob({...newJob, qualifications: e.target.value})} placeholder="Required education or experience..." style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none', minHeight: '100px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Skills (Comma separated)</label>
            <input required type="text" value={newJob.skills} onChange={e => setNewJob({...newJob, skills: e.target.value})} placeholder="e.g. React, Node.js, TypeScript" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'white', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => setIsCreatingJob(false)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
            <button type="submit" style={{ background: 'var(--text-purple)', border: 'none', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
              {isEditing ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
