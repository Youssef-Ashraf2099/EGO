import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosURL"; // Import axiosInstance instead of axios

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Standard User");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("register form submitted");

    const form = {
      name,
      password,
      email,
      role,
    };
    try {
      // Use axiosInstance instead of axios with localhost URL
      const res = await axiosInstance.post("/register", form);

      console.log("response status ", res.status);
      console.log("response body ", res.data);

      if (res.status === 201) {
        alert("Registeration successful");
        navigate("/login"); // Remove the /api/v1 prefix from navigation
      } else {
        alert("Registeration failed");
      }
    } catch (err) {
      console.error("Error during register:", err);
      const msg = err.response?.data || "An error occurred during login";
      alert(msg);
    }
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRegister}>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className="login-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="Standard User">Standard User</option>
          <option value="Organizer">Organizer</option>
          <option value="System Admin">System Admin</option>
        </select>
        <button className="login-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
