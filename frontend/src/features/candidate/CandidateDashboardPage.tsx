
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  Video, 
  AlertCircle, 
  Calendar, 
  Download, 
  Eye,
  Briefcase
} from 'lucide-react';

export default function CandidateDashboard() {
  return (
    <div className="animate-fade-in candidate-dashboard">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="page-title">Candidate Dashboard</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>Welcome back! Here is the status of your applications.</p>
        </div>
        <div className="profile-completeness card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem', width: '300px' }}>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Profile Completeness</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--text-primary)' }}>85%</div>
          </div>
          <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '85%', height: '100%', background: 'linear-gradient(to right, #6366f1, #a855f7)', borderRadius: '4px' }}></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Application Status Tracker */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={20} style={{ color: 'var(--accent)' }} /> Frontend Developer Application
            </h2>
            <div className="status-tracker" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '14px', left: '20px', right: '20px', height: '2px', backgroundColor: 'var(--border)', zIndex: 0 }}></div>
              <div style={{ position: 'absolute', top: '14px', left: '20px', width: '75%', height: '2px', backgroundColor: 'var(--accent)', zIndex: 0 }}></div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1 }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <CheckCircle size={16} />
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Applied</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1 }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <CheckCircle size={16} />
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Screening</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1 }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <CheckCircle size={16} />
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Technical Round</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1 }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></div>
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--accent)' }}>Interview</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1 }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Offer</span>
              </div>
            </div>
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} style={{ color: 'var(--accent)' }} /> Your application is currently under review for the interview stage. We will notify you of the final decision shortly.
              </p>
            </div>
          </div>

          {/* Upcoming Interviews & Resume Section in a grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {/* Upcoming Interviews */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Video size={20} style={{ color: 'var(--accent)' }} /> Upcoming Interview
              </h2>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', minWidth: '48px', borderRadius: '0.75rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Technical Round</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Today, 2:00 PM - 3:00 PM</p>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Interviewer: <strong>Sarah Jenkins</strong> (Lead Engineer)
                </p>
              </div>
              <button style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', background: 'linear-gradient(to right, #3b82f6, #6366f1)', color: 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'transform 0.2s' }}>
                <Video size={18} /> Join Video Call
              </button>
            </div>

            {/* Resume Section */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} style={{ color: 'var(--accent)' }} /> Uploaded Resume
              </h2>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', border: '1px dashed var(--border)', borderRadius: '0.75rem', marginBottom: '1.5rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <FileText size={40} style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }} />
                <p style={{ fontWeight: 500 }}>shrey_resume_2026.pdf</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Updated 2 days ago • 1.2 MB</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button style={{ flex: 1, padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border)', backgroundColor: 'transparent', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}>
                  <Eye size={16} />
                </button>
                <button style={{ flex: 1, padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--border)', backgroundColor: 'transparent', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}>
                  <Download size={16} />
                </button>
                <button style={{ flex: 2, padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid var(--accent)', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent)', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Pending Action Items */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={20} style={{ color: '#f59e0b' }} /> Action Items
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '20px', height: '20px', minWidth: '20px', borderRadius: '4px', border: '2px solid var(--border)', marginTop: '2px' }}></div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Complete Technical Round</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Technical interview pending evaluation.</p>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '20px', height: '20px', minWidth: '20px', borderRadius: '4px', border: '2px solid var(--border)', marginTop: '2px' }}></div>
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Interview Round</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Schedule your final interview with HR.</p>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle size={20} style={{ color: '#10b981', marginTop: '2px', minWidth: '20px' }} />
                <div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>Screening Round</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Completed on Oct 24.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Assessment Results */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={20} style={{ color: 'var(--accent)' }} /> Recent Results
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>Frontend Coding Challenge</span>
                  <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.875rem' }}>92/100</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '92%', height: '100%', backgroundColor: '#10b981' }}></div>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Excellent performance in React & TypeScript.</p>
              </div>
              
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>Cognitive Aptitude Test</span>
                  <span style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '0.875rem' }}>85/100</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', backgroundColor: '#3b82f6' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
