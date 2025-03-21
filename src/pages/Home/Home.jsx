import React from 'react';
import Login from '../../components/Login/Login';

const Home = () => {
return (
    <div className="home">
    <h1>Welcome to SkillFolio</h1>
    <p>Create and manage your professional portfolio and resume with ease.</p>
    <Login />
    </div>
);
};

export default Home;