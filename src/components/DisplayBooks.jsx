import React, { useState, useEffect } from 'react';
import Header from './Header';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import './DisplayBooks.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const DisplayBooks = () => {
  const [books, setBooks] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const getBooks = async () => {
      const booksRef = firebase.database().ref('books');
      const snapshot = await booksRef.once('value');
      const fetchedBooks = snapshot.val() ? Object.values(snapshot.val()) : [];
      setBooks(fetchedBooks);
    };
    getBooks();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Header />
      <h1>Books Available</h1>
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>Publication</th>
            <th>Edition</th>
            <th>Shelf ID</th>
            <th>Published Year</th>
            <th>Status</th>
            {userEmail === 'freejojaison555@gmail.com' && <th>Contact</th>}
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.bookName}</td>
              <td>{book.authorName}</td>
              <td>{book.publication}</td>
              <td>{book.edition}</td>
              <td>{book.shelfID}</td>
              <td>{book.publishedYear}</td>
              <td>{/* Add content for Extra Column 1 */}</td>
              {userEmail === 'freejojaison555@gmail.com' && <td>{/* Add content for Contact column */}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayBooks;
