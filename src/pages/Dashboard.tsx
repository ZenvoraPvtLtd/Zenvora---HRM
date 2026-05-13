
import { 
  Users, 
  FileText, 
  FileX, 
  Video, 
  CheckCircle,
  Calendar,
  Clock,
  UserPlus,
  BarChart3
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h1 className="page-title text-purple">Dashboard</h1>
        <p className="page-subtitle text-purple">Overview of your recruitment metrics.</p>
      </div>

      {/* 1. 📊 System Overview (Top Cards) */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 className="text-purple" style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart3 size={20} style={{ color: 'var(--accent)' }} /> System Overview
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          
          <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '0.5rem', backgroundColor: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                <Users size={20} />
              </div>
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>2,543</h3>
            <p className="text-purple" style={{ fontSize: '0.875rem' }}>Total Candidates</p>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                <FileText size={20} />
              </div>
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>1,832</h3>
            <p className="text-purple" style={{ fontSize: '0.875rem' }}>Applied</p>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '0.5rem', backgroundColor: 'rgba(244, 63, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f43f5e' }}>
                <FileX size={20} />
              </div>
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>711</h3>
            <p className="text-purple" style={{ fontSize: '0.875rem' }}>Not Applied</p>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '0.5rem', backgroundColor: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
                <Video size={20} />
              </div>
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>45</h3>
            <p className="text-purple" style={{ fontSize: '0.875rem' }}>Interviews</p>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                <CheckCircle size={20} />
              </div>
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>12</h3>
            <p className="text-purple" style={{ fontSize: '0.875rem' }}>Selected</p>
          </div>

        </div>
      </div>

      {/* 4. 📅 Today's Activity */}
      <div>
        <h2 className="text-purple" style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={20} style={{ color: 'var(--accent)' }} /> Today's Activity
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
          
          {/* Today's Interviews */}
          <div className="card">
            <h3 className="text-purple" style={{ fontSize: '1.125rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Video size={18} style={{ color: '#a855f7' }} /> Today's Interviews
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: 'Rahul Sharma', role: 'Frontend Developer', time: '10:00 AM', type: 'Technical Round' },
                { name: 'Priya Singh', role: 'UX Designer', time: '11:30 AM', type: 'Portfolio Review' },
                { name: 'Amit Kumar', role: 'Backend Developer', time: '2:00 PM', type: 'HR Round' },
              ].map((interview, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: i !== 2 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                      {interview.name.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600 }}>{interview.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{interview.role} • {interview.type}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <Clock size={14} /> {interview.time}
                  </div>
                </div>
              ))}
            </div>
            <button style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem', transition: 'background-color 0.2s' }}>
              View Schedule
            </button>
          </div>

          {/* New applications */}
          <div className="card">
            <h3 className="text-purple" style={{ fontSize: '1.125rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserPlus size={18} style={{ color: '#3b82f6' }} /> New Applications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: 'Sneha Patel', role: 'Product Manager', time: '10 mins ago', exp: '5 Yrs' },
                { name: 'Vikram Singh', role: 'DevOps Engineer', time: '1 hour ago', exp: '3 Yrs' },
                { name: 'Anjali Desai', role: 'Frontend Developer', time: '2 hours ago', exp: '2 Yrs' },
              ].map((app, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: i !== 2 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 600 }}>{app.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{app.role}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{app.time}</span>
                    <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '1rem' }}>{app.exp}</span>
                  </div>
                </div>
              ))}
            </div>
            <button style={{ width: '100%', marginTop: '1.5rem', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.875rem', transition: 'background-color 0.2s' }}>
              View All Applications
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
