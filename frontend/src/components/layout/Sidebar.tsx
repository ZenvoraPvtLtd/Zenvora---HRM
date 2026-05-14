import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Video,
  BarChart3,
  UserCircle,
  Briefcase,
  CalendarCheck,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
        <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
          <div style={{ width: '2rem', height: '2rem', background: 'linear-gradient(to bottom right, #a855f7, #3b82f6)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>
            Z
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '1.125rem', letterSpacing: '0.025em' }}>ZENVORA</span>
        </div>

        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.75rem', paddingLeft: '0.5rem', letterSpacing: '0.05em' }}>MAIN</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '2rem' }}>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          
          <NavLink to="/follow-up" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <MessageSquare size={20} /> Follow Up
          </NavLink>
          
          <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', marginTop: '1rem', marginBottom: '0.5rem', paddingLeft: '0.5rem', letterSpacing: '0.05em' }}>EMPLOYEE</div>
          <NavLink to="/jobs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Briefcase size={20} /> Jobs
          </NavLink>
          <NavLink to="/candidates" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Users size={20} /> Candidates
          </NavLink>
          <NavLink to="/interviews" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Video size={20} /> Interviews
          </NavLink>
          <NavLink to="/attendance" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <CalendarCheck size={20} /> Attendance
          </NavLink>
          <NavLink to="/results" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <BarChart3 size={20} /> Results Review
          </NavLink>
        </nav>

        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.75rem', paddingLeft: '0.5rem', letterSpacing: '0.05em' }}>USER</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <UserCircle size={20} /> Profile
          </NavLink>
        </nav>
      </div>

      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: '2rem', padding: '0.25rem', border: '1px solid var(--border)' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--text-primary)', color: 'var(--bg-primary)', borderRadius: '2rem', padding: '0.5rem', fontSize: '0.875rem', cursor: 'pointer', fontWeight: '500' }}>
            <Sun size={16} /> Light
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'transparent', color: 'var(--text-secondary)', borderRadius: '2rem', padding: '0.5rem', fontSize: '0.875rem', cursor: 'pointer', fontWeight: '500' }}>
            <Moon size={16} /> Dark
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
