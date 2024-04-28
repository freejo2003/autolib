import { useUser } from "../context/UserContext";
import "./Usercard.css";
import Header from "./Header";
import QRCode from "qrcode.react";
import { useState, useEffect } from "react";
import { dataRef } from "../firebaseConfig";

const UserCard = () => {
  const { user } = useUser();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (user) {
      const booksRef = dataRef.ref("books");
      booksRef.orderByChild("takenBy").equalTo(user.email).on("value", (snapshot) => {
        const booksData = snapshot.val();
        if (booksData) {
          const booksArray = Object.keys(booksData).map((key) => ({
            ...booksData[key],
            id: key,
          }));
          setBooks(booksArray);
        } else {
          setBooks([]);
        }
      });
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-card">
      <Header />
      <h2>{user.displayName}</h2>
      <p>ID: {user.email}</p>
      <div className="qr-code">
        <QRCode value={user.email} />
      </div>

      <h3>List of allotted Books:</h3>
      {books.length > 0 ? (
        <table className="user-card table">
          <thead>
            <tr>
              <th>Name of Book</th>
              <th>Book edition</th>
              <th>Book publication</th>
              <th>Author name</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.bookName}</td>
                <td>{book.edition}</td>
                <td>{book.publication}</td>
                <td>{book.authorName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
};

export default UserCard;
