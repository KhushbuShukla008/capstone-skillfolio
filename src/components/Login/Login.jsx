import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import GitHubAuth from '../GitHubAuth/GitHubAuth';

function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();


useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const userId = urlParams.get('user_id'); 

    if (accessToken && userId) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('user', JSON.stringify({ id: userId }));
        console.log('User ID stored:', userId); 
        navigate('/viewportfolio');
    }
}, [navigate]);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password
    });

    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({ id: response.data.userId }));
        console.log('User ID stored:', response.data.userId);
        alert('Login Successful');
        navigate('/viewportfolio');
    } else {
        console.log('No token found in response');
    }
    } catch (error) {
    console.error('Login error:', error);
    alert('Login failed, please check your credentials.');
    }
};

return (
    <form onSubmit={handleSubmit} className="login-form">
    <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
    />
    <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
    />
    <button type="submit">Login</button>
    <GitHubAuth />
    </form>
    );
}

export default Login;
