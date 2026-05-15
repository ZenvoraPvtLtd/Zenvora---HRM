import { 
  FileX, 
  Calendar,
  Clock,
  UserPlus,
  BarChart3,
  MoreHorizontal
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="animate-fade-in" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ padding: '0 0.5rem' }}>
          <h1 className="page-title" style={{ margin: 0, fontSize: '2rem', fontWeight: 700, color: 'var(--text-purple)', letterSpacing: '-0.02em' }}>Dashboard</h1>
          <p className="page-subtitle" style={{ margin: 0, marginTop: '0.25rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Overview of your recruitment metrics.</p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        <div className="card" style={{ padding: '1.5rem', position: 'relative' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Candidates</div>
          <div className="metric-card-value" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>352</div>
          <div style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', color: '#10b981', fontSize: '0.875rem', fontWeight: 600 }}>+15%</div>
        </div>

        <div className="card" style={{ padding: '1.5rem', position: 'relative' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Interviews Scheduled</div>
          <div className="metric-card-value" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>22</div>
          <div style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', color: '#ef4444', fontSize: '0.875rem', fontWeight: 600 }}>-10%</div>
        </div>

        <div className="card" style={{ padding: '1.5rem', position: 'relative' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>New Hires</div>
          <div className="metric-card-value" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>32</div>
          <div style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', color: '#10b981', fontSize: '0.875rem', fontWeight: 600 }}>+12%</div>
        </div>

        <div className="card" style={{ padding: '1.5rem', position: 'relative' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Acceptance Rate</div>
          <div className="metric-card-value" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>82%</div>
          <div style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', color: '#ef4444', fontSize: '0.875rem', fontWeight: 600 }}>-11%</div>
        </div>

      </div>

      {/* Main Row */}
      <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Total Applications Card */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Total Applications</div>
          
          <div className="chart-container-responsive" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
            <div className="chart-donut" style={{ position: 'relative', width: '180px', height: '180px', flexShrink: 0 }}>
              <div style={{ 
                width: '100%', height: '100%', borderRadius: '50%', 
                background: 'conic-gradient(#a855f7 0deg 183deg, #10b981 183deg 271deg, #f59e0b 271deg 303deg, #3b82f6 303deg 360deg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div className="chart-donut-inner" style={{ width: '130px', height: '130px', borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>507</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total</span>
                </div>
              </div>
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
              {[
                { label: 'Applications', value: 258, percent: '50.9%', color: '#a855f7' },
                { label: 'Shortlisted', value: 124, percent: '24.5%', color: '#10b981' },
                { label: 'On-hold', value: 45, percent: '8.9%', color: '#f59e0b' },
                { label: 'Rejected', value: 80, percent: '15.7%', color: '#3b82f6' }
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>({item.percent})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Interviews Section */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>Upcoming Interviews</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-purple)', cursor: 'pointer', fontWeight: 500 }}>View all</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { name: 'Arjun Mehta', role: 'Frontend Developer', date: '15 May, 2026', time: '10:00 AM' },
              { name: 'Priya Singh', role: 'HR Executive', date: '15 May, 2026', time: '02:00 PM' },
              { name: 'Rahul Verma', role: 'Backend Developer', date: '17 May, 2026', time: '11:00 AM' },
              { name: 'Sneha Kapoor', role: 'UI/UX Designer', date: '17 May, 2026', time: '03:30 PM' }
            ].map((interview) => (
              <div key={interview.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--chart-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.875rem', flexShrink: 0 }}>
                    {interview.name.charAt(0)}
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{interview.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{interview.role}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end' }}>
                    <Calendar size={12} /> {interview.date.split(',')[0]}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end', marginTop: '0.125rem' }}>
                    <Clock size={12} /> {interview.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem' }}>
        {/* Recent Activity Section */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>Recent Activity</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-purple)', cursor: 'pointer', fontWeight: 500 }}>View all</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: <UserPlus size={16} />, text: 'Aman Sharma was hired', time: '2m', color: '#10b981' },
              { icon: <Calendar size={16} />, text: 'Interview with Priya Singh', time: '10m', color: '#a855f7' },
              { icon: <BarChart3 size={16} />, text: 'Rahul moved to Technical', time: '20m', color: '#f59e0b' },
              { icon: <FileX size={16} />, text: 'Mohit Patel was rejected', time: '30m', color: '#ef4444' }
            ].map((activity, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0 }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '0.5rem', background: `${activity.color}15`, color: activity.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {activity.icon}
                  </div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{activity.text}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', flexShrink: 0 }}>{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recruitment Progress Table */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            Recruitment progress
            <MoreHorizontal size={18} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} />
          </div>

          <div className="table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '0.75rem 0', fontWeight: 500 }}>Name</th>
                  <th style={{ padding: '0.75rem 0', paddingLeft: '1.5rem', fontWeight: 500 }}>Department</th>
                  <th style={{ padding: '0.75rem 0', paddingLeft: '1.5rem', fontWeight: 500 }}>Type</th>
                  <th style={{ padding: '0.75rem 0', fontWeight: 500, textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Dan Sibley', dept: 'DevOps', type: 'Tech interview', status: 'Pending', color: '#f59e0b' },
                  { name: 'Joe Root', dept: 'UX/UI Designer', type: 'Resume review', status: 'In Progress', color: 'var(--accent)' },
                  { name: 'Zak Crawley', dept: '.Net developer', type: 'Final interview', status: 'Completed', color: '#10b981' }
                ].map((row) => (
                  <tr key={row.name} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem 0' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{row.name}</span>
                    </td>
                    <td style={{ padding: '1rem 0', paddingLeft: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{row.dept}</td>
                    <td style={{ padding: '1rem 0', paddingLeft: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {row.type}
                    </td>
                    <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '0.75rem', 
                        fontSize: '0.75rem', 
                        background: `${row.color}20`, 
                        color: row.color, 
                        fontWeight: 600,
                        display: 'inline-flex',
                        flexDirection: row.status === 'In Progress' ? 'column' : 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1.1,
                        minWidth: '80px',
                        textAlign: 'center'
                      }}>
                        {row.status === 'In Progress' ? (
                          <>
                            <span>In</span>
                            <span>Progress</span>
                          </>
                        ) : row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
