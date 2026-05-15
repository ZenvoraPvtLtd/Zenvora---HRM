import { useState } from 'react';
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
  PanelLeftClose,
  PanelLeftOpen,
  Bell
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const navSections = [
  {
    label: 'MAIN',
    items: [
      { to: '/', icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true },
      { to: '/follow-up', icon: <MessageSquare size={18} />, label: 'Follow Up' },
    ],
  },
  {
    label: 'EMPLOYEE',
    items: [
      { to: '/jobs', icon: <Briefcase size={18} />, label: 'Jobs' },
      { to: '/candidates', icon: <Users size={18} />, label: 'Candidates' },
      { to: '/interviews', icon: <Video size={18} />, label: 'Interviews' },
      { to: '/attendance', icon: <CalendarCheck size={18} />, label: 'Attendance' },
      { to: '/results', icon: <BarChart3 size={18} />, label: 'Results Review' },
    ],
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  userName?: string;
  userEmail?: string;
  isLoggedIn?: boolean;
}

const Sidebar = ({ isCollapsed, setIsCollapsed, userName, userEmail, isLoggedIn }: SidebarProps) => {
  const { isDark, toggle } = useTheme();
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
        {navSections.map((section) => (
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
          to="/profile"
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

export default Sidebar;
