import React, { useEffect, useState } from 'react';
import './Usercard.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Header from './Header';
import QRCode from 'qrcode.react';
const UserCard = () => {
  const [user, setUser] = useState(null); // Use the imported data as initial state
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        // User is signed in.
        setUser(currentUser);
      } else {
        // No user is signed in.
        setUser(null);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="user-card">
      <Header />
      <h2>{user.displayName}</h2>
      <p>ID: {user.email}</p>
      <div className='qr-code'>
        <QRCode value={user.email} /> 
      </div>
      <h3>List of allotted Books:</h3>
      {user.books ? (
        <table className='user-card table'>
          <thead>
            <tr>
              <th>Name of Book</th>
              <th>Date of Allot</th>
              <th>Date of Return</th>
            </tr>
          </thead>
        </table>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
};
export default UserCard;