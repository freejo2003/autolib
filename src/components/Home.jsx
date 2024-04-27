import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
export default function Home() {
  return (
    <div className=".home">
      <h1>AUTOLIB CONNECT</h1>
      
      <Link to="/login">
        <button >Login</button>
      </Link>
    </div>
  );
}
