import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Briefcase, LayoutDashboard, UserCircle, LogOut, LogIn, Sun, Moon, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { clearAuthStorage } from '../../utils/auth';

const candidateNavSections = [
  {
    label: 'MAIN',
    items: [
      { to: '/candidate', icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true },
      { to: '/candidate/jobs', icon: <Briefcase size={18} />, label: 'Jobs' },
    ],
  }
];

interface CandidateSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const CandidateSidebar = ({ isCollapsed, setIsCollapsed }: CandidateSidebarProps) => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <aside
      style={{
        width: isCollapsed ? '72px' : '240px',
        minWidth: isCollapsed ? '72px' : '240px',
        background: 'var(--bg-secondary)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 40,
        borderRight: '1px solid var(--border)',
        transition: 'width 0.3s ease',
      }}
    >
      {/* Logo and Toggle */}
      <div
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
        style={{
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          padding: isCollapsed ? '0' : '0 1.25rem',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}
      >
        {!isCollapsed ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '0.875rem',
                  flexShrink: 0,
                }}
              >
                Z
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-primary)',
                }}
              >
                ZENVORA
              </span>
            </div>
            
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              title="Close sidebar"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <PanelLeftClose size={20} />
            </button>
          </>
        ) : (
          <>
            {isLogoHovered ? (
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                title="Expand sidebar"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  transition: 'background 0.2s',
                }}
              >
                <PanelLeftOpen size={20} />
              </button>
            ) : (
              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '0.875rem',
                  flexShrink: 0,
                }}
              >
                Z
              </div>
            )}
          </>
        )}
      </div>

      {/* Nav sections */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: isCollapsed ? '1rem 0.5rem' : '1rem 0.75rem' }}>
        {candidateNavSections.map((section) => (
          <div key={section.label} style={{ marginBottom: '1.25rem' }}>
            {/* Section label */}
            {!isCollapsed ? (
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: 'var(--text-secondary)',
                  padding: '0 0.5rem',
                  marginBottom: '0.5rem',
                  opacity: 0.7,
                }}
              >
                {section.label}
              </p>
            ) : (
              <div style={{ height: '1px', background: 'var(--border)', margin: '1rem 0.5rem', opacity: 0.5 }} />
            )}

            {/* Nav items */}
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  gap: isCollapsed ? '0' : '0.625rem',
                  padding: isCollapsed ? '0.75rem 0' : '0.625rem 0.75rem',
                  borderRadius: '0.5rem',
                  marginBottom: '0.25rem',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--text-purple)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(168, 85, 247, 0.12)' : 'transparent',
                  transition: 'all 0.15s ease',
                })}
                title={isCollapsed ? item.label : undefined}
              >
                {({ isActive }) => (
                  <>
                    <span style={{ color: isActive ? 'var(--text-purple)' : 'var(--text-secondary)', flexShrink: 0, display: 'flex' }}>
                      {item.icon}
                    </span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Profile Link at bottom */}
      <div
        style={{
          padding: isCollapsed ? '1rem 0.5rem' : '1rem 0.75rem',
          borderTop: '1px solid var(--border)',
          flexShrink: 0,
        }}
      >
        <NavLink
          to="/candidate/profile"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            gap: isCollapsed ? '0' : '0.625rem',
            padding: isCollapsed ? '0.75rem 0' : '0.625rem 0.75rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: isActive ? 600 : 400,
            color: isActive ? 'var(--text-purple)' : 'var(--text-secondary)',
            background: isActive ? 'rgba(168, 85, 247, 0.12)' : 'transparent',
            transition: 'all 0.15s ease',
          })}
          title={isCollapsed ? 'Profile' : undefined}
        >
          {({ isActive }) => (
            <>
              <span style={{ color: isActive ? 'var(--text-purple)' : 'var(--text-secondary)', flexShrink: 0, display: 'flex' }}>
                <UserCircle size={18} />
              </span>
              {!isCollapsed && <span>Profile</span>}
            </>
          )}
        </NavLink>
      </div>
    </aside>
  );
};

const CandidateLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || 'candidate@zenvora.com');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'Candidate');
  const avatarLetter = isLoggedIn && userName ? userName.charAt(0).toUpperCase() : 'G';
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    const handleStorageChange = () => {
      setUserName(localStorage.getItem('userName') || 'Candidate');
      setUserEmail(localStorage.getItem('userEmail') || 'candidate@zenvora.com');
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
      <CandidateSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
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
            </div>

            {/* Theme Toggle in Header (to match Admin) */}
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
                        to="/candidate/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '0.875rem', borderRadius: '0.25rem', transition: 'background 0.2s', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <UserCircle size={16} /> Profile
                      </Link>
                      <div 
                        onClick={() => { 
                          clearAuthStorage();
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

export default CandidateLayout;
