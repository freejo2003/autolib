import React from 'react';
import {  Link } from "react-router-dom";
const Navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/login">Login</Link>
    </li>
    <li>
      <Link to="/book">Add Book</Link>
    </li>
  </div>
  );
}
export default Navbar;