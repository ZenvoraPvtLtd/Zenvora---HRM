
import { Search, Briefcase, MapPin } from 'lucide-react';

export const JobSearch = () => {
  return (
    <div className="card" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input 
          type="text" 
          placeholder="Job title or keyword" 
          style={{ 
            width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', 
            borderRadius: '0.5rem', border: '1px solid var(--border)', 
            background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', outline: 'none'
          }} 
        />
      </div>
      <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
        <Briefcase size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <select style={{ 
          width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', appearance: 'none',
          borderRadius: '0.5rem', border: '1px solid var(--border)', 
          background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', outline: 'none'
        }}>
          <option>Select Experience</option>
          <option>Fresher</option>
          <option>1-3 Years</option>
          <option>4-5 Years</option>
        </select>
      </div>
      <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
        <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <select style={{ 
          width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', appearance: 'none',
          borderRadius: '0.5rem', border: '1px solid var(--border)', 
          background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', outline: 'none'
        }}>
          <option>Select Location</option>
          <option>California, USA</option>
          <option>New York, USA</option>
          <option>Remote</option>
        </select>
      </div>
      <button style={{ 
        background: 'var(--accent)', color: 'white', border: 'none', 
        padding: '0.75rem 2rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 
      }}>
        Search
      </button>
    </div>
  );
};
