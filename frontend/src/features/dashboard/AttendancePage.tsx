import { useState, useEffect } from 'react';
import { Play, Square, Clock, LogIn, LogOut, Search, Download } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  punchIn: Date | null;
  breakStart: Date | null;
  totalBreakTimeMs: number;
  punchOut: Date | null;
  isBreakActive: boolean;
}

export default function Attendance() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [records, setRecords] = useState<AttendanceRecord[]>([
    {
      id: "21918",
      name: 'Anugrah Prasetya',
      role: 'Frontend Developer',
      avatarColor: '#3b82f6',
      punchIn: new Date(new Date().setHours(9, 0, 0, 0)),
      breakStart: null,
      totalBreakTimeMs: 45 * 60 * 1000,
      punchOut: new Date(new Date().setHours(17, 0, 0, 0)),
      isBreakActive: false,
    },
    {
      id: "37189",
      name: 'Denny Malik',
      role: 'Backend Developer',
      avatarColor: '#f59e0b',
      punchIn: new Date(new Date().setHours(9, 30, 0, 0)),
      breakStart: null,
      totalBreakTimeMs: 15 * 60 * 1000,
      punchOut: null,
      isBreakActive: false,
    },
    {
      id: "41621",
      name: 'Shreyas (You)',
      role: 'Admin',
      avatarColor: '#10b981',
      punchIn: null,
      breakStart: null,
      totalBreakTimeMs: 0,
      punchOut: null,
      isBreakActive: false,
    }
  ]);

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date | null) => {
    if (!date) return '--:--';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  };

  const handlePunchIn = (id: string) => {
    setRecords(records.map(r => r.id === id ? { ...r, punchIn: new Date() } : r));
  };

  const handleToggleBreak = (id: string) => {
    setRecords(records.map(r => {
      if (r.id === id) {
        if (r.isBreakActive) {
          const breakDuration = new Date().getTime() - (r.breakStart?.getTime() || new Date().getTime());
          return {
            ...r,
            isBreakActive: false,
            breakStart: null,
            totalBreakTimeMs: r.totalBreakTimeMs + breakDuration
          };
        } else {
          return {
            ...r,
            isBreakActive: true,
            breakStart: new Date()
          };
        }
      }
      return r;
    }));
  };

  const handlePunchOut = (id: string) => {
    setRecords(records.map(r => {
      if (r.id === id) {
        let finalBreakTime = r.totalBreakTimeMs;
        if (r.isBreakActive) {
          finalBreakTime += new Date().getTime() - (r.breakStart?.getTime() || new Date().getTime());
        }
        return {
          ...r,
          punchOut: new Date(),
          isBreakActive: false,
          breakStart: null,
          totalBreakTimeMs: finalBreakTime
        };
      }
      return r;
    }));
  };

  const getBreakTimeToDisplay = (record: AttendanceRecord) => {
    let ms = record.totalBreakTimeMs;
    if (record.isBreakActive && record.breakStart) {
      ms += now.getTime() - record.breakStart.getTime();
    }
    return ms;
  };

  return (
    <div className="animate-fade-in" style={{ padding: '0 0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="page-title" style={{ fontSize: '1.75rem', margin: 0 }}>Employee Schedule & Attendance</h1>
        <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
          <Clock size={18} />
          {now.toLocaleTimeString()}
        </div>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '2.5rem', borderBottom: '1px solid var(--border)', padding: '0 2rem' }}>
          <div
            onClick={() => setActiveTab('permission')}
            style={{
              padding: '1.25rem 0', color: activeTab === 'permission' ? 'var(--text-purple)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'permission' ? '2px solid var(--text-purple)' : '2px solid transparent',
              fontWeight: '500', fontSize: '0.875rem', display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer', marginBottom: '-1px'
            }}
          >
            Permission Request <span style={{ background: activeTab === 'permission' ? 'var(--icon-accent-bg)' : 'var(--bg-hover)', color: activeTab === 'permission' ? 'var(--text-purple)' : 'var(--text-secondary)', padding: '0.125rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem' }}>11</span>
          </div>
          <div
            onClick={() => setActiveTab('schedule')}
            style={{
              padding: '1.25rem 0', color: activeTab === 'schedule' ? 'var(--text-purple)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'schedule' ? '2px solid var(--text-purple)' : '2px solid transparent',
              fontWeight: '500', fontSize: '0.875rem', cursor: 'pointer', marginBottom: '-1px'
            }}
          >
            Work schedule
          </div>
          <div
            onClick={() => setActiveTab('activity')}
            style={{
              padding: '1.25rem 0', color: activeTab === 'activity' ? 'var(--text-purple)' : 'var(--text-secondary)',
              borderBottom: activeTab === 'activity' ? '2px solid var(--text-purple)' : '2px solid transparent',
              fontWeight: '500', fontSize: '0.875rem', display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer', marginBottom: '-1px'
            }}
          >
            Activity log <span style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)', padding: '0.125rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem' }}>2</span>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search employee..."
              style={{
                width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
                borderRadius: '0.5rem', border: '1px solid var(--border)',
                background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)',
                outline: 'none', fontSize: '0.875rem'
              }}
            />
          </div>

          <div style={{
            border: '1px solid var(--border)', color: 'var(--text-primary)',
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', transition: 'background 0.2s',
          }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            Export CSV <Download size={16} />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto', padding: '0 2rem 2rem 2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '600' }}>
                <th style={{ padding: '1rem 0', fontWeight: '600' }}><input type="checkbox" style={{ marginRight: '0.5rem' }} /> Employee Name</th>
                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Clock - In & Out <span style={{ fontSize: '0.6rem', color: 'var(--text-purple)' }}>↑↓</span></th>
                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Break Time <span style={{ fontSize: '0.6rem', color: 'var(--text-purple)' }}>↑↓</span></th>
                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Clock Location <span style={{ fontSize: '0.6rem', color: 'var(--text-purple)' }}>↑↓</span></th>
                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Paid Time <span style={{ fontSize: '0.6rem', color: 'var(--text-purple)' }}>↑↓</span></th>
                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Overtime <span style={{ fontSize: '0.6rem', color: 'var(--text-purple)' }}>↑↓</span></th>
                <th style={{ padding: '1rem 0', fontWeight: '600', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record.id} style={{
                  borderBottom: index !== records.length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'background-color 0.2s',
                  backgroundColor: record.isBreakActive ? 'var(--icon-accent-bg)' : 'transparent'
                }}>
                  <td style={{ padding: '1rem 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <input type="checkbox" />
                      <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: record.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '0.875rem' }}>
                        {record.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.125rem' }}>{record.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{record.role}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 0', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    {record.punchIn ? formatTime(record.punchIn) : '--:--'} to {record.punchOut ? formatTime(record.punchOut) : '--:--'}
                  </td>
                  <td style={{
                    padding: '1rem 0', fontSize: '0.875rem',
                    color: record.isBreakActive ? 'var(--text-purple)' : 'var(--text-primary)',
                    fontWeight: record.isBreakActive ? 600 : 'normal'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getBreakTimeToDisplay(record) > 0 ? formatDuration(getBreakTimeToDisplay(record)) : '--'}
                      {record.isBreakActive && (
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-purple)', boxShadow: '0 0 8px var(--text-purple)', animation: 'pulse 2s infinite' }} />
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 0', fontSize: '0.875rem', color: '#3b82f6', cursor: 'pointer' }}>
                    Mirpur, Dhaka
                  </td>
                  <td style={{ padding: '1rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    8hr
                  </td>
                  <td style={{ padding: '1rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {index === 0 ? '30 min' : index === 1 ? '2 hr' : '0 min'}
                  </td>
                  <td style={{ padding: '1rem 0' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      {!record.punchIn && !record.punchOut ? (
                        <div
                          onClick={() => handlePunchIn(record.id)}
                          style={{ border: '1px solid var(--border)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', padding: '0.375rem 0.75rem', borderRadius: '2rem', cursor: 'pointer' }}
                        >
                          <LogIn size={14} /> Punch In
                        </div>
                      ) : record.punchIn && !record.punchOut ? (
                        <>
                          <div
                            onClick={() => handleToggleBreak(record.id)}
                            style={{ border: '1px solid var(--border)', color: record.isBreakActive ? 'var(--text-purple)' : 'var(--text-primary)', borderColor: record.isBreakActive ? 'var(--text-purple)' : 'var(--border)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', padding: '0.375rem 0.75rem', borderRadius: '2rem', cursor: 'pointer' }}
                          >
                            {record.isBreakActive ? <Square size={14} /> : <Play size={14} />}
                            {record.isBreakActive ? 'End Break' : 'Break'}
                          </div>
                          {!record.isBreakActive && (
                            <div
                              onClick={() => handlePunchOut(record.id)}
                              style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', padding: '0.375rem 0.75rem', borderRadius: '2rem', cursor: 'pointer' }}
                            >
                              <LogOut size={14} /> Punch Out
                            </div>
                          )}
                        </>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.375rem', color: '#22c55e', fontSize: '0.875rem', fontWeight: '500' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }}></div> Completed
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
