import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';

/*
====================================
DASHBOARD PATH IS A TEMP PLACEHOLDER
====================================
*/


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dashboard/:username" element={<Dashboard />}></Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
