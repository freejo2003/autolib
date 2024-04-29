import React, { useState, useEffect } from "react";
import { dataRef } from "../firebaseConfig";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./Scanner.css";

const BookAvailabilityMonitor = () => {
  const [email, setEmail] = useState(null);
  const [prevResult, setPrevResult] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scanner = new Html5QrcodeScanner("reader", {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 5,
        });

        scanner.render(success);

        function success(result) {
          scanner.clear();
          setPrevResult(result);

          // Update email state only if it's not already set
          if (email === null) {
            setEmail(result);
          }

          servo(1);
        }

        const booksRef = dataRef.ref("books");
        booksRef.on("value", (snapshot) => {
          const booksData = snapshot.val();

          if (booksData) {
            const booksArray = Object.keys(booksData).map((key) => ({
              id: key,
              ...booksData[key],
            }));
            setBooks(booksArray);

            for (const book of booksArray) {
              const bookRef = booksRef.child(book.id);
              bookRef.child("availability").on("value", async (snapshot) => {
                const availability = snapshot.val();

                if (!availability && email !== null) {
                  // Update takenBy field only if the book is unavailable and email is set
                  await bookRef.update({ takenBy: email });
                } else if (availability && email !== null) {
                  // Clear takenBy field if the book becomes available and email is set
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
  }, [email]);

  function servo(status) {
    const url = `http://192.168.109.154/servo=${status}`;
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
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

  return (
    <div className="container">
      <div className="scanner-container">
        <h2 className="title">Scan your QR code</h2>
        <div id="reader" className="qrcode-reader"></div>
      </div>
      <div className="details-container">
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
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default BookAvailabilityMonitor;
