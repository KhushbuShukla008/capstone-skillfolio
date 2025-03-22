import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.scss';
import GitHubAuth from '../../components/GitHubAuth/GitHubAuth';

function Register() {
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    const response = await axios.post('http://localhost:8080/auth/register', {
        username,
        email,
        password
    });
    console.log('Registration response:', response.data);

    if (response.data.token) {
        alert('Registration Successful');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({ id: response.data.id, username: response.data.username }));
        setLoading(false);
        navigate('/viewportfolio');
    } else {
        setLoading(false);
        alert('Registration failed, please try again.');
    }
    } catch (error) {
        setLoading(false);
        console.error('Registration error:', error);
        alert('Registration failed, please try again.');
    }
};

return (
    <form onSubmit={handleSubmit} className="register-form">
    <input 
    type="text" 
    placeholder="Username" 
    value={username} 
    onChange={(e) => setUsername(e.target.value)} 
    required 
    />
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
    <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
    <GitHubAuth />
    </form>
);
}

export default Register;
