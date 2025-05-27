import React from "react";
import axiosInstance from "./axiosURL";

export const handleLogin = async ({
  e,
  email,
  password,
  setLoading,
  setError,
  fetchProfile,
  navigate,
  Port,
}) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
    const res = await axiosInstance.post(
      `/login`,
      { email, password },
      { withCredentials: true }
    );
    if (res.status === 200) {
      await fetchProfile();
      navigate("/profile");
    }
  } catch (err) {
    setError(
      err.response?.data?.message || "Invalid credentials. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

export const handleLogout = async ({ fetchProfile, navigate, Port }) => {
  try {
    await axiosInstance.post(`/logout`, {}, { withCredentials: true });
    await fetchProfile();
    alert("Logged out successfully.");
    navigate("/login");
  } catch (err) {
    alert("Logout failed. Please try again.");
  }
};
