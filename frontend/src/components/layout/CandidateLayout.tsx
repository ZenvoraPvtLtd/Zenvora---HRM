import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Briefcase, LayoutDashboard, UserCircle, LogOut, LogIn, Sun, Moon, PanelLeftClose, PanelLeftOpen, Search, Bell, Menu, X } from 'lucide-react';
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
  userName?: string;
  userEmail?: string;
  isLoggedIn?: boolean;
}

const CandidateSidebar = ({ isCollapsed, setIsCollapsed, userName, userEmail }: CandidateSidebarProps) => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const avatarLetter = userName ? userName.charAt(0).toUpperCase() : 'G';

  return (
    <aside
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--bg-secondary)',
        display: 'flex',
        flexDirection: 'column',
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
      
      {/* Mobile Only: Profile and Notifications */}
      <div className="mobile-only" style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: 'rgba(59, 130, 246, 0.1)', 
              border: '1px solid rgba(59, 130, 246, 0.2)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#3b82f6', 
              fontWeight: 'bold' 
            }}
          >
            {avatarLetter}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{userName || 'Guest'}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{userEmail || 'Welcome'}</div>
          </div>
        </div>
        <button style={{ 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          padding: '0.625rem 0.75rem', 
          background: 'var(--bg-hover)', 
          border: 'none', 
          borderRadius: '0.5rem', 
          color: 'var(--text-primary)', 
          fontSize: '0.875rem',
          cursor: 'pointer'
        }}>
          <Bell size={18} /> Notifications
        </button>
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <div className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)} />
      <div className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <CandidateSidebar 
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
