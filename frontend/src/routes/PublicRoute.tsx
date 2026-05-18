import { Navigate, Outlet } from "react-router-dom";


const PublicRoute = () => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");
  if (!token) return <Outlet />;
  return <Navigate to={role === "candidate" ? "/candidatedashboard" : "/"} replace />;

};

export default PublicRoute;
