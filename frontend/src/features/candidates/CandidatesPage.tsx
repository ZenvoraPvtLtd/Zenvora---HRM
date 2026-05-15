import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownUp,
  Briefcase,
  Download,
  Filter,
  Mail,
  Phone,
  Search,
  Users,
} from 'lucide-react';

type Candidate = {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: number;
  status: string;
  uploadedAt?: string;
  resumeOriginalName?: string;
};

type SortKey = 'name' | 'experience' | 'status' | 'uploadedAt';
type SortDirection = 'asc' | 'desc';

const statusColors: Record<string, { bg: string; color: string }> = {
  Applied: { bg: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' },
  Shortlisted: { bg: 'rgba(16, 185, 129, 0.12)', color: '#10b981' },
  'Interview Scheduled': { bg: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6' },
  Rejected: { bg: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' },
  Offering: { bg: 'rgba(168, 85, 247, 0.12)', color: 'var(--text-purple)' },
};

const getCandidatesEndpoint = () => {
  const candidatesApiUrl = import.meta.env.VITE_CANDIDATES_API_URL;
  const pythonApiUrl = import.meta.env.VITE_PYTHON_API_URL;

  if (candidatesApiUrl) {
    return candidatesApiUrl;
  }

  if (pythonApiUrl) {
    return `${pythonApiUrl}/api/candidates`;
  }

  return 'http://localhost:8000/api/candidates';
};

const normalizeCandidates = (data: any): Candidate[] => {
  const rows = Array.isArray(data) ? data : data?.candidates || [];

  return rows.map((candidate: any, index: number) => ({
    id: candidate.id || candidate._id || index + 1,
    name: candidate.name || 'Unknown Candidate',
    email: candidate.email || '',
    phone: candidate.phone || '',
    skills: Array.isArray(candidate.skills) ? candidate.skills : [],
    experience: Number(candidate.experience || 0),
    status: candidate.status || 'Applied',
    uploadedAt: candidate.uploadedAt,
    resumeOriginalName: candidate.resumeOriginalName,
  }));
};

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('uploadedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpoint = getCandidatesEndpoint();
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error('Unable to load candidate data');
        }

        const data = await response.json();
        setCandidates(normalizeCandidates(data));
      } catch (err: any) {
        setError(err.message || 'Unable to load candidate data');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const statuses = useMemo(() => {
    return ['All', ...Array.from(new Set(candidates.map((candidate) => candidate.status)))];
  }, [candidates]);

  const visibleCandidates = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return candidates
      .filter((candidate) => {
        const matchesSearch =
          candidate.name.toLowerCase().includes(query) ||
          candidate.email.toLowerCase().includes(query) ||
          candidate.phone.toLowerCase().includes(query) ||
          candidate.skills.some((skill) => skill.toLowerCase().includes(query));

        const matchesStatus = statusFilter === 'All' || candidate.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const aValue = a[sortKey] || '';
        const bValue = b[sortKey] || '';
        const direction = sortDirection === 'asc' ? 1 : -1;

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return (aValue - bValue) * direction;
        }

        return String(aValue).localeCompare(String(bValue)) * direction;
      });
  }, [candidates, searchQuery, sortDirection, sortKey, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: candidates.length,
      shortlisted: candidates.filter((candidate) => candidate.status === 'Shortlisted').length,
      interviews: candidates.filter((candidate) => candidate.status === 'Interview Scheduled').length,
      averageExperience:
        candidates.length === 0
          ? 0
          : Math.round(
              candidates.reduce((total, candidate) => total + candidate.experience, 0) /
                candidates.length,
            ),
    };
  }, [candidates]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortDirection('asc');
  };

  const exportCsv = () => {
    const header = ['Name', 'Email', 'Phone', 'Skills', 'Experience', 'Status'];
    const rows = visibleCandidates.map((candidate) => [
      candidate.name,
      candidate.email,
      candidate.phone,
      candidate.skills.join(', '),
      String(candidate.experience),
      candidate.status,
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Parsed_Candidates_List.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderStatusBadge = (status: string) => {
    const colors = statusColors[status] || statusColors.Applied;

    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.35rem 0.75rem',
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontWeight: 700,
          background: colors.bg,
          color: colors.color,
          whiteSpace: 'nowrap',
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '1.5rem',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h1 className="page-title">All Status</h1>
          <p className="page-subtitle">Parsed resume profiles from the candidate pipeline.</p>
        </div>
        <button
          onClick={exportCsv}
          disabled={visibleCandidates.length === 0}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: 'none',
            borderRadius: '0.5rem',
            background: '#16a34a',
            color: 'white',
            padding: '0.75rem 1rem',
            fontWeight: 700,
            cursor: visibleCandidates.length === 0 ? 'not-allowed' : 'pointer',
            opacity: visibleCandidates.length === 0 ? 0.6 : 1,
          }}
        >
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        {[
          { label: 'Total leads', value: stats.total, icon: Users },
          { label: 'Shortlisted', value: stats.shortlisted, icon: Briefcase },
          { label: 'Interviews', value: stats.interviews, icon: Users },
          { label: 'Avg experience', value: `${stats.averageExperience} yrs`, icon: Briefcase },
        ].map((item) => (
          <div key={item.label} className="card" style={{ padding: '1rem', display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '0.75rem',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-purple)',
                background: 'rgba(168, 85, 247, 0.1)',
              }}
            >
              <item.icon size={20} />
            </div>
            <div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', marginBottom: '0.25rem' }}>{item.label}</div>
              <div style={{ color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: 800 }}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '1rem', marginBottom: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 280px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by name, email, phone, or skill"
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--border)',
              background: 'rgba(255,255,255,0.02)',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} style={{ color: 'var(--text-secondary)' }} />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            style={{
              padding: '0.72rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--border)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '980px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)' }}>
                {[
                  { key: 'name', label: 'Candidate' },
                  { key: 'experience', label: 'Experience' },
                  { key: 'status', label: 'Status' },
                  { key: 'uploadedAt', label: 'Upload Date' },
                ].map((column) => (
                  <th key={column.key} style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.8125rem' }}>
                    <button
                      onClick={() => handleSort(column.key as SortKey)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        background: 'transparent',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer',
                        fontWeight: 'inherit',
                      }}
                    >
                      {column.label}
                      <ArrowDownUp size={13} />
                    </button>
                  </th>
                ))}
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.8125rem' }}>Contact</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.8125rem' }}>Extracted Skills</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    Loading candidate profiles...
                  </td>
                </tr>
              )}

              {!loading && error && (
                <tr>
                  <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && visibleCandidates.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No candidates found.
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                visibleCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover-effect" style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{candidate.name}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{candidate.resumeOriginalName || 'Parsed resume'}</div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                      {candidate.experience} yrs
                    </td>
                    <td style={{ padding: '1rem' }}>{renderStatusBadge(candidate.status)}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      {candidate.uploadedAt ? new Date(candidate.uploadedAt).toLocaleDateString() : '-'}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                        <Mail size={13} /> {candidate.email || '-'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Phone size={13} /> {candidate.phone || '-'}
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {candidate.skills.length > 0 ? (
                          candidate.skills.map((skill) => (
                            <span
                              key={`${candidate.id}-${skill}`}
                              style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.4rem',
                                background: 'rgba(59, 130, 246, 0.1)',
                                color: '#60a5fa',
                                border: '1px solid rgba(96, 165, 250, 0.18)',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                              }}
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>No skills parsed</span>
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
