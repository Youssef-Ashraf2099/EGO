import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const Port = import.meta.env.VITE_API_PORT || 3001;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // <-- Add loading state

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:${Port}/api/v1/users/profile`, { withCredentials: true });
      setUser(res.data);
      setRole(res.data.role);
    } catch {
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false); // <-- Set loading to false after fetch
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, fetchProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);