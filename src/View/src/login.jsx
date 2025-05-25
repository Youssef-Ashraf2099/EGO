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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { fetchProfile } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
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
        await fetchProfile();
        navigate("/api/v1/profile");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="form-logo">EGO</div>

      <form onSubmit={handleLogin} className="login-form">
        <h2 className="form-title">Welcome Back</h2>
        <p className="form-subtitle">Sign in to access your account</p>

        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="divider">or</div>

        <div className="login-links">
          <Link to="/api/v1/sendOtp" className="login-link">
            Forgot your password?
          </Link>
          <Link to="/api/v1/register" className="login-link">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>

      <div className="login-decoration"></div>
    </div>
  );
};

export default Login;
