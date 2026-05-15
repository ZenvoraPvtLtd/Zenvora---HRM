import { useState } from 'react';
import { Search, Filter, Calendar, Mail, FileText, CheckCircle, XCircle, Clock, Video } from 'lucide-react';

const initialCandidates = [
  {
    id: 1,
    name: 'Bessie Cooper',
    email: 'bessie.cooper@example.com',
    avatar: 'https://i.pravatar.cc/150?u=12',
    role: 'Senior Product Designer',
    appliedDate: '2026-05-14',
    matchScore: 98,
    status: 'Pending'
  },
  {
    id: 2,
    name: 'Eleanor Pena',
    email: 'eleanor.pena@example.com',
    avatar: 'https://i.pravatar.cc/150?u=24',
    role: 'Senior Product Designer',
    appliedDate: '2026-05-10',
    matchScore: 95,
    status: 'Shortlisted'
  },
  {
    id: 3,
    name: 'Ralph Edwards',
    email: 'ralph.edwards@example.com',
    avatar: 'https://i.pravatar.cc/150?u=36',
    role: 'Frontend Developer',
    appliedDate: '2026-05-12',
    matchScore: 82,
    status: 'Pending'
  },
  {
    id: 4,
    name: 'Theresa Webb',
    email: 'theresa.webb@example.com',
    avatar: 'https://i.pravatar.cc/150?u=48',
    role: 'Product Marketing',
    appliedDate: '2026-05-11',
    matchScore: 75,
    status: 'Interview Scheduled'
  },
  {
    id: 5,
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    avatar: 'https://i.pravatar.cc/150?u=50',
    role: 'UI Ux Designer',
    appliedDate: '2026-05-13',
    matchScore: 45,
    status: 'Rejected'
  }
];

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState(initialCandidates.sort((a, b) => b.matchScore - a.matchScore));
  const [searchQuery, setSearchQuery] = useState('');

  const handleScheduleInterview = (id: number) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, status: 'Interview Scheduled' } : c));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981'; // green
    if (score >= 70) return '#f59e0b'; // yellow/orange
    return '#ef4444'; // red
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Pending': return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={12}/> Pending</span>;
      case 'Shortlisted': return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', background: 'rgba(168, 85, 247, 0.1)', color: 'var(--text-purple)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={12}/> Shortlisted</span>;
      case 'Interview Scheduled': return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Video size={12}/> Scheduled</span>;
      case 'Rejected': return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><XCircle size={12}/> Rejected</span>;
      default: return null;
    }
  };

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1 className="page-title">Candidates Pipeline</h1>
          <p className="page-subtitle">AI-Analyzed resumes sorted by skill match score.</p>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search by candidate name or role..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', 
              borderRadius: '0.5rem', border: '1px solid var(--border)', 
              background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', outline: 'none'
            }} 
          />
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Candidate</th>
                <th style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Applied Role</th>
                <th style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Date Applied</th>
                <th style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>AI Match Score</th>
                <th style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Status</th>
                <th style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map(candidate => (
                <tr key={candidate.id} className="hover-effect" style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={candidate.avatar} alt={candidate.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{candidate.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Mail size={12}/> {candidate.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {candidate.role}
                  </td>
                  <td style={{ padding: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14}/> {candidate.appliedDate}</div>
                  </td>
                  <td style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ fontWeight: 600, color: getScoreColor(candidate.matchScore), width: '35px' }}>{candidate.matchScore}%</div>
                      <div style={{ flex: 1, height: '6px', background: 'var(--bg-secondary)', borderRadius: '1rem', overflow: 'hidden', minWidth: '80px' }}>
                        <div style={{ width: `${candidate.matchScore}%`, height: '100%', background: getScoreColor(candidate.matchScore), borderRadius: '1rem' }}></div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem' }}>
                    {getStatusBadge(candidate.status)}
                  </td>
                  <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="View Resume">
                        <FileText size={16} />
                      </button>
                      {(candidate.status === 'Pending' || candidate.status === 'Shortlisted') && candidate.matchScore >= 70 && (
                        <button 
                          onClick={() => handleScheduleInterview(candidate.id)}
                          style={{ background: 'var(--text-purple)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                          <Video size={14} /> Schedule
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
