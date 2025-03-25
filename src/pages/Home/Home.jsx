import React from 'react';
import Login from '../../components/Login/Login';
import './Home.scss';

const Home = () => {
return (
    <div className="home">
    <div className='home__title'>
    <h1>Welcome to SkillFolio</h1>
    <p>Create and manage your professional portfolio and resume with ease.</p>
    </div>
    <Login />
    </div>
);
};

export default Home;