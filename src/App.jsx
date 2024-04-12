import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Book from "./components/Book";
import Display from './components/DisplayBooks';
import UserCard from "./components/Usercard";
function App(){
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/book" element={<Book />}/>
        <Route path='/' element={<Display />}/>
        <Route path='/user' element={<UserCard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
