import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Project/Navbar/Navbar';
import Home from './Project/Pages/Home';
import Cart from './Project/Pages/Cart';
import LoginSignUp from './Project/Pages/LoginSignUp';
import Footer from './Project/Footer/Footer';
import Women from './Project/Pages/Women';
import Men from './Project/Pages/Men';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/men' element={<Men />} />
          <Route path='/women' element={<Women />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignUp />} />
        </Routes>
        <br /><br /><Footer />
      </BrowserRouter>
    </div> 
  );
}

export default App;
