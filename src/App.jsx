import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Book from "./components/Book";
import Display from './components/DisplayBooks';
import UserCard from "./components/Usercard";
import { UserProvider } from "./context/UserContext";
import Home from "./components/Home";
import QrReader from "./components/QrReader";

function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          <Route path='/display' element={<Display />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book" element={<Book />} />
            <Route path='/user' element={<UserCard />} />
            <Route path="/qrread" element= {<QrReader />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
};

export default App;
