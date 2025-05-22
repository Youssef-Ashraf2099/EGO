import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Port = import.meta.env.PORT || 2099;

const ForgotPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:${Port}/api/v1/forgetPassword`,
        { email, otp, password: newPassword }
      );
      console.log("response status ", res.status);
      console.log("response body ", res.data);

      if (res.status === 200) {
        console.log("successfully changed password");
        alert("password changed");
        navigate("/api/v1/login");
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
      <form onSubmit={handleForgotPassword}>
        <input type="hidden" value={email} name="email" />
        <input
          type="text"
          placeholder="otp code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <br></br>
        <input
          type="password"
          placeholder="new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <br></br>
        <button type="submit">Change</button>
      </form>
    </>
  );
};
export default ForgotPassword;
