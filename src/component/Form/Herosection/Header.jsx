import React from 'react';
// import logo from '../assets/logo.png';
import './Hero.css';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="container">
          <div className="logo">
            <img src='' alt="Logo" />
          </div>
          <ul className="menu">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
