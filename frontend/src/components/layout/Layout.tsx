import { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { LogOut, LogIn } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = () => {
  const currentRole = 'HR Admin';
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
      <Sidebar />
      <div className="main-wrapper">
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>ZENVORA</span>
          </div>
          
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
              {isLoggedIn ? 'A' : 'G'}
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
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{isLoggedIn ? 'admin@zenvora.com' : 'Not signed in'}</div>
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

export default Layout;
