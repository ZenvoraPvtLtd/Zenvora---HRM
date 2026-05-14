import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import CandidateLayout from './components/layout/CandidateLayout';

import Dashboard from './features/dashboard/DashboardPage';
import CandidateDashboard from './features/candidate/CandidateDashboardPage';
import Jobs from './features/jobs/JobsPage';
import Candidates from './features/candidates/CandidatesPage';
import Interviews from './features/interviews/InterviewsPage';
import Attendance from './features/attendance/AttendancePage';
import ResultsReview from './features/results/ResultsReviewPage';
import Profile from './features/profile/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HR Dashboard Portal */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="results" element={<ResultsReview />} />
          <Route path="follow-up" element={<div className="animate-fade-in" style={{ padding: '2rem' }}><h1 className="page-title">Follow Up</h1><p className="page-subtitle">Manage your follow-ups here</p></div>} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Candidate Portal */}
        <Route path="/candidate" element={<CandidateLayout />}>
          <Route index element={<CandidateDashboard />} />
          <Route path="jobs" element={<Jobs isCandidateView={true} />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
