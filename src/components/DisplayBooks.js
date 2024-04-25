import React, { useState,useEffect } from 'react';
//import data from './data.json'; // Importing data from data.json
import Header from './Header';
import { db } from '../firebaseConfig';

const DisplayBooks = () => {
  const [books,setBooks] = useState([]);
  useEffect(()=>{
    const getBooks = async () => {
      const booksRef =db.ref('books');
      const snapshot=await booksRef.once();
      const fetchedBooks=Object.values(snapshot.val() || {});
      setBooks(fetchedBooks);
    };
    getBooks();

  },[]);

  return (
    <div>
       <Header />
      <h1>Books Available</h1>
      <ul>
        {books.map((book,index)=>(
          <li key={index}>
            <h2>{book.bookName}</h2>
            <p><strong>Author:</strong> {books.authorName}</p>
            <p><strong>Publication:</strong> {books.publication}</p>
            <p><strong>Edition:</strong> {books.edition}</p>
            <p><strong>Shelf ID:</strong> {books.shelfID}</p>
            <p><strong>Published Year:</strong> {books.publishedYear}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayBooks;
