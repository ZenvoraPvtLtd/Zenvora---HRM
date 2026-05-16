import { Navigate, Outlet } from "react-router-dom";

/**
 * PublicRoute — only for guests (login/register).
 * If already logged in, redirects to the right portal.
 */
const PublicRoute = () => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");
  if (!token) return <Outlet />;
  return <Navigate to={role === "candidate" ? "/candidatedashboard" : "/"} replace />;
};

export default PublicRoute;
