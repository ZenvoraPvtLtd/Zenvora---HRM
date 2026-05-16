import { JobDetailPage } from "../features/candidateDashboard/JobDetailPage";
import RiskAnalysis from "../features/dashboard/RiskAnalysisPage";

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import OAuthCallback from '../pages/auth/OAuthCallback';
import { JobsPage } from '../features/candidateDashboard/JobsPage';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Layout from '../components/layout/Layout';
import CandidateLayout from '../components/layout/CandidateLayout';
import Dashboard from '../features/dashboard/DashboardPage';
import CandidateDashboard from '../features/candidateDashboard/CandidateDashboardPage';
import Jobs from '../features/dashboard/jobs/JobsPage';
import CreateJobPage from '../features/dashboard/jobs/CreateJobPage';
import Candidates from '../features/dashboard/CandidatesPage';
import Interviews from '../features/dashboard/InterviewsPage';
import Attendance from '../features/dashboard/AttendancePage';
import ResultsReview from '../features/dashboard/ResultsReviewPage';
import Profile from '../features/dashboard/ProfilePage';
import FollowUpPage from '../features/dashboard/FollowUpPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/oauth/callback" element={<OAuthCallback />} />

      <Route path="/risk" element={<RiskAnalysis />} />
      {/* Public routes — redirect to / if already logged in */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes — redirect to /login if not logged in */}
      <Route element={<ProtectedRoute allowedRoles="hr" />}>
        {/* HR/Admin Dashboard Portal */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="createjobs" element={<Jobs />} />
          <Route path="createjobs/create" element={<CreateJobPage />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="results" element={<ResultsReview />} />
          <Route path="follow-up" element={<FollowUpPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles="candidate" />}>
        {/* Candidate Portal */}
        <Route path="/candidatedashboard" element={<CandidateLayout />}>
          <Route index element={<CandidateDashboard />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/:id" element={<JobDetailPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
