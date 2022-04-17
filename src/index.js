import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { ImportImage } from './components/InsertImage';

import "tailwindcss/tailwind.css"
import { HomePage } from './components/HomePage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <LoginPage/> } />
        <Route path="/register" element={ <RegisterPage/> } />
        <Route path="/home" element={ <HomePage/> } />
        <Route path="/addDiary" element={ <ImportImage/> } />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
