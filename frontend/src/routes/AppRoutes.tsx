import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { JobRecommendations } from "../components/jobRecomendation/JobRecommendations";
import JobDetails from "../components/jobRecomendation/JobDetails";
import RiskAnalysis from "../components/RiskAnalysis/RiskAnalysis";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/jobs" element={<JobRecommendations />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/risk" element={<RiskAnalysis />} />
    </Routes>
  );
};

export default AppRoutes;
