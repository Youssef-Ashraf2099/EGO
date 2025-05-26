import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const Port = import.meta.env.PORT || 3001;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the entire user object instead of just role
  const [role, setRole] = useState(null); // Keep role for backward compatibility

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:${Port}/api/v1/users/profile`, { withCredentials: true });
      setUser(res.data); // Store entire user object
      setRole(res.data.role); // Keep role for backward compatibility
    } catch {
      setUser(null);
      setRole(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);