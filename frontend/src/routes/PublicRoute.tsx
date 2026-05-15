import { Navigate, Outlet } from 'react-router-dom';

/**
 * PublicRoute — only for guests (login/register).
 * If already logged in, redirects to / (dashboard).
 */
const PublicRoute = () => {
  const token = localStorage.getItem('accessToken');
  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
