import { Navigate, Outlet } from 'react-router-dom';
import { getDashboardPath, getStoredUserRole } from '../utils/auth';

/**
 * PublicRoute — only for guests (login/register).
 * If already logged in, redirects to / (dashboard).
 */
const PublicRoute = () => {
  const token = localStorage.getItem('accessToken');
  const role = getStoredUserRole();
  return token ? <Navigate to={getDashboardPath(role)} replace /> : <Outlet />;
};

export default PublicRoute;
