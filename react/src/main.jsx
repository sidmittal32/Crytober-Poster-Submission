import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Footer from './components/footer';
import SubmitSuccess from './submitsuccess'; // Import the SubmitSuccess component

import './index.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/submitsuccess" element={<SubmitSuccess />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
