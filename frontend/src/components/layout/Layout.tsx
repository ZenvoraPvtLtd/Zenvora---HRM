import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const location = useLocation();
  const currentRole = 'HR Admin';

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <header className="header">
          {/* Header contents like user info, notifications etc can go here */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Welcome back, <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{currentRole}</span>
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}></div>
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
