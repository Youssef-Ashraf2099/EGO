import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { role, loading } = useAuth();
  if (loading) return null; // or a spinner/loader
  console.log("ProtectedRoute role:", role); // Now this will print the correct role after loading
  if (!role) return <Navigate to="/api/v1/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;
  return children;
};

export default ProtectedRoute;