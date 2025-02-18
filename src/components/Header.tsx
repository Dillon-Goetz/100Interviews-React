import React from "react";
import { Link } from "react-router-dom";
import "../styles/HeaderFooter.css"
import logo from '../assets/100Interviews.png';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/questionCount" className="header-logo">
          <img src={logo} alt="100Interviews Logo" className="logo-image" />
        </Link>
      </div>
      <div className="login-icon-container">
        <Link to="/account" className="login-icon">
          👤
        </Link>
      </div>
    </header>
  );
};

export default Header;
