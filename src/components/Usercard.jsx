import React from 'react';
import './Usercard.css';
import 'firebase/compat/auth';
import userData from './userbook.json'; // make sure the path to the json file is correct
import './download.png';
import Header from './Header';

const UserCard = () => {
  const user = userData;

  return (
    <div className="user-card">
         <Header />
      <h2>{user.name}</h2>
      <p>ID: {user.id}</p>
      <div className='qr-code'><img src={require("./download.png")} alt="Login QR" /></div>
      
      <h3>List of allotted Books:</h3>
      <table className='user-card table'>
        <thead>
          <tr>
            <th>Name of Book</th>
            <th>Date of Allot</th>
            <th>Date of Return</th>
          </tr>
        </thead>
        <tbody>
          {user.books.map((book, index) => (
            <tr key={index}>
              <td>{book.name}</td>
              <td>{book.allotDate}</td>
              <td>{book.returnDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCard;
