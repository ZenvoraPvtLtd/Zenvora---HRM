import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Briefcase, LayoutDashboard, UserCircle, LogOut, LogIn, Sun, Moon } from 'lucide-react';

const CandidateSidebar = () => {
  return (
    <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
        <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', width: '100%' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', background: 'var(--bg-secondary)', border: '2px solid var(--text-purple)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-purple)', fontWeight: 'bold', fontSize: '1rem' }}>
            Z
          </div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem', alignItems: 'center' }}>
          <NavLink to="/candidate" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title="My Dashboard">
            <LayoutDashboard size={20} />
          </NavLink>
          <NavLink to="/candidate/jobs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title="Find Jobs">
            <Briefcase size={20} />
          </NavLink>

          <div style={{ width: '20px', height: '1px', background: 'var(--border)', margin: '0.5rem 0' }}></div>

          <NavLink to="/candidate/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title="Profile">
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

const CandidateLayout = () => {
  const currentRole = 'Candidate';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="app-container">
      <CandidateSidebar />
      <div className="main-wrapper">
        <header className="header">
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }} ref={dropdownRef}>
            {isLoggedIn ? (
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Welcome back, <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{currentRole}</span>
              </span>
            ) : (
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Welcome, Guest
              </span>
            )}
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', fontWeight: 'bold' }}
            >
              {isLoggedIn ? 'C' : 'G'}
            </div>

            {isDropdownOpen && (
              <div className="animate-fade-in" style={{
                position: 'absolute',
                top: 'calc(100% + 0.75rem)',
                right: 0,
                width: '180px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
                zIndex: 50
              }}>
                <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{isLoggedIn ? currentRole : 'Guest'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{isLoggedIn ? 'candidate@zenvora.com' : 'Not signed in'}</div>
                </div>
                <div style={{ padding: '0.5rem' }}>
                  {isLoggedIn ? (
                    <div 
                      onClick={() => { setIsLoggedIn(false); setIsDropdownOpen(false); }}
                      style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '0.875rem', borderRadius: '0.25rem', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={16} /> Logout
                    </div>
                  ) : (
                    <div 
                      onClick={() => { setIsLoggedIn(true); setIsDropdownOpen(false); }}
                      style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '0.875rem', borderRadius: '0.25rem', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogIn size={16} /> Login
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CandidateLayout;
