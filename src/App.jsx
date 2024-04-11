import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Book from "./components/Book";
function App(){
  return (
    <div>
      <BrowserRouter>
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
