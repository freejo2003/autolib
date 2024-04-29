import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import {dataRef} from "../firebaseConfig";
import './Book.css';

const Book = () => {
  const navigate = useNavigate();
  const [serialNo, setSerialNo] = useState('');
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [publication, setPublication] = useState('');
  const [edition, setEdition] = useState('');
  
  const [shelfId, setShelfId] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      serialNo,
      bookName,
      authorName,
      publication,
      edition,
      shelfId,
      availability:true,
      takenBy:""
    };
const bookId=serialNo.replace(/\\s/g,"number");
    try {
      const newReminderRef = dataRef.ref("books").child(bookId);
        await newReminderRef.set(bookData);
      alert("Book successfully added!");
      setSerialNo("");
      setBookName("");      
      setAuthorName("");
      setEdition("");
      setPublication("");
      setShelfId("");
      navigate("/display");
    } 
    catch (error) {
      console.error("Error adding book:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
       <Header />
    
      <h1>SHELF 101</h1>
      <label htmlFor='Serial No'>Serial No.:</label>
        <input
          type="number"
          placeholder="Serial No"
          value={serialNo}
          onChange={(e) => setSerialNo(e.target.value)}
        />
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
      <button type="submit">Add Book</button>
      </form>
  );
};
export default Book;