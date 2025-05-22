import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Port = import.meta.env.PORT || 3001;
import { useAuth } from "./AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { fetchProfile } = useAuth();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('login form submitted');

        const form = {
            email,
            password
        }
        try{
            const res=await axios.post(`http://localhost:${Port}/api/v1/login`, form, {
                withCredentials:true
            })
            console.log('response status ', res.status)
            console.log('response body ', res.data)

            if (res.status === 200) {
                alert('login successfully');
                await fetchProfile(); // <-- update navbar immediately
                navigate('/');
            } else {
                alert('login failed');
            }
        } catch (err) {
            console.error('Error during login:', err);
            const msg = err.response?.data || 'An error occurred during login';
            alert(msg);
        }
    };
    return (
        <>
        <form onSubmit={handleLogin}>
 <input 
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required/>
            <br></br>
               <input 
            type="password"
            placeholder='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required/>
            <br></br>
             <button type='submit'>Login</button>
        </form>
        
        <br></br>
        <a href='/api/v1/register'>Register</a>
        <br></br>
        <a href='/api/v1/sendOtp'>Forgot password</a>
       
        </>
    );
};
export default Login;