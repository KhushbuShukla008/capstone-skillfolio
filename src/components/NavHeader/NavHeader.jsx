import React from 'react';
import { Link } from 'react-router-dom';
import './NavHeader.scss';

const NavHeader = () => {
    return (
    <header className="nav-header">
    <nav>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/createportfolio">Create Portfolio</Link></li>
        <li><Link to="/viewportfolio">View Portfolio</Link></li>
        <li><Link to="/resume">Resume</Link></li>
        <li><Link to="/settings">Settings</Link></li>
    </ul>
    </nav>
    </header>
);
};

export default NavHeader;