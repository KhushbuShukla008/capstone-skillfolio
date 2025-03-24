import React from 'react';
import './Footer.scss';
import InstagramIcon from "../../assets/icons/Instagram.svg";
import FacebookIcon from "../../assets/icons/Facebook.svg";
import TwitterIcon from "../../assets/icons/X_twitter.svg";
import { Link } from "react-router-dom";
import PinterestIcon from "../../assets/icons/Pinterest.svg";

const Footer = () => {
    return (
    <footer className="footer">
    <div className="footer-left">
        <h1 className="footer-title">
            <Link to="/" className="header-link">SkillFolio</Link>
        </h1>
    </div>
    <div className="footer-right">
    <a className="social-media__images" href="https://www.facebook.com">
            <img src={FacebookIcon} alt="facebook" className="social-media__icon" />
        </a>
        <a className="social-media__images" href="https://www.twitter.com">
            <img src={TwitterIcon} alt="twitter" className="social-media__icon" />
        </a>
        <a className="social-media__images" href="https://www.instagram.com">
            <img src={InstagramIcon} alt="instagram" className="social-media__icon"/>
        </a>
        <a className="social-media__images" href="https://www.pinterest.com/">
            <img src={PinterestIcon} alt="pinterest" className="social-media__icon"/>
        </a>
    </div>
    </footer>
);
};

export default Footer;