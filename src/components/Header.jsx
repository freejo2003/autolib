import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // make sure to create this CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Autolib</div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/book">Add Book</Link></li>
          <li><Link to="/user">User card</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
