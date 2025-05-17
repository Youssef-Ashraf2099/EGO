import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Port = import.meta.env.PORT || 3001;

const SendOTP = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:${Port}/api/v1/sendOtp`, { email });
      console.log('response status', res.status);
      console.log('response body', res.data);
      console.log(email)

      if (res.status === 200) {
        alert('OTP sent successfully');
        localStorage.setItem('resetEmail', email);
        navigate('/api/v1/forgetPassword');
      } else {
        console.log('Failed to send OTP');
      }

    } catch (err) {
      console.log('Error during sending OTP', err.message);
      const msg = err.response?.data || 'An error occurred';
      alert(msg);
    }
  };

  return (
    <>
      <form onSubmit={handleSendOtp}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default SendOTP;
