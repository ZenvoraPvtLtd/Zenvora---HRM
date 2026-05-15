import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut, LogIn, Sun, Moon, UserCircle, Search, Bell, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || 'admin@zenvora.com');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'HR Admin');
  const avatarLetter = isLoggedIn && userName ? userName.charAt(0).toUpperCase() : 'G';
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <div className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)} />
      <div className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed}
          userName={userName}
          userEmail={userEmail}
          isLoggedIn={isLoggedIn}
        />
      </div>
      <div className="main-wrapper" style={{ marginLeft: isSidebarCollapsed ? '72px' : '240px', transition: 'margin-left 0.3s ease', width: '100%' }}>



        <header className="header" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '1rem 2rem', 
          background: 'var(--bg-primary)',
          backdropFilter: 'blur(10px)',
          borderBottom: 'none',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ 
              display: 'none', 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-primary)', 
              cursor: 'pointer',
              marginRight: '1rem'
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="header-search" style={{ position: 'relative', width: '450px' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search candidates, jobs..." 
              style={{ 
                width: '100%', 
                padding: '0.75rem 1rem 0.75rem 3rem', 
                borderRadius: '2rem', 
                border: 'none', 
                background: 'var(--chart-bg)', 
                color: 'var(--text-primary)', 
                fontSize: '0.9rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }} 
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }} ref={dropdownRef}>
            <button className="desktop-only" style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center' }} title="Notifications">
              <Bell size={22} />
            </button>
            
            <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="header-welcome-text" style={{ textAlign: 'right', display: isLoggedIn ? 'block' : 'none' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Welcome back,</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{userName}</div>
              </div>
              
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                  border: '1px solid rgba(59, 130, 246, 0.2)', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#3b82f6', 
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                {avatarLetter}
              </div>
            </div>

            {/* Theme Toggle - Always Visible */}
              <button
                onClick={() => toggle()}
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: 'var(--chart-bg)',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
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
        </header>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
