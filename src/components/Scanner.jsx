import React, { useState, useEffect } from "react";
import { dataRef } from "../firebaseConfig";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useMediaQuery } from 'react-responsive';
import "./Scanner.css";
import Header from './Header';
const BookAvailabilityMonitor = () => {
  const [email, setEmail] = useState(null);
  const [prevResult, setPrevResult] = useState(null);
  const [books, setBooks] = useState([]);
  const isMobileDevice = useMediaQuery({ query: "(max-width: 767px)" }); // Adjusted for mobile devices
  const isTabletOrLargerDevice = useMediaQuery({ query: "(min-width: 768px)" }); // Adjusted for tablets and larger devices
  useEffect(() => {
    const fetchData = async () => {
      try {
        const scanner = new Html5QrcodeScanner("reader", {
          qrbox: {//display QRcode
            width: isMobileDevice ? 200 : 250,
            height: isMobileDevice ? 200 : 250,
          },
          fps: 5,
        });
        scanner.render(success);
        function success(result) {//when qr code read success
          scanner.clear();
          setPrevResult(result);
          if (email === null) {
            setEmail(result);
          }
          servo(1);//turn servo motor
        }
        const booksRef = dataRef.ref("books");//fetch data from database
        booksRef.on("value", (snapshot) => {
          const booksData = snapshot.val();
          if (booksData) {
            const booksArray = Object.keys(booksData).map((key) => ({
              id: key,
              ...booksData[key],
            }));
            setBooks(booksArray);//line 40-46 is for checking if the book is available or not
            for (const book of booksArray) {
              const bookRef = booksRef.child(book.id);
              bookRef.child("availability").on("value", async (snapshot) => {
                const availability = snapshot.val();
                const bookSnapshot = await bookRef.once("value");
                const bookData = bookSnapshot.val();
                if (!availability && !bookData.takenBy && email !== null) 
                {//line 47-51 is for making the entry of the books 
                  await bookRef.update({ takenBy: email });
                } else if (bookData.takenBy && availability && email !== null) 
                {
                  await bookRef.update({ takenBy: "" });
                }
              });
            }
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      // Cleanup
    };
  }, [email, isMobileDevice]);
  function servo(status) {
    const url = `http://192.168.109.154/servo=${status}`;//connecting to esp module
    fetch(url)
      .then((response) => {
        if (response.status === 200) {//check if connection is made or not
          console.log("Request sent successfully to device");
        } else {
          console.error("Failed to send request to device");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const handleLogout = () => {
    setPrevResult(null);
    setEmail(null);
    servo(0);
  };
  return (//web page line 84-109
    <div>
      <Header />
    <div className="container">
      <div className={`scanner-container ${isMobileDevice ? 'mobile' : 'desktop'}`}>
        <h2 className="title">Scan your QR code</h2>
        <div id="reader" className="qrcode-reader"></div>
      </div>
      <div className={`details-container ${isMobileDevice ? 'mobile' : 'desktop'}`}>
        <p className="account">Account: {email}</p>
        <h3 className="books-taken">Books taken:</h3>
        <ul className="books-list">
          {books
            .filter((book) => book.takenBy === email)
            .map((book) => (
              <li key={book.id} className="book-item">
                {book.bookName}
              </li>
            ))}
        </ul>
        <button  className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
    </div>
  );
};
export default BookAvailabilityMonitor;