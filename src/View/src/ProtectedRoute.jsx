import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { role } = useAuth();
  if (!role) return <Navigate to="/api/v1/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;
  return children;
};

export default ProtectedRoute;