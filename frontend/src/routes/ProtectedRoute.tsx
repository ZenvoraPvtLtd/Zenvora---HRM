import { Navigate, Outlet } from 'react-router-dom';
import {
  getDashboardPath,
  getStoredUserRole,
  isCandidateRole,
  isHrRole,
} from '../utils/auth';

type ProtectedRouteProps = {
  allowedRoles?: 'hr' | 'candidate';
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem('accessToken');
  const role = getStoredUserRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles === 'hr' && !isHrRole(role)) {
    return <Navigate to={getDashboardPath(role)} replace />;
  }

  if (allowedRoles === 'candidate' && !isCandidateRole(role)) {
    return <Navigate to={getDashboardPath(role)} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
