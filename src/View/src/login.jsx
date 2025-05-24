import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./main page/styles/form.css";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
const Port = import.meta.env.VITE_API_PORT;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { fetchProfile } = useAuth(); // Fetch profile function from AuthContext to update navbar

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
        await fetchProfile(); // <-- update navbar immediately
        navigate("/api/v1/profile");
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
        <Link to="/api/v1/register" className="login-link">Register</Link>
        <Link to="/api/v1/sendOtp" className="login-link">ForgetPassword</Link>
      </div>
    </div>
  );
};
export default Login;
