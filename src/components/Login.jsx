import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    alert(`Welcome back user ${username}`);

    navigate("/book")
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    
            <p className='signup-text'>Don't have an account? 
              <a href="/signup" className='signup-link'>Sign Up</a></p>
    </form>
    
  );
};

export default Login;