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
    const login = urlParams.get('login');
    console.log('URL Params:', { accessToken, userId, login });

    if (accessToken && userId ) {
        axios.get('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).then((userResponse) => {
            console.log(userResponse); 

        if (userResponse.data && userResponse.data.login) {
        const githubUsername = userResponse.data.login || 'Unknown';
        const email = userResponse.data.email || 'No Email Provided';
        const userId = userResponse.data.id || 'Unknown';
        localStorage.setItem('access_token', accessToken); 
        localStorage.setItem('user', JSON.stringify({ 
            userId: userId, 
            githubUsername: githubUsername,
            email: email,
            loginMethod: 'GitHub OAuth'
        }));
        console.log('Stored user in localStorage:', { userId, githubUsername, email }); 
        navigate('/viewportfolio');
    }else {
        console.error('GitHub login missing in response');
        alert('GitHub login missing in the response. Please try again.');
    }
    }).catch(error => {
    console.error('Error fetching user data:', error);
    alert('Failed to fetch user data from GitHub.');
    });
    }
}, [navigate]);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password
    });
    console.log('Backend response:', response.data);
    const { token, user } = response.data;
    const userEmail = user.email || email || 'No Email Provided';
    const username = user.username || 'No Username';
    const githubUsername = user.githubUsername || 'No GitHub Username';

    if (token && user) {
        localStorage.setItem('access_token', token);
        localStorage.setItem('user', JSON.stringify({ 
            id: user.id,
            email: userEmail,
            username: username,
            githubUsername: githubUsername,
            loginMethod: 'Email & Password'
        }));
        console.log('User ID stored:',  user.id, userEmail, username, githubUsername );
        alert('Login Successful');
        navigate('/viewportfolio');
    } else {
        console.error('Invalid response data:', response.data);
        alert('Login failed, no token received.');
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
