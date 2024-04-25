import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Book from "./components/Book";
import Display from './components/DisplayBooks';
import UserCard from "./components/Usercard";
import { UserProvider } from "./context/UserContext";
function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<Display />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book" element={<Book />} />
            <Route path='/user' element={<UserCard />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
};

export default App;
