import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import OAuthCallback from '../pages/auth/OAuthCallback';
import { JobRecommendations } from '../components/jobRecomendation/JobRecommendations';
import { JobDetails } from '../components/jobRecomendation/JobDetails';
import RiskAnalysis from "../components/RiskAnalysis/RiskAnalysis";
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Layout from '../components/layout/Layout';
import CandidateLayout from '../components/layout/CandidateLayout';
import Dashboard from '../features/dashboard/DashboardPage';
import CandidateDashboard from '../features/candidate/CandidateDashboardPage';
import Jobs from '../features/jobs/JobsPage';
import Candidates from '../features/candidates/CandidatesPage';
import Interviews from '../features/interviews/InterviewsPage';
import Attendance from '../features/attendance/AttendancePage';
import ResultsReview from '../features/results/ResultsReviewPage';
import Profile from '../features/profile/ProfilePage';
import FollowUpPage from '../features/followup/FollowUpPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/oauth/callback" element={<OAuthCallback />} />
      <Route path="/jobs" element={<JobRecommendations />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/risk" element={<RiskAnalysis  />} />
      {/* Public routes — redirect to / if already logged in */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes — redirect to /login if not logged in */}
      <Route element={<ProtectedRoute allowedRoles={['admin', 'hr', 'employee']} fallbackPath="/candidate" />}>
        {/* HR Dashboard Portal */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="results" element={<ResultsReview />} />
          <Route path="follow-up" element={<FollowUpPage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['candidate']} fallbackPath="/" />}>
        {/* Candidate Portal */}
        <Route path="/candidate" element={<CandidateLayout />}>
          <Route index element={<CandidateDashboard />} />
          <Route path="jobs" element={<Jobs isCandidateView={true} />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
