import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut
import './Header.css'; // make sure to create this CSS file

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                // Check if the user's email address is that of an admin
                setIsAdmin(user.email === 'freejojaison555@gmail.com');
            } else {
                // No user is signed in.
                setIsAdmin(false);
            }
        });

        // Cleanup function to unsubscribe from the listener when component unmounts
        return () => unsubscribe();
    }, [auth]); // Trigger effect whenever auth changes

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log('User signed out successfully');
            })
            .catch((error) => {
                // An error happened.
                console.error('Error signing out:', error);
            });
    };

    return (
        <header className="header">
            <div className="logo">Autolib Connect</div>
            <nav>
                <button onClick={() => setIsOpen(!isOpen)} className="hamburger-menu">
                    ☰
                </button>
                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                    <li><Link to="/display" onClick={() => setIsOpen(false)}>Books</Link></li>
                    {isAdmin ? (
                        <li><button onClick={handleLogout}>Logout</button></li>
                    ) : (
                        <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
                    )}
                    {isAdmin && (
                        <li><Link to="/book" onClick={() => setIsOpen(false)}>Add Book</Link></li>
                    )}
                    <li><Link to="/user" onClick={() => setIsOpen(false)}>User Card</Link></li>
                    {isAdmin && (
                        <li><Link to="/qrread" onClick={() => setIsOpen(false)}>Scan</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
