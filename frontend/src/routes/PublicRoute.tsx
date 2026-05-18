import { Navigate, Outlet } from "react-router-dom";
import { getStoredUserRole, getDashboardPath } from "../utils/auth";

const PublicRoute = () => {
  const token = localStorage.getItem('accessToken');
  const role = getStoredUserRole();
  return token ? <Navigate to={getDashboardPath(role)} replace /> : <Outlet />;
};

export default PublicRoute;
