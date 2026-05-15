
import { Bookmark, Briefcase, DollarSign, MapPin, CheckCircle2, ChevronLeft } from 'lucide-react';
import { JobLogo } from './JobLogo';

export interface JobDetailData {
  id: number;
  logoLetter: string;
  logoBg: string;
  title: string;
  experience: string;
  salary: string;
  location: string;
  company: string;
  posted: string;
  field: string;
  description: string;
  responsibilities: string[];
  whoYouAre: string[];
  [key: string]: unknown;
}

export const JobDetail = ({ 
  jobs, 
  selectedJobId, 
  setSelectedJobId,
  onApply
}: { 
  jobs: JobDetailData[], 
  selectedJobId: number, 
  setSelectedJobId: (id: number | null) => void,
  onApply: () => void
}) => {
  const selectedJob = jobs.find(j => j.id === selectedJobId);

  if (!selectedJob) return null;

  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      {/* Left Side List */}
      <div style={{ width: '350px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div 
          role="button"
          onClick={() => setSelectedJobId(null)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0 0 0.5rem 0', fontWeight: 500 }}
        >
          <ChevronLeft size={18} /> Back to all jobs
        </div>
        
        {jobs.map(job => (
          <div 
            key={job.id} 
            onClick={() => setSelectedJobId(job.id)}
            style={{ 
              padding: '1rem 1.25rem', 
              cursor: 'pointer',
              borderRadius: '0.75rem',
              border: selectedJobId === job.id 
                ? '2px solid var(--accent)' 
                : '1px solid var(--border)',
              background: selectedJobId === job.id 
                ? 'rgba(124, 58, 237, 0.1)' 
                : 'var(--bg-secondary)',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <JobLogo letter={job.logoLetter} bg={job.logoBg} size={32} />
              <Bookmark size={16} style={{ color: selectedJobId === job.id ? 'var(--accent)' : 'var(--text-secondary)' }}/>
            </div>
            <h4 style={{ margin: '0 0 0.375rem 0', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{job.title}</h4>
            <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              <span>{job.experience}</span>
              <span>{job.salary}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              <MapPin size={12}/> {job.location}
            </div>
          </div>
        ))}
      </div>

      {/* Right Side Details */}
      <div className="card animate-fade-in" style={{ flex: 1, padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <JobLogo letter={selectedJob.logoLetter} bg={selectedJob.logoBg} size={64} />
            <div>
              <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', color: 'var(--text-primary)' }}>{selectedJob.title}</h1>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{selectedJob.company} • {selectedJob.posted}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Bookmark size={20} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}/>
            <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>Book Slot</button>
            <button onClick={onApply} style={{ background: 'var(--accent)', border: 'none', color: 'white', padding: '0.625rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>Apply Now</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Experience</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 500 }}><Briefcase size={14} color="var(--text-secondary)"/> {selectedJob.experience}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Salary</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 500 }}><DollarSign size={14} color="var(--accent)"/> {selectedJob.salary}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Business Field</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 500 }}>{selectedJob.field}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Location</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 500 }}><MapPin size={14} color="var(--text-secondary)"/> {selectedJob.location}</div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Job Description</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '1rem' }}>{selectedJob.description}</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Responsibilities</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {selectedJob.responsibilities.map((req: string, idx: number) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                <CheckCircle2 size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Who You Are</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {selectedJob.whoYouAre.map((req: string, idx: number) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
                {req}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};
