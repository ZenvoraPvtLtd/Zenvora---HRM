import { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  RefreshCw,
  UserPlus,
  Users,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import API_BASE_URL from '../../config/apiConfig';

type DashboardCandidate = {
  id: string | number;
  name: string;
  email: string;
  role: string;
  status: string;
  matchScore: number;
  skills: string[];
  uploadedAt?: string;
  appliedDate?: string;
  resumeOriginalName?: string;
};

const normalizeCandidates = (data: any): DashboardCandidate[] => {
  const rows = Array.isArray(data) ? data : data?.candidates || [];

  return rows.map((candidate: any, index: number) => {
    const analysis = candidate.analysis || {};
    const parsedResume = analysis?.ai?.parsedResume || {};
    const personal = parsedResume?.personal_information || {};

    return {
      id: candidate.id || candidate._id || index + 1,
      name: candidate.name || personal.full_name || 'Unknown Candidate',
      email: candidate.email || personal.email || '',
      role: candidate.role || analysis?.application?.role || 'Applied Role',
      status: candidate.status || analysis?.application?.status || 'Pending',
      matchScore: Number(candidate.matchScore || analysis?.application?.matchScore || 0),
      skills:
        candidate.detectedSkills ||
        analysis?.candidate?.skills?.technical_skills ||
        analysis?.candidate?.skills ||
        [],
      uploadedAt: candidate.uploadedAt || candidate.appliedDate,
      appliedDate: candidate.appliedDate,
      resumeOriginalName:
        candidate.resumeOriginalName ||
        analysis?.resume?.originalName ||
        'Parsed resume',
    };
  });
};

const statusColor = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized.includes('short')) return '#10b981';
  if (normalized.includes('reject')) return '#ef4444';
  if (normalized.includes('interview')) return '#3b82f6';
  return '#f59e0b';
};

export default function Dashboard() {
  const { theme, isDark } = useTheme();
  const [candidates, setCandidates] = useState<DashboardCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = async (showLoader = false) => {
    if (showLoader) setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/candidate/applications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
      });

      if (!response.ok) {
        throw new Error('Candidate history is not available right now');
      }

      const data = await response.json();
      setCandidates(normalizeCandidates(data));
      setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    } catch (err: any) {
      setError(err.message || 'Unable to load candidate history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates(true);
    const intervalId = window.setInterval(() => fetchCandidates(false), 15000);
    return () => window.clearInterval(intervalId);
  }, []);

  const sortedCandidates = useMemo(() => {
    return [...candidates].sort((a, b) => {
      const aTime = new Date(a.uploadedAt || a.appliedDate || 0).getTime();
      const bTime = new Date(b.uploadedAt || b.appliedDate || 0).getTime();
      return bTime - aTime;
    });
  }, [candidates]);

  const stats = useMemo(() => {
    const total = candidates.length;
    const shortlisted = candidates.filter((candidate) =>
      candidate.status.toLowerCase().includes('short'),
    ).length;
    const rejected = candidates.filter((candidate) =>
      candidate.status.toLowerCase().includes('reject'),
    ).length;
    const pending = candidates.filter((candidate) =>
      candidate.status.toLowerCase().includes('pending'),
    ).length;
    const averageMatch =
      total === 0
        ? 0
        : Math.round(candidates.reduce((sum, candidate) => sum + candidate.matchScore, 0) / total);

    return { total, shortlisted, rejected, pending, averageMatch };
  }, [candidates]);

  const chartRows = [
    { label: 'Applications', value: stats.total, color: '#a855f7' },
    { label: 'Shortlisted', value: stats.shortlisted, color: '#10b981' },
    { label: 'Pending', value: stats.pending, color: '#f59e0b' },
    { label: 'Rejected', value: stats.rejected, color: '#ef4444' },
  ];

  const chartTotal = Math.max(stats.total, 1);
  const shortlistedDegrees = Math.round((stats.shortlisted / chartTotal) * 360);
  const pendingDegrees = Math.round((stats.pending / chartTotal) * 360);
  const rejectedDegrees = Math.round((stats.rejected / chartTotal) * 360);
  const donutBackground = `conic-gradient(
    #10b981 0deg ${shortlistedDegrees}deg,
    #f59e0b ${shortlistedDegrees}deg ${shortlistedDegrees + pendingDegrees}deg,
    #ef4444 ${shortlistedDegrees + pendingDegrees}deg ${shortlistedDegrees + pendingDegrees + rejectedDegrees}deg,
    #a855f7 ${shortlistedDegrees + pendingDegrees + rejectedDegrees}deg 360deg
  )`;

  return (
    <div className={`animate-fade-in relative min-h-screen w-full ${theme.page} transition-colors duration-300`}>
      <div className={`fixed top-0 left-0 w-72 h-72 ${theme.blur1} blur-[120px] opacity-50 pointer-events-none z-0`} />
      <div className={`fixed bottom-0 right-0 w-72 h-72 ${theme.blur2} blur-[120px] opacity-40 pointer-events-none z-0`} />

      <div className="relative z-10">
        <div className={`relative overflow-hidden rounded-2xl border mb-8 px-10 py-8 ${
          isDark ? 'bg-[#0f0a1e] border-purple-900/30' : `${theme.card} border`
        }`}>
          <div className={`absolute top-0 left-0 w-56 h-56 ${theme.blur1} blur-[100px] opacity-40 pointer-events-none`} />
          <div className={`absolute bottom-0 right-0 w-56 h-56 ${theme.blur2} blur-[100px] opacity-30 pointer-events-none`} />
          <div className="relative z-10" style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <h1 className={`text-3xl font-bold tracking-tight ${theme.heading}`}>
                Welcome back! <span className="text-purple-500">HR Dashboard</span>
              </h1>
              <p className={`mt-1 text-sm ${theme.subtext}`}>
                Live candidate history, resume parsing, and recruitment metrics.
              </p>
            </div>
            <button
              onClick={() => fetchCandidates(true)}
              style={{
                alignSelf: 'flex-start',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--text-primary)',
                padding: '0.65rem 0.9rem',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              <RefreshCw size={16} /> Refresh
            </button>
          </div>
        </div>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Candidates', value: stats.total, icon: Users, color: '#a855f7' },
            { label: 'Shortlisted', value: stats.shortlisted, icon: CheckCircle, color: '#10b981' },
            { label: 'Pending Review', value: stats.pending, icon: Clock, color: '#f59e0b' },
            { label: 'Avg Match Score', value: `${stats.averageMatch}%`, icon: BarChart3, color: '#3b82f6' },
          ].map((card) => (
            <div key={card.label} className={`backdrop-blur-xl border rounded-2xl p-6 relative transition-colors duration-300 ${theme.card}`}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div className={`text-sm ${theme.subtext}`}>{card.label}</div>
                <card.icon size={20} style={{ color: card.color }} />
              </div>
              <div className={`metric-card-value text-3xl font-bold ${theme.heading}`}>{loading ? '...' : card.value}</div>
              <div className={`mt-2 text-xs ${theme.subtext}`}>
                {lastUpdated ? `Updated ${lastUpdated}` : 'Waiting for candidate data'}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="card" style={{ marginBottom: '1.5rem', color: '#ef4444' }}>
            {error}
          </div>
        )}

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className={`backdrop-blur-xl border rounded-2xl p-6 flex flex-col transition-colors duration-300 ${theme.card}`}>
            <div className={`text-base font-semibold mb-6 ${theme.heading}`}>Candidate Pipeline</div>
            <div className="chart-container-responsive" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
              <div className="chart-donut" style={{ position: 'relative', width: '180px', height: '180px', flexShrink: 0 }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: donutBackground, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className={`chart-donut-inner rounded-full flex flex-col items-center justify-center ${isDark ? 'bg-[#0B102F]' : 'bg-white'}`} style={{ width: '130px', height: '130px' }}>
                    <span className={`text-3xl font-extrabold ${theme.heading}`}>{stats.total}</span>
                    <span className={`text-xs ${theme.subtext}`}>Total</span>
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                {chartRows.map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                      <span className={`text-sm ${theme.subtext}`}>{item.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <span className={`text-sm font-semibold ${theme.heading}`}>{item.value}</span>
                      <span className={`text-xs ${theme.subtext}`}>({stats.total ? Math.round((item.value / stats.total) * 100) : 0}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`backdrop-blur-xl border rounded-2xl p-6 transition-colors duration-300 ${theme.card}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className={`text-base font-semibold ${theme.heading}`}>Recent Candidate Activity</div>
              <span className={`text-xs font-medium ${theme.subtext}`}>Auto refresh: 15s</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {sortedCandidates.slice(0, 4).map((candidate) => (
                <div key={candidate.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${isDark ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-700'}`}>
                      {candidate.name.charAt(0)}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div className={`text-sm font-semibold truncate ${theme.heading}`}>{candidate.name}</div>
                      <div className={`text-xs truncate ${theme.subtext}`}>{candidate.role} - {candidate.matchScore}% match</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: statusColor(candidate.status), whiteSpace: 'nowrap' }}>
                    {candidate.status}
                  </span>
                </div>
              ))}
              {!loading && sortedCandidates.length === 0 && (
                <div className={theme.subtext} style={{ fontSize: '0.875rem' }}>No candidate history yet.</div>
              )}
            </div>
          </div>
        </div>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem' }}>
          <div className={`backdrop-blur-xl border rounded-2xl p-6 transition-colors duration-300 ${theme.card}`}>
            <div className={`text-base font-semibold mb-6 ${theme.heading}`}>Latest Resume Events</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {sortedCandidates.slice(0, 4).map((candidate) => (
                <div key={`event-${candidate.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0 }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '0.5rem', background: `${statusColor(candidate.status)}20`, color: statusColor(candidate.status), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <UserPlus size={16} />
                    </div>
                    <span className={`text-sm truncate ${theme.heading}`}>{candidate.name} uploaded {candidate.resumeOriginalName}</span>
                  </div>
                  <span className={`text-xs shrink-0 ${theme.subtext}`}>{candidate.uploadedAt ? new Date(candidate.uploadedAt).toLocaleDateString('en-IN') : 'New'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`backdrop-blur-xl border rounded-2xl p-6 transition-colors duration-300 ${theme.card}`}>
            <div className={`text-base font-semibold mb-6 flex justify-between items-center ${theme.heading}`}>
              Candidate History
              <Briefcase size={18} className={theme.subtext} />
            </div>
            <div className="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr className={`text-xs border-b ${theme.subtext} ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <th style={{ padding: '0.75rem 0', fontWeight: 500 }}>Name</th>
                    <th style={{ padding: '0.75rem 0', paddingLeft: '1.5rem', fontWeight: 500 }}>Skills</th>
                    <th style={{ padding: '0.75rem 0', paddingLeft: '1.5rem', fontWeight: 500 }}>Match</th>
                    <th style={{ padding: '0.75rem 0', fontWeight: 500, textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCandidates.slice(0, 6).map((candidate) => (
                    <tr key={`row-${candidate.id}`} className={`border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                      <td style={{ padding: '1rem 0' }}>
                        <div className={`text-sm font-medium ${theme.heading}`}>{candidate.name}</div>
                        <div className={`text-xs ${theme.subtext}`}>{candidate.email || candidate.role}</div>
                      </td>
                      <td style={{ padding: '1rem 0', paddingLeft: '1.5rem' }}>
                        <span className={`text-sm ${theme.subtext}`}>{candidate.skills.slice(0, 3).join(', ') || 'No skills parsed'}</span>
                      </td>
                      <td style={{ padding: '1rem 0', paddingLeft: '1.5rem' }}>
                        <span className={`text-sm font-semibold ${theme.heading}`}>{candidate.matchScore}%</span>
                      </td>
                      <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '0.75rem', fontSize: '0.75rem', background: `${statusColor(candidate.status)}20`, color: statusColor(candidate.status), fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '80px' }}>
                          {candidate.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!loading && sortedCandidates.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ padding: '1.5rem 0', textAlign: 'center' }} className={theme.subtext}>
                        <FileText size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                        No candidate uploads found yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
