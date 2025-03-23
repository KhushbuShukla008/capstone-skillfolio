import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');
        const username = urlParams.get('login'); 

        if (accessToken && login) {
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('login', login);
            navigate('/createportfolio'); 
        } else {
            console.error('Access token or username missing from URL parameters');
        }
    }, [navigate]);

    return (
        <div>
            <h1>OAuth Callback</h1>
        </div>
    );
};

export default OAuthCallback;