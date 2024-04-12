import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from './components/Login';
import Signup from './components/Signup';
import Book from "./components/Book";
function App(){
  return (
    <div>
      <BrowserRouter>
      <navbar />
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/book" element={<Book />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
