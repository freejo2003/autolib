import React, { useState, useEffect } from 'react';
import { useUser } from "../context/UserContext";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; 
import { useMediaQuery } from 'react-responsive';
import './Header.css'; 

const Header = () => {
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); 
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsAdmin(user?.email === 'freejojaison555@gmail.com');
        });

        return () => unsubscribe();
    }, [auth, setUser]);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                alert("Logged Out! Please Login");
                console.log('User signed out successfully');
                navigate("/");
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/"); // Navigate to /display after successful login
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    const isMobileDevice = useMediaQuery({ query: "(max-width: 767px)" }); // Adjusted for mobile devices
    const isTabletOrLargerDevice = useMediaQuery({ query: "(min-width: 768px)" }); // Adjusted for tablets and larger devices

    return (
        <header className="header">
            <div className="logo">Autolib Connect</div>
            <nav>
                {isMobileDevice && (
                    <button onClick={() => setIsOpen(!isOpen)} className="hamburger-menu">
                        ☰
                    </button>
                )}
                <ul className={`nav-links ${isOpen && isMobileDevice ? 'open' : ''}`}>
                    <li><Link to="/" onClick={() => setIsOpen(false)}>Books</Link></li>
                    {isTabletOrLargerDevice && isAdmin && (
                        <li><Link to="/book" onClick={() => setIsOpen(false)}>Add Book</Link></li>
                    )}
                    <li><Link to="/user" onClick={() => setIsOpen(false)}>User Card</Link></li>
                    {isTabletOrLargerDevice && isAdmin && (
                        <li><Link to="/scanner" onClick={() => setIsOpen(false)}>Scan</Link></li>
                    )}
                    {user ? (
                        <li><button onClick={handleLogout}>Logout</button></li>
                    ) : (
                        <li><button onClick={handleGoogleSignIn}>Login</button></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
