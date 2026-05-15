import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  fallbackPath?: string;
}

const KNOWN_ROLES = ['admin', 'hr', 'employee', 'candidate'];

const clearAuthSession = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
};

const ProtectedRoute = ({ allowedRoles, fallbackPath = "/" }: ProtectedRouteProps) => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !KNOWN_ROLES.includes(role)) {
    clearAuthSession();
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(role)) {
    if (fallbackPath === location.pathname) {
      clearAuthSession();
      return <Navigate to="/login" replace />;
    }

    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
