import { 
  MoreHorizontal
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="animate-fade-in" style={{ padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--text-purple)', letterSpacing: '-0.02em' }}>Dashboard</h1>
          <p style={{ margin: 0, marginTop: '0.25rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Overview of your recruitment metrics.</p>
        </div>
      </div>

      {/* Top Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        <div className="card" style={{ padding: '1.5rem', position: 'relative' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Candidates</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>352</div>
          <div style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', color: '#10b981', fontSize: '0.875rem', fontWeight: 600 }}>+15%</div>
        </div>

        <div className="card" style={{ padding: '1.5rem', position: 'relative' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Interviews Scheduled</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>22</div>
          <div style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', color: '#ef4444', fontSize: '0.875rem', fontWeight: 600 }}>-10%</div>
        </div>

        <div className="card" style={{ padding: '1.5rem', position: 'relative' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>New Hires</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>32</div>
          <div style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', color: '#10b981', fontSize: '0.875rem', fontWeight: 600 }}>+12%</div>
        </div>

        <div className="card" style={{ padding: '1.5rem', position: 'relative' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Acceptance Rate</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>82%</div>
          <div style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', color: '#ef4444', fontSize: '0.875rem', fontWeight: 600 }}>-11%</div>
        </div>

      </div>

      {/* Main Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Working Format Donut */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem' }}>Working Format</div>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, position: 'relative' }}>
            <div style={{ 
              width: '180px', height: '180px', borderRadius: '50%', 
              background: 'conic-gradient(var(--text-purple) 0deg 250deg, var(--accent) 250deg 320deg, rgba(255,255,255,0.1) 320deg 360deg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ width: '140px', height: '140px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>108</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Employees</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-purple)' }}></div> Remote
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div> On-site
            </div>
          </div>
        </div>

        {/* Project Employment Bar Chart */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            Project employment
            <MoreHorizontal size={18} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} />
          </div>
          
          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 1rem' }}>
            {/* Bars */}
            {[40, 60, 30, 80, 50, 90, 60, 45].map((h, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                <div style={{ width: '100%', maxWidth: '24px', height: '180px', display: 'flex', alignItems: 'flex-end', background: 'rgba(255,255,255,0.05)', borderRadius: '0.25rem', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: `${h}%`, background: i % 2 === 0 ? 'var(--text-purple)' : 'var(--accent)', borderRadius: '0.25rem' }}></div>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][i]}</span>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-purple)' }}></div> Project
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div> Bench
            </div>
          </div>
        </div>

        {/* Total Applications Progress */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem' }}>Total Applications</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div> Applications</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>258</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', overflow: 'hidden' }}>
                <div style={{ width: '70%', height: '100%', background: 'var(--accent)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div> Shortlisted</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>124</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', overflow: 'hidden' }}>
                <div style={{ width: '45%', height: '100%', background: '#10b981' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div> On-hold</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>45</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', overflow: 'hidden' }}>
                <div style={{ width: '20%', height: '100%', background: '#f59e0b' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div> Rejected</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>89</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', overflow: 'hidden' }}>
                <div style={{ width: '30%', height: '100%', background: '#ef4444' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem' }}>
        
        {/* Staff Turnover Bar Chart */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            Staff turnover
            <MoreHorizontal size={18} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} />
          </div>
          
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 1rem' }}>
            {[45, 30, 80, 50, 90, 60, 45].map((h, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '16px', height: '160px', display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{ width: '100%', height: `${h}%`, background: 'var(--text-purple)', borderRadius: '0.25rem' }}></div>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recruitment Progress Table */}
        <div className="card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            Recruitment progress
            <MoreHorizontal size={18} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} />
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th style={{ padding: '0.75rem 0', fontWeight: 500 }}>Full Name</th>
                <th style={{ padding: '0.75rem 0', fontWeight: 500 }}>Department</th>
                <th style={{ padding: '0.75rem 0', fontWeight: 500 }}>Type</th>
                <th style={{ padding: '0.75rem 0', fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Dan Sibley', dept: 'DevOps', type: 'Tech interview', status: 'Pending', color: '#f59e0b' },
                { name: 'Joe Root', dept: 'UX/UI Designer', type: 'Resume review', status: 'In Progress', color: 'var(--accent)' },
                { name: 'Zak Crawley', dept: '.Net developer', type: 'Final interview', status: 'Completed', color: '#10b981' }
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.75rem' }}>{row.name.charAt(0)}</div>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{row.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{row.dept}</td>
                  <td style={{ padding: '1rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: row.color }}></div>
                      {row.type}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 0' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', background: `${row.color}20`, color: row.color, fontWeight: 500 }}>
                      {row.status}
                    </span>
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
