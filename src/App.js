import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Favorites from './pages/favorites';
import Details from './pages/details';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path = "/recipe-item/:id" element={<Details/>}/>
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
