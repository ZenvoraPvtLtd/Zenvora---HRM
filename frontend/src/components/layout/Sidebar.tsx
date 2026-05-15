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
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen
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
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const { isDark, toggle } = useTheme();
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
