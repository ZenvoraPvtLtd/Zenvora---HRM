import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute — requires a valid accessToken.
 * If not logged in, redirects to /login.
 */
const ProtectedRoute = () => {
  const token = localStorage.getItem('accessToken');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
