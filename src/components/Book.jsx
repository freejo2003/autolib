import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';


const Book = () => {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [publication, setPublication] = useState('');
  const [edition, setEdition] = useState('');
  const navigate =useNavigate();

  const [shelfId, setShelfId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle AddBook logic herenn
    alert("successfully added")
    navigate("/")
  };

  return (
    <form onSubmit={handleSubmit}>
       <Header />
    
      <h1>SHELF 101</h1>
     <label htmlFor='Book Name'>Book Name:</label>
        <input
          type="text"
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <label htmlFor='Author Name'>Author Name:</label>
        <input
          type="text"
          placeholder="Author Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <label htmlFor='Publication'>Publication:</label>
        <input
          type="text"
          placeholder="Publication"
          value={publication}
          onChange={(e) => setPublication(e.target.value)}
        />
        <label htmlFor='Edition'>Edition:</label>
        <input
          type="text"
          placeholder="Edition"
          value={edition}
          onChange={(e) => setEdition(e.target.value)}
        />
        <label htmlFor='Shelf ID'>Shelf ID:</label>
        <input
          type="text"
          placeholder="Shelf ID"
          value={shelfId}
          onChange={(e) => setShelfId(e.target.value)}
        />
        <label htmlFor='Cover'>Cover:</label>
        <input type="file" accept="image/*" />
      
      <button type="Add Book">Add Book</button>
      </form>
  );
};

export default Book;