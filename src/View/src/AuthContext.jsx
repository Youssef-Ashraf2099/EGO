import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const Port = import.meta.env.PORT || 3001;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:${Port}/api/v1/users/profile`, { withCredentials: true });
      setRole(res.data.role);
    } catch {
      setRole(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ role, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);