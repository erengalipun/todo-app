import React from 'react';
import './Logo.scss';
import logo from '../../assets/logo.png';

const Logo = () => {
  return (
    <div className='logo-loading-page'>
      <div className="logo-container">
        <img src={logo} alt="Application Logo" />
      </div>
    </div>
  );
};

export default Logo;
