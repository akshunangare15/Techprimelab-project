// Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Sidebar/sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const closeSidebar = () => {
    setCollapsed(true);
  };

  return (
    <>
      <button type="button" className={`toggle ${collapsed ? '' : 'collapsed'}`} id="toggle" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`sidebar ${collapsed ? '' : 'sidebarshow'}`} id="sidebar" onClick={closeSidebar}>
        <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/create-project">Create Project</Link>
        </li>
        <li>
          <Link to="/project-list">Project List</Link>
        </li>
      </ul>
      </div>
    </>
  );
};

export default Sidebar;
