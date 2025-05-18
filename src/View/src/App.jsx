import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios"; // Make sure axios is imported
import Login from "./login"; // make sure this path is correct
import Register from "./register";
import SendOTP from "./sendOtp";
import ForgotPassword from "./forgotPassword";
import Footer from "./footer";
import AboutUs from "./AboutUs"; // make sure this path is correct
import Terms from "./Terms"; // make sure this path is correct
function App() {
  return (
    <>
      <Routes>
        <Route path="/api/v1/login" element={<Login />} />
        <Route path="/api/v1/register" element={<Register />} />
        <Route path="/api/v1/sendOtp" element={<SendOTP />} />
        <Route path="/api/v1/forgetPassword" element={<ForgotPassword />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/Terms" element={<Terms />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
