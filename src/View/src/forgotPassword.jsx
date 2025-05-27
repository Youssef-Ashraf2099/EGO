import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "./axiosURL";
const Port = import.meta.env.VITE_API_PORT || 2099;
import "./main page/styles/form.css";

const ForgotPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.put(`/forgetPassword`, {
        email,
        otp,
        password: newPassword,
      });
      console.log("response status ", res.status);
      console.log("response body ", res.data);

      if (res.status === 200) {
        console.log("successfully changed password");
        alert("password changed");
        navigate("/login");
      } else {
        alert("failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      const msg = err.response?.data || "An error occurred during login";
      alert(msg);
    }
  };
  return (
    <>
      <div className="login-container">
        <form onSubmit={handleForgotPassword} className="login-form">
          <input type="hidden" value={email} name="email" />

          <input
            type="text"
            placeholder="otp code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="login-input"
          />
          <br />

          <input
            type="password"
            placeholder="new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="login-input"
          />
          <br />

          <button type="submit" className="login-button">
            Change
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
