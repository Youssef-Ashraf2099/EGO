import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./main page/styles/form.css";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { handleLogin } from "./authHandlers";
const Port = import.meta.env.VITE_API_PORT;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { fetchProfile } = useAuth();

  return (
    <div className="login-container">
      <div className="form-logo">EGO</div>

      <form
        onSubmit={(e) =>
          handleLogin({
            e,
            email,
            password,
            setLoading,
            setError,
            fetchProfile,
            navigate,
            Port,
          })
        }
        className="login-form"
      >
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