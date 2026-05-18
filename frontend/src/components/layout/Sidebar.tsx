import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  Bell,
  LogOut,
} from 'lucide-react';
import { clearAuthStorage } from '../../utils/auth';
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
      { to: '/createjobs', icon: <Briefcase size={18} />, label: 'Create Jobs' },
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
  onNavClick?: () => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed, userName, userEmail, isLoggedIn, onNavClick }: SidebarProps) => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const avatarLetter = userName ? userName.charAt(0).toUpperCase() : 'G';
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthStorage();
    navigate('/login');
  };

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    gap: isCollapsed ? '0' : '0.625rem',
    padding: isCollapsed ? '0.75rem 0' : '0.625rem 0.75rem',
    borderRadius: '0.5rem',
    marginBottom: '0.25rem',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: isActive ? 600 : 400,
    color: isActive ? 'var(--text-purple)' : 'var(--text-secondary)',
    background: isActive ? 'rgba(168, 85, 247, 0.12)' : 'transparent',
    transition: 'all 0.15s ease',
  });

  return (
    <aside
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--bg-secondary)',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* Logo + collapse toggle */}
      <div
        onMouseEnter={() => setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
        style={{
          height: '64px',
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
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  flexShrink: 0,
                }}
              >
                Z
              </div>
              <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '0.08em', color: 'var(--text-primary)' }}>
                ZENVORA
              </span>
            </div>
            <button
              onClick={() => setIsCollapsed(true)}
              title="Collapse sidebar"
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', padding: '0.5rem', borderRadius: '0.5rem' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <PanelLeftClose size={20} />
            </button>
          </>
        ) : (
          isLogoHovered ? (
            <button
              onClick={() => setIsCollapsed(false)}
              title="Expand sidebar"
              style={{ background: 'var(--bg-hover)', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', padding: '0.5rem', borderRadius: '0.5rem' }}
            >
              <PanelLeftOpen size={20} />
            </button>
          ) : (
            <div
              style={{
                width: '2rem', height: '2rem',
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                borderRadius: '0.5rem', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.875rem',
              }}
            >
              Z
            </div>
          )
        )}
      </div>

      {/* Mobile: user profile strip */}
      {isLoggedIn && (
        <div className="mobile-only" style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div
              style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-purple)', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0,
              }}
            >
              {avatarLetter}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userName}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userEmail}</div>
            </div>
          </div>
          <button
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.5rem 0.75rem', background: 'var(--bg-hover)', border: 'none',
              borderRadius: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer',
            }}
          >
            <Bell size={16} /> Notifications
          </button>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: isCollapsed ? '1rem 0.5rem' : '1rem 0.75rem' }}>
        {navSections.map((section) => (
          <div key={section.label} style={{ marginBottom: '1rem' }}>
            {!isCollapsed ? (
              <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-secondary)', padding: '0 0.5rem', marginBottom: '0.5rem', opacity: 0.6 }}>
                {section.label}
              </p>
            ) : (
              <div style={{ height: '1px', background: 'var(--border)', margin: '0.75rem 0.25rem', opacity: 0.5 }} />
            )}

            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={onNavClick}
                style={navLinkStyle}
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

      {/* Bottom: Profile + Logout */}
      <div style={{ padding: isCollapsed ? '1rem 0.5rem' : '1rem 0.75rem', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <NavLink
          to="/profile"
          onClick={onNavClick}
          style={navLinkStyle}
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

        <button
          onClick={handleLogout}
          title={isCollapsed ? 'Logout' : undefined}
          style={{
            display: 'flex', alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            gap: isCollapsed ? '0' : '0.625rem',
            padding: isCollapsed ? '0.75rem 0' : '0.625rem 0.75rem',
            borderRadius: '0.5rem', width: '100%',
            background: 'transparent', border: 'none',
            fontSize: '0.875rem', color: '#ef4444', cursor: 'pointer', marginTop: '0.25rem',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <span style={{ flexShrink: 0, display: 'flex' }}><LogOut size={18} /></span>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
