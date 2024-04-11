import React, { useState } from 'react';

const Book = () => {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [publication, setPublication] = useState('');
  const [edition, setEdition] = useState('');
  const [shelfId, setShelfId] = useState('');

 const handleAddBook = () => {
    // Implement logic to add the book to the database
    // You can use APIs or Firebase Realtime Database here

    // Reset input fields
    setBookName('');
    setAuthorName('');
    setPublication('');
    setEdition('');
    setShelfId('');
  };

  return (
    <div className="library-app">
      <h1>Library Management System</h1>
      <div className="input-fields">
        <input
          type="text"
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Publication"
          value={publication}
          onChange={(e) => setPublication(e.target.value)}
        />
        <input
          type="text"
          placeholder="Edition"
          value={edition}
          onChange={(e) => setEdition(e.target.value)}
        />
        <input
          type="text"
          placeholder="Shelf ID"
          value={shelfId}
          onChange={(e) => setShelfId(e.target.value)}
        />
        <input type="file" accept="image/*" />
      </div>
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
};

export default Book;