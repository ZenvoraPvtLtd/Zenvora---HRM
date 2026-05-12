import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
