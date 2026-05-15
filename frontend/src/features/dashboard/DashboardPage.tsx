import {
  FileX,
  Calendar,
  Clock,
  UserPlus,
  BarChart3,
  MoreHorizontal
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Dashboard() {
  const { theme, isDark } = useTheme();

  return (
    <div className={`animate-fade-in relative min-h-screen w-full ${theme.page} transition-colors duration-300`}>

      {/* Background blurs — same as AuthLayout */}
      <div className={`fixed top-0 left-0 w-72 h-72 ${theme.blur1} blur-[120px] opacity-50 pointer-events-none z-0`} />
      <div className={`fixed bottom-0 right-0 w-72 h-72 ${theme.blur2} blur-[120px] opacity-40 pointer-events-none z-0`} />

      <div className="relative z-10">

      {/* Hero Banner */}
      <div className={`relative overflow-hidden rounded-2xl border mb-8 px-10 py-8 ${
        isDark
          ? 'bg-[#0f0a1e] border-purple-900/30'
          : `${theme.card} border`
      }`}>
        <div className={`absolute top-0 left-0 w-56 h-56 ${theme.blur1} blur-[100px] opacity-40 pointer-events-none`} />
        <div className={`absolute bottom-0 right-0 w-56 h-56 ${theme.blur2} blur-[100px] opacity-30 pointer-events-none`} />
        <div className="relative z-10">
          <h1 className={`text-3xl font-bold tracking-tight ${theme.heading}`}>
            Welcome back!{' '}
            <span className="text-purple-500">HR Dashboard</span>
          </h1>
          <p className={`mt-1 text-sm ${theme.subtext}`}>
            Here's an overview of your recruitment metrics.
          </p>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Candidates', value: '352', change: '+15%', positive: true },
          { label: 'Interviews Scheduled', value: '22', change: '-10%', positive: false },
          { label: 'New Hires', value: '32', change: '+12%', positive: true },
          { label: 'Acceptance Rate', value: '82%', change: '-11%', positive: false },
        ].map((card) => (
          <div key={card.label} className={`backdrop-blur-xl border rounded-2xl p-6 relative transition-colors duration-300 ${theme.card}`}>
            <div className={`text-sm mb-1 ${theme.subtext}`}>{card.label}</div>
            <div className={`metric-card-value text-3xl font-bold ${theme.heading}`}>{card.value}</div>
            <div className={`absolute right-5 top-5 text-sm font-semibold ${card.positive ? 'text-emerald-500' : 'text-red-400'}`}>
              {card.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main Row */}
      <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>

        {/* Total Applications Donut */}
        <div className={`backdrop-blur-xl border rounded-2xl p-6 flex flex-col transition-colors duration-300 ${theme.card}`}>
          <div className={`text-base font-semibold mb-6 ${theme.heading}`}>Total Applications</div>

          <div className="chart-container-responsive" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
            <div className="chart-donut" style={{ position: 'relative', width: '180px', height: '180px', flexShrink: 0 }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: 'conic-gradient(#a855f7 0deg 183deg, #10b981 183deg 271deg, #f59e0b 271deg 303deg, #3b82f6 303deg 360deg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div className={`chart-donut-inner rounded-full flex flex-col items-center justify-center ${isDark ? 'bg-[#0B102F]' : 'bg-white'}`}
                  style={{ width: '130px', height: '130px' }}>
                  <span className={`text-3xl font-extrabold ${theme.heading}`}>507</span>
                  <span className={`text-xs ${theme.subtext}`}>Total</span>
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
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                    <span className={`text-sm ${theme.subtext}`}>{item.label}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <span className={`text-sm font-semibold ${theme.heading}`}>{item.value}</span>
                    <span className={`text-xs ${theme.subtext}`}>({item.percent})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className={`backdrop-blur-xl border rounded-2xl p-6 transition-colors duration-300 ${theme.card}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div className={`text-base font-semibold ${theme.heading}`}>Upcoming Interviews</div>
            <span className={`text-xs font-medium cursor-pointer ${theme.link}`}>View all</span>
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
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${isDark ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    {interview.name.charAt(0)}
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div className={`text-sm font-semibold truncate ${theme.heading}`}>{interview.name}</div>
                    <div className={`text-xs truncate ${theme.subtext}`}>{interview.role}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div className={`text-xs flex items-center gap-1 justify-end ${theme.label}`}>
                    <Calendar size={12} /> {interview.date.split(',')[0]}
                  </div>
                  <div className={`text-xs flex items-center gap-1 justify-end mt-0.5 ${theme.subtext}`}>
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

        {/* Recent Activity */}
        <div className={`backdrop-blur-xl border rounded-2xl p-6 transition-colors duration-300 ${theme.card}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div className={`text-base font-semibold ${theme.heading}`}>Recent Activity</div>
            <span className={`text-xs font-medium cursor-pointer ${theme.link}`}>View all</span>
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
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '0.5rem',
                    background: `${activity.color}20`, color: activity.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    {activity.icon}
                  </div>
                  <span className={`text-sm truncate ${theme.heading}`}>{activity.text}</span>
                </div>
                <span className={`text-xs shrink-0 ${theme.subtext}`}>{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recruitment Progress Table */}
        <div className={`backdrop-blur-xl border rounded-2xl p-6 transition-colors duration-300 ${theme.card}`}>
          <div className={`text-base font-semibold mb-6 flex justify-between items-center ${theme.heading}`}>
            Recruitment progress
            <MoreHorizontal size={18} className={`cursor-pointer ${theme.subtext}`} />
          </div>

          <div className="table-container">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr className={`text-xs border-b ${theme.subtext} ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                  <th style={{ padding: '0.75rem 0', fontWeight: 500 }}>Name</th>
                  <th style={{ padding: '0.75rem 0', paddingLeft: '1.5rem', fontWeight: 500 }}>Department</th>
                  <th style={{ padding: '0.75rem 0', paddingLeft: '1.5rem', fontWeight: 500 }}>Type</th>
                  <th style={{ padding: '0.75rem 0', fontWeight: 500, textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Dan Sibley', dept: 'DevOps', type: 'Tech interview', status: 'Pending', color: '#f59e0b' },
                  { name: 'Joe Root', dept: 'UX/UI Designer', type: 'Resume review', status: 'In Progress', color: isDark ? '#7c3aed' : '#4f46e5' },
                  { name: 'Zak Crawley', dept: '.Net developer', type: 'Final interview', status: 'Completed', color: '#10b981' }
                ].map((row) => (
                  <tr key={row.name} className={`border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <td style={{ padding: '1rem 0' }}>
                      <span className={`text-sm font-medium ${theme.heading}`}>{row.name}</span>
                    </td>
                    <td style={{ padding: '1rem 0', paddingLeft: '1.5rem' }}>
                      <span className={`text-sm ${theme.subtext}`}>{row.dept}</span>
                    </td>
                    <td style={{ padding: '1rem 0', paddingLeft: '1.5rem' }}>
                      <span className={`text-sm ${theme.subtext}`}>{row.type}</span>
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
                          <><span>In</span><span>Progress</span></>
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

      </div> {/* relative z-10 */}
    </div>
  );
}
