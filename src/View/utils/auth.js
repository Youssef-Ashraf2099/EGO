import axios from 'axios';

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const getCurrentUser = () => {
  const userJSON = localStorage.getItem('user');
  if (!userJSON) return null;
  
  try {
    return JSON.parse(userJSON);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.role === role;
};

export const isEventOrganizer = (eventOrganizerId) => {
  const user = getCurrentUser();
  return user && user.role === "Organizer" && user.userId === eventOrganizerId;
};