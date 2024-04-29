import React, { useState, useEffect } from 'react';
import { useUser } from "../context/UserContext";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; 
import './Header.css'; 

const Header = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); 
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
                alert("Logged Out!Please Login")
                console.log('User signed out successfully');
                navigate("/login");
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
                    {user ? (//change is admin to if a user exist
                        <li><Link to="/login"onClick={handleLogout}>Logout</Link></li>
                    ) : (
                        <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
                    )}
                    {isAdmin && (
                        <li><Link to="/book" onClick={() => setIsOpen(false)}>Add Book</Link></li>
                    )}
                    <li><Link to="/user" onClick={() => setIsOpen(false)}>User Card</Link></li>
                    {isAdmin && (
                        <li><Link to="/scanner" onClick={() => setIsOpen(false)}>Scan</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
