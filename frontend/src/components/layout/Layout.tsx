import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut, LogIn, Sun, Moon, UserCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const currentRole = 'HR Admin';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || 'admin@zenvora.com');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'HR Admin');
  const avatarLetter = isLoggedIn && userName ? userName.charAt(0).toUpperCase() : 'G';
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    const handleStorageChange = () => {
      setUserName(localStorage.getItem('userName') || 'HR Admin');
      setUserEmail(localStorage.getItem('userEmail') || 'admin@zenvora.com');
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="app-container">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <div className="main-wrapper" style={{ marginLeft: isSidebarCollapsed ? '72px' : '240px', transition: 'margin-left 0.3s ease' }}>
        <header className="header">


          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }} ref={dropdownRef}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {isLoggedIn ? (
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Welcome back, <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{userName}</span>
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
              {avatarLetter}
            </div>

            {/* Theme Toggle in Header */}
            <button
              onClick={() => toggle()}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

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
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{isLoggedIn ? userName : 'Guest'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{isLoggedIn ? userEmail : 'Not signed in'}</div>
                </div>
                <div style={{ padding: '0.5rem' }}>
                  {isLoggedIn ? (
                    <>
                      <Link 
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '0.875rem', borderRadius: '0.25rem', transition: 'background 0.2s', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <UserCircle size={16} /> Profile
                      </Link>
                      <div 
                      onClick={() => { 
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('userEmail');
                        localStorage.removeItem('userName');
                        setIsLoggedIn(false); 
                        setIsDropdownOpen(false); 
                        navigate('/login');
                      }}
                      style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '0.875rem', borderRadius: '0.25rem', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={16} /> Logout
                      </div>
                    </>
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
