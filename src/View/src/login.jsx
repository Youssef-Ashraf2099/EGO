import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Port = import.meta.env.VITE_API_PORT || 3500;
import "./main page/styles/form.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("login form submitted");

    const form = {
      email,
      password,
    };
    try {
      const res = await axios.post(
        `http://localhost:${Port}/api/v1/login`,
        form,
        {
          withCredentials: true,
        }
      );
      console.log("response status ", res.status);
      console.log("response body ", res.data);

      if (res.status === 200) {
        alert("login successfully");
        navigate("/api/v1/dashboard");
      } else {
        alert("login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      const msg = err.response?.data || "An error occurred during login";
      alert(msg);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <div className="login-links">
        <a href="/api/v1/register" className="login-link">
          Register
        </a>
        <a href="/api/v1/sendOtp" className="login-link">
          Forgot password
        </a>
      </div>
    </div>
  );
};
export default Login;
