import React, { useState, useEffect } from 'react';
import { Play, Square, Clock, LogIn, LogOut } from 'lucide-react';

interface AttendanceRecord {
  id: number;
  name: string;
  punchIn: Date | null;
  breakStart: Date | null;
  totalBreakTimeMs: number;
  punchOut: Date | null;
  isBreakActive: boolean;
}

export default function Attendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>([
    {
      id: 1,
      name: 'John Doe',
      punchIn: new Date(new Date().setHours(9, 0, 0, 0)),
      breakStart: null,
      totalBreakTimeMs: 45 * 60 * 1000,
      punchOut: new Date(new Date().setHours(17, 0, 0, 0)),
      isBreakActive: false,
    },
    {
      id: 2,
      name: 'Jane Smith',
      punchIn: new Date(new Date().setHours(9, 30, 0, 0)),
      breakStart: null,
      totalBreakTimeMs: 15 * 60 * 1000,
      punchOut: null,
      isBreakActive: false,
    },
    {
      id: 3,
      name: 'Shreyas (You)',
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

  const handlePunchIn = (id: number) => {
    setRecords(records.map(r => r.id === id ? { ...r, punchIn: new Date() } : r));
  };

  const handleToggleBreak = (id: number) => {
    setRecords(records.map(r => {
      if (r.id === id) {
        if (r.isBreakActive) {
          // End break
          const breakDuration = new Date().getTime() - (r.breakStart?.getTime() || new Date().getTime());
          return {
            ...r,
            isBreakActive: false,
            breakStart: null,
            totalBreakTimeMs: r.totalBreakTimeMs + breakDuration
          };
        } else {
          // Start break
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

  const handlePunchOut = (id: number) => {
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
    <div className="animate-fade-in">
      <h1 className="page-title text-purple">Attendance</h1>
      <p className="page-subtitle text-purple">Track employee and candidate attendance.</p>

      <div className="card" style={{ minHeight: '400px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
          <h2 className="text-purple">Daily Attendance Record</h2>
          <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
            <Clock size={18} />
            {now.toLocaleTimeString()}
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Punch In</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Break Time</th>
              <th style={{ padding: '1rem', fontWeight: 600 }}>Punch Out</th>
              <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id} style={{ 
                borderBottom: '1px solid var(--border)', 
                transition: 'background-color 0.2s',
                backgroundColor: record.isBreakActive ? 'rgba(168, 85, 247, 0.05)' : 'transparent'
              }}>
                <td style={{ padding: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {record.name}
                </td>
                <td style={{ padding: '1rem', color: record.punchIn ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {formatTime(record.punchIn)}
                </td>
                <td style={{ 
                  padding: '1rem', 
                  color: record.isBreakActive ? 'var(--text-purple)' : 'var(--text-primary)',
                  fontWeight: record.isBreakActive ? 600 : 'normal'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {getBreakTimeToDisplay(record) > 0 ? formatDuration(getBreakTimeToDisplay(record)) : '--'}
                    {record.isBreakActive && (
                      <span style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        backgroundColor: 'var(--text-purple)',
                        boxShadow: '0 0 8px var(--text-purple)',
                        animation: 'pulse 2s infinite'
                      }} />
                    )}
                  </div>
                </td>
                <td style={{ padding: '1rem', color: record.punchOut ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {formatTime(record.punchOut)}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    {!record.punchIn && !record.punchOut ? (
                      <button 
                        onClick={() => handlePunchIn(record.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', padding: '0.4rem 0.75rem' }}
                      >
                        <LogIn size={14} /> Punch In
                      </button>
                    ) : record.punchIn && !record.punchOut ? (
                      <>
                        <button 
                          onClick={() => handleToggleBreak(record.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', padding: '0.4rem 0.75rem' }}
                        >
                          {record.isBreakActive ? <Square size={14} /> : <Play size={14} />}
                          {record.isBreakActive ? 'End Break' : 'Start Break'}
                        </button>
                        {!record.isBreakActive && (
                          <button 
                            onClick={() => handlePunchOut(record.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', padding: '0.4rem 0.75rem' }}
                          >
                            <LogOut size={14} /> Punch Out
                          </button>
                        )}
                      </>
                    ) : (
                      <span style={{ 
                        color: 'var(--text-secondary)', 
                        fontSize: '0.875rem', 
                        padding: '0.4rem 0.75rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '0.5rem'
                      }}>
                        Completed
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
