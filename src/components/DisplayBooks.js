import React, { useState, useEffect } from 'react';
import Header from './Header';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const DisplayBooks = () => {
  const [books, setBooks] = useState([]);
  console.log(books);
  
  useEffect(() => {
    const getBooks = async () => {
      const booksRef = firebase.database().ref('books');
      const snapshot = await booksRef.once('value');
      const fetchedBooks = snapshot.val() ? Object.values(snapshot.val()) : [];
      setBooks(fetchedBooks);
    };
    getBooks();
  }, []);

  return (
    <div>
      <Header />
      <h1>Books Available</h1>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <h2>{book.bookName}</h2>
            <p><strong>Author:</strong> {book.authorName}</p>
            <p><strong>Publication:</strong> {book.publication}</p>
            <p><strong>Edition:</strong> {book.edition}</p>
            <p><strong>Shelf ID:</strong> {book.shelfId}</p>
            <p><strong>Avilable:</strong> {book.availability ? "Avilable" : "Not avilable"}</p>
            <p><strong>Taken by:</strong> {book.takenBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayBooks;
