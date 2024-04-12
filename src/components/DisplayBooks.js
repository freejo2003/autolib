import React from 'react';
import data from './data.json'; // Importing data from data.json

const DisplayBooks = () => {
  // Extracting the 'books' array from the imported JSON data
  const { books } = data;

  // Shuffle the books array
  const shuffledBooks = books.sort(() => Math.random() - 0.5);
  // Select the first 10 books
  const randomBooks = shuffledBooks.slice(0, 10);

  return (
    <div>
      <h1>Books Available</h1>
      <ul>
        {/* Mapping through the randomBooks array and displaying each book */}
        {randomBooks.map((book, index) => (
          <li key={index}>
            <h2>{book.bookName}</h2>
            <p><strong>Author:</strong> {book.authorName}</p>
            <p><strong>Publication:</strong> {book.publication}</p>
            <p><strong>Edition:</strong> {book.edition}</p>
            <p><strong>Shelf ID:</strong> {book.shelfID}</p>
            <p><strong>Published Year:</strong> {book.publishedYear}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayBooks;
