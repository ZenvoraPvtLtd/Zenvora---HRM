import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Video,
  BarChart3,
  UserCircle,
  ChevronDown,
  ChevronRight,
  Briefcase,
  CalendarCheck
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import Jobs from './pages/Jobs';
import Candidates from './pages/Candidates';
import Interviews from './pages/Interviews';
import Attendance from './pages/Attendance';
import ResultsReview from './pages/ResultsReview';
import Profile from './pages/Profile';

const Sidebar = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);
  const location = useLocation();
  const isDashboardActive = location.pathname === '/' || location.pathname.startsWith('/dashboard');

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
        <div style={{ width: '2rem', height: '2rem', background: 'linear-gradient(to bottom right, #a855f7, #3b82f6)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>
          Z
        </div>
        <span style={{ fontWeight: 'bold', fontSize: '1.125rem', letterSpacing: '0.025em' }}>ZENVORA</span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <button
            onClick={() => setIsDashboardOpen(!isDashboardOpen)}
            className={`nav-link ${isDashboardActive && !isDashboardOpen ? 'active' : ''}`}
            style={{ width: '100%', border: 'none', background: isDashboardActive && !isDashboardOpen ? 'var(--accent)' : 'transparent', cursor: 'pointer', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', color: 'inherit' }}>
              <LayoutDashboard size={20} /> <span style={{ fontSize: '1rem', fontFamily: 'inherit' }}>Dashboard</span>
            </div>
            {isDashboardOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {isDashboardOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingLeft: '2.5rem', marginBottom: '0.5rem' }}>
              <NavLink to="/dashboard/candidate" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                Candidate
              </NavLink>
              <NavLink to="/dashboard/hr" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                HR
              </NavLink>
              <NavLink to="/dashboard/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                Admin
              </NavLink>
            </div>
          )}
        </div>
        <NavLink to="/jobs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Briefcase /> Jobs
        </NavLink>
        <NavLink to="/candidates" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Users /> Candidates
        </NavLink>
        <NavLink to="/interviews" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Video /> Interviews
        </NavLink>
        <NavLink to="/attendance" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <CalendarCheck /> Attendance
        </NavLink>
        <NavLink to="/results" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <BarChart3 /> Results Review
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <UserCircle /> Profile
        </NavLink>
      </nav>
    </aside>
  );
};

const Layout = () => {
  const location = useLocation();
  
  let currentRole = 'Admin';
  if (location.pathname.includes('/candidate')) {
    currentRole = 'Candidate';
  } else if (location.pathname.includes('/hr')) {
    currentRole = 'HR';
  } else if (location.pathname.includes('/admin')) {
    currentRole = 'Admin';
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <header className="header">
          {/* Header contents like user info, notifications etc can go here */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Welcome back, <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{currentRole}</span></span>
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard/candidate" element={<CandidateDashboard />} />
          <Route path="dashboard/hr" element={<div className="animate-fade-in"><h1 className="page-title">HR Dashboard</h1><p className="page-subtitle">Welcome to the HR Console</p></div>} />
          <Route path="dashboard/admin" element={<div className="animate-fade-in"><h1 className="page-title">Admin Dashboard</h1><p className="page-subtitle">Welcome to the Admin Dashboard</p></div>} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="results" element={<ResultsReview />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
