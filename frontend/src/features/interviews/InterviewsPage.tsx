import { Search, Download, Check, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const mockData = [
  {
    id: "21918",
    candidate: { name: "Anugrah Prasetya", role: "Frontend Developer", avatarColor: "#3b82f6" },
    datetime: "24 July, 10:00 AM",
    duration: "45 Mins",
    type: "Technical Round",
    status: "pending"
  },
  {
    id: "37189",
    candidate: { name: "Denny Malik", role: "Backend Developer", avatarColor: "#f59e0b" },
    datetime: "22 August, 02:00 PM",
    duration: "60 Mins",
    type: "System Design",
    status: "rejected"
  },
  {
    id: "41621",
    candidate: { name: "Silvia Cintia Bakri", role: "Product Designer", avatarColor: "#10b981" },
    datetime: "01 August, 11:30 AM",
    duration: "30 Mins",
    type: "HR Round",
    status: "approved"
  },
  {
    id: "12781",
    candidate: { name: "Bambang Pramudi", role: "Customer Support", avatarColor: "#8b5cf6" },
    datetime: "20 August, 04:00 PM",
    duration: "45 Mins",
    type: "Culture Fit",
    status: "pending"
  },
  {
    id: "81721",
    candidate: { name: "Joseph Stewart", role: "Mobile Developer", avatarColor: "#ec4899" },
    datetime: "29 August, 01:00 PM",
    duration: "60 Mins",
    type: "Technical Round",
    status: "pending"
  }
];

export default function Interviews() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="animate-fade-in" style={{ padding: '0 0.5rem' }}>
      <h1 className="page-title" style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Interviews Schedule</h1>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '2.5rem', borderBottom: '1px solid var(--border)', padding: '0 2rem' }}>
          <div 
            onClick={() => setActiveTab('upcoming')}
            style={{ 
              padding: '1.25rem 0', color: activeTab === 'upcoming' ? 'var(--text-purple)' : 'var(--text-secondary)', 
              borderBottom: activeTab === 'upcoming' ? '2px solid var(--text-purple)' : '2px solid transparent',
              fontWeight: '500', fontSize: '0.875rem', display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer', marginBottom: '-1px'
            }}
          >
            Upcoming Interviews <span style={{ background: activeTab === 'upcoming' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(255,255,255,0.05)', color: activeTab === 'upcoming' ? 'var(--text-purple)' : 'var(--text-secondary)', padding: '0.125rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem' }}>15</span>
          </div>
          <div 
            onClick={() => setActiveTab('completed')}
            style={{ 
              padding: '1.25rem 0', color: activeTab === 'completed' ? 'var(--text-purple)' : 'var(--text-secondary)', 
              borderBottom: activeTab === 'completed' ? '2px solid var(--text-purple)' : '2px solid transparent',
              fontWeight: '500', fontSize: '0.875rem', cursor: 'pointer', marginBottom: '-1px'
            }}
          >
            Completed
          </div>
          <div 
            onClick={() => setActiveTab('cancelled')}
            style={{ 
              padding: '1.25rem 0', color: activeTab === 'cancelled' ? 'var(--text-purple)' : 'var(--text-secondary)', 
              borderBottom: activeTab === 'cancelled' ? '2px solid var(--text-purple)' : '2px solid transparent',
              fontWeight: '500', fontSize: '0.875rem', display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer', marginBottom: '-1px'
            }}
          >
            Activity log <span style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', padding: '0.125rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem' }}>2</span>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search candidate..." 
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
          }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            Export CSV <Download size={16} />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto', padding: '0 2rem 2rem 2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '600' }}>
                <th style={{ padding: '1rem 0', fontWeight: '600' }}>ID</th>
                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Candidate</th>
                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Date & Time <span style={{fontSize:'0.6rem', color:'var(--text-purple)'}}>↑↓</span></th>
                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Duration <span style={{fontSize:'0.6rem', color:'var(--text-purple)'}}>↑↓</span></th>
                <th style={{ padding: '1rem 0', fontWeight: '600' }}>Interview Type</th>
                <th style={{ padding: '1rem 0', fontWeight: '600', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((row, index) => (
                <tr key={index} style={{ borderBottom: index !== mockData.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.2s' }}>
                  <td style={{ padding: '1rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{row.id}</td>
                  <td style={{ padding: '1rem 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: row.candidate.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '0.875rem' }}>
                        {row.candidate.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.125rem' }}>{row.candidate.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{row.candidate.role}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 0', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-primary)' }}>{row.datetime}</td>
                  <td style={{ padding: '1rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{row.duration}</td>
                  <td style={{ padding: '1rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{row.type}</td>
                  <td style={{ padding: '1rem 0' }}>
                    {row.status === 'pending' && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <div style={{ 
                          border: '1px solid var(--border)', color: 'var(--text-primary)',
                          display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: '500', cursor: 'pointer',
                          transition: 'background 0.2s',
                        }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                          Start <Check size={14} />
                        </div>
                        <div style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '0.375rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                          <X size={14} />
                        </div>
                      </div>
                    )}
                    {row.status === 'rejected' && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', color: '#ef4444', fontSize: '0.875rem', fontWeight: '500' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }}></div> Cancelled
                      </div>
                    )}
                    {row.status === 'approved' && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', color: '#22c55e', fontSize: '0.875rem', fontWeight: '500' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }}></div> Completed
                      </div>
                    )}
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
