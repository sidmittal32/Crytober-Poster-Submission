import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Rules from './rules'
import Footer from './components/footer';
import NavBar from './components/navbar';

import './index.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
