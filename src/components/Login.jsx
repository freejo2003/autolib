import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const LoginPage = () => {
  const { setUser } = useUser();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/display"); // Navigate to /display after successful login
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='form'>
      <h2>Login with Google</h2>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
