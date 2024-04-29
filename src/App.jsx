import React from "react";
import { UserProvider } from "./context/UserContext"; // Import the UserProvider context
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Book from "./components/Book"; // Import the Book component
import Display from './components/DisplayBooks'; // Import the DisplayBooks component
import UserCard from "./components/Usercard"; // Import the Usercard component
import Scanner from "./components/Scanner"; // Import the Scanner component

function App() {
  return (
    <div>
      {/* UserProvider wraps the entire app to provide user context */}
      <UserProvider>
        <BrowserRouter>
          <Routes>
            {/* Define routes for different components */}
            <Route path='/' element={<Display />} /> {/* Display books */}
            <Route path="/book" element={<Book />} /> {/* Book details */}
            <Route path='/user' element={<UserCard />} /> {/* User profile */}
            <Route path="/scanner" element={<Scanner />} /> {/* QR code scanner */}
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
};

export default App;
