import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavHeader.scss';

const NavHeader = () => {
    return (
    <header className="nav-header">
    <nav>
    <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/register">Register</NavLink></li>
        <li><NavLink to="/createportfolio">Create Portfolio</NavLink></li>
        <li><NavLink to="/viewportfolio">View Portfolio</NavLink></li>
        <li><NavLink to="/resume">Generate Portfolio</NavLink></li>
        {/* <li><NavLink to="/settings">Settings</NavLink></li> */}
    </ul>
    </nav>
    </header>
);
};

export default NavHeader;