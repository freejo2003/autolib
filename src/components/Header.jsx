import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.css'; // make sure to create this CSS file

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <header className="header">
        <div className="logo">Autolib Connect</div>
        <nav>
          <button onClick={() => setIsOpen(!isOpen)} className="hamburger-menu">
            ☰
          </button>
          <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
            <li><Link to="/book" onClick={() => setIsOpen(false)}>Add Book</Link></li>
            <li><Link to="/user" onClick={() => setIsOpen(false)}>User Card</Link></li>
            <li><Link to="/qrread" onClick={() => setIsOpen(false)}>Scan</Link></li>
          </ul>
        </nav>
      </header>
    );
};

export default Header;
