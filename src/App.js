import logo from './logo.svg';
import './App.css';
import './components/Date.js';
import React, { useState, useEffect } from 'react';
import Date from './components/Date.js';
import DisplayRecipe from './components/DisplayRecipe.js'
import LoginButton from './components/LoginButton';

function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        <LoginButton className='login-button' />
        <DisplayRecipe />
        <Date />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
      </header>
    </div>
  );
}

export default App;
