import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <Link to='/'><h1>Sklad<span>io</span></h1></Link>
      <div className="user-controls">
        <span>Администратор</span>
      </div>
    </header>
  );
};

export default Header;