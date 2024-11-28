import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginUserPage from "../pages/LoginUserPage";
import RegisterUserPage from "../pages/RegisterUserPage";
import UserDashboardPage from "../pages/UserDashboardPage";
import ArchivedNewsPage from "../pages/ArhivedNewsPage";

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/userDashboard" element={<UserDashboardPage />} />
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
        <Route path="/" element={<LoginUserPage />} />
        <Route path="/register" element={<RegisterUserPage />} />
        <Route path="/my-archives" element={<ArchivedNewsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;