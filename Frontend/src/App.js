// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/dashboard.jsx';
import CreateProject from './components/CreateProject/create-project.jsx';
import ProjectList from './components/ProjectList/project-list.jsx';
import Sidebar from './components/Sidebar/sidebar.jsx';
import './App.css';

const App = () => {
  useEffect(() => {
    // Check user authentication logic remains the same
  }, []);

  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  return (
    <div className="app">
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
        
      ) : (
        <Router>
          <Sidebar />
          <Routes>
            {/* <Route path= "/login" element ={<Login/>}/> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/project-list" element={<ProjectList />} />
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
