import { Navigate, Outlet } from 'react-router-dom';

const KNOWN_ROLES = ['admin', 'hr', 'employee', 'candidate'];

const clearAuthSession = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
};

const PublicRoute = () => {
  const token = localStorage.getItem('accessToken');
  const role = localStorage.getItem('userRole');

  if (!token) return <Outlet />;

  if (!role || !KNOWN_ROLES.includes(role)) {
    clearAuthSession();
    return <Outlet />;
  }

  return <Navigate to={role === 'candidate' ? '/candidate' : '/'} replace />;
};

export default PublicRoute;
