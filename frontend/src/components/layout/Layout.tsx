import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || 'admin@zenvora.com');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'HR Admin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setUserName(localStorage.getItem('userName') || 'HR Admin');
      setUserEmail(localStorage.getItem('userEmail') || 'admin@zenvora.com');
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="app-container">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-overlay active"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          userName={userName}
          userEmail={userEmail}
          isLoggedIn={isLoggedIn}
          onNavClick={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Main content */}
      <div
        className="main-wrapper"
        style={{
          marginLeft: isSidebarCollapsed ? '72px' : '240px',
          transition: 'margin-left 0.3s ease',
          width: '100%',
          minWidth: 0,
        }}
      >
        {/* Mobile top bar */}
        <div
          className="mobile-topbar"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '1.75rem', height: '1.75rem',
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                borderRadius: '0.375rem', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.75rem',
              }}
            >
              Z
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.06em', color: 'var(--text-primary)' }}>
              ZENVORA
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'var(--bg-hover)', border: '1px solid var(--border)',
              borderRadius: '0.5rem', color: 'var(--text-primary)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '36px',
            }}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
