import { Bookmark, MoreHorizontal, Briefcase, DollarSign, MapPin, Pencil, Trash2 } from 'lucide-react';
import { JobLogo } from './JobLogo';

export interface JobCardData {
  logoLetter: string;
  logoBg: string;
  title: string;
  experience: string;
  salary: string;
  location: string;
  tags: string[];
  [key: string]: unknown;
}

export const JobCard = ({ job, isAdmin = false, onClick, onApply, onEdit, onDelete }: { 
  job: JobCardData, 
  isAdmin?: boolean,
  onClick: () => void, 
  onApply: () => void,
  onEdit?: () => void,
  onDelete?: () => void
}) => {
  return (
    <div className="card hover-effect" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <JobLogo letter={job.logoLetter} bg={job.logoBg} />
        <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)' }}>
          {isAdmin ? (
            <>
              <Pencil size={18} style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); onEdit?.(); }} />
              <Trash2 size={18} style={{ cursor: 'pointer', color: '#ef4444' }} onClick={(e) => { e.stopPropagation(); onDelete?.(); }} />
            </>
          ) : (
            <>
              <Bookmark size={18} style={{ cursor: 'pointer' }} />
              <MoreHorizontal size={18} style={{ cursor: 'pointer' }} />
            </>
          )}
        </div>
      </div>

      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: 'var(--text-primary)' }}>{job.title}</h3>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={14} /> {job.experience}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><DollarSign size={14} /> {job.salary}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.8125rem', marginBottom: '1rem' }}>
        <MapPin size={14} /> {job.location}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {job.tags.map((tag: string, idx: number) => (
          <span key={idx} style={{
            padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem',
            background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)'
          }}>
            {tag}
          </span>
        ))}
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <span
          onClick={onClick}
          style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500 }}
        >
          Detail Information
        </span>
        {!isAdmin && (
          <button
            onClick={(e) => { e.stopPropagation(); onApply(); }}
            style={{
              background: 'var(--accent)', color: 'white', border: 'none',
              padding: '0.5rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem'
            }}
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};
