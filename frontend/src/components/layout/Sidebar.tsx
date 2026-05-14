import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Video,
  BarChart3,
  UserCircle,
  Briefcase,
  CalendarCheck,
  MessageSquare,
  Sun
} from 'lucide-react';

const Sidebar = () => {

  return (
    <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
        <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', width: '100%' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', background: 'var(--bg-secondary)', border: '2px solid var(--text-purple)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-purple)', fontWeight: 'bold', fontSize: '1rem' }}>
            Z
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem', alignItems: 'center' }}>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title="Dashboard">
            <LayoutDashboard size={20} />
          </NavLink>

          <NavLink to="/follow-up" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title="Follow Up">
            <MessageSquare size={20} />
          </NavLink>

          <div style={{ width: '20px', height: '1px', background: 'var(--border)', margin: '0.5rem 0' }}></div>

          <NavLink to="/jobs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title="Jobs">
            <Briefcase size={20} />
          </NavLink>
          <NavLink to="/candidates" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title="Candidates">
            <Users size={20} />
          </NavLink>
          <NavLink to="/interviews" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title="Interviews">
            <Video size={20} />
          </NavLink>
          <NavLink to="/attendance" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title="Attendance">
            <CalendarCheck size={20} />
          </NavLink>
          <NavLink to="/results" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title="Results Review">
            <BarChart3 size={20} />
          </NavLink>

          <div style={{ width: '20px', height: '1px', background: 'var(--border)', margin: '0.5rem 0' }}></div>

          <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title="Profile">
            <UserCircle size={20} />
          </NavLink>
        </nav>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', borderRadius: '0.5rem', cursor: 'pointer' }} title="Settings">
            <Sun size={18} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
