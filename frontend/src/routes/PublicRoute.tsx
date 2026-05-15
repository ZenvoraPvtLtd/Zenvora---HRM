import { Navigate, Outlet } from 'react-router-dom';
import { clearAuthStorage, getDashboardPath, getStoredUserRole } from '../utils/auth';

const PublicRoute = () => {
  const token = localStorage.getItem('accessToken');
  const role = getStoredUserRole();

  if (!token) return <Outlet />;

  if (!role) {
    clearAuthStorage();
    return <Outlet />;
  }

  return <Navigate to={getDashboardPath(role)} replace />;
};

export default PublicRoute;
