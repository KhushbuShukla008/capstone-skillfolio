import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.scss";

function Header() {
    return (
    <header className="header">
        <h1 className="header-title">
            <Link to="/" className="header-link">SkillFolio</Link>
        </h1>
    </header>
        );
};

export default Header;