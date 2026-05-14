import { Outlet, NavLink } from 'react-router-dom';
import { Briefcase, LayoutDashboard, UserCircle } from 'lucide-react';

const CandidateLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '2rem', height: '2rem', background: 'linear-gradient(to bottom right, #a855f7, #3b82f6)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
            Z
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '1.125rem', letterSpacing: '0.025em' }}>ZENVORA Careers</span>
        </div>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <NavLink to="/candidate" end className={({ isActive }) => isActive ? 'active-nav' : ''} style={({ isActive }) => ({ color: isActive ? 'var(--text-purple)' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' })}>
            <LayoutDashboard size={18} /> My Dashboard
          </NavLink>
          <NavLink to="/candidate/jobs" className={({ isActive }) => isActive ? 'active-nav' : ''} style={({ isActive }) => ({ color: isActive ? 'var(--text-purple)' : 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' })}>
            <Briefcase size={18} /> Find Jobs
          </NavLink>
          <NavLink to="/candidate/profile" style={({ isActive }) => ({ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: isActive ? 'rgba(168, 85, 247, 0.1)' : 'var(--bg-primary)', border: isActive ? '1px solid var(--text-purple)' : '1px solid var(--border)', marginLeft: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? 'var(--text-purple)' : 'var(--text-secondary)' })}>
            <UserCircle size={20} />
          </NavLink>
        </nav>
      </header>
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default CandidateLayout;
