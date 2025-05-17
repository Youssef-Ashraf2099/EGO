import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';  // Make sure axios is imported
import Login from './login'; // make sure this path is correct
import Register from './register';
import SendOTP from './sendOtp'
import ForgotPassword from './forgotPassword';

function App() {
  return (
    <Routes>
      <Route path="/api/v1/login" element={<Login />} />
      <Route path="/api/v1/register" element={<Register />} />
      <Route path="/api/v1/sendOtp" element={<SendOTP />}/>
      <Route path="/api/v1/forgetPassword" element={<ForgotPassword />}/>
    </Routes>
  );
}

export default App
