// dashboard.jsx
import React, { useState, useEffect } from 'react';
import './dashboard.css'; // Import your CSS file
import ProjectList from '../ProjectList/project-list.jsx';

const Dashboard = () => {
  const [projectCounts, setProjectCounts] = useState({
    registered: 0,
    closed: 0,
    running: 0,
    closureDelay: 0,
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch project data to get counts
    fetchProjectCounts();
  }, []);

  const fetchProjectCounts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/projects/getALLprojects');
      if (response.ok) {
        const projects = await response.json();
        const counts = {
          registered: projects.filter((project) => project.projectStatus === 'Registered').length,
          closed: projects.filter((project) => project.projectStatus === 'Closed').length,
          running: projects.filter((project) => project.projectStatus === 'Running').length,
          closureDelay: projects.filter((project) => project.projectStatus === 'Closure Delay').length,
        };
        setProjectCounts(counts);
      } else {
        console.error('Failed to fetch projects:', response.status);
      }
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {/* Cards */}
      <div className="card-container">
        <div className="card registered">
          <h3>Registered</h3>
          {isLoading ? <p>Loading...</p> : <p>{projectCounts.registered}</p>}
        </div>

        <div className="card closed">
          <h3>Closed</h3>
          {isLoading ? <p>Loading...</p> : <p>{projectCounts.closed}</p>}
        </div>

        <div className="card running">
          <h3>Running</h3>
          {isLoading ? <p>Loading...</p> : <p>{projectCounts.running}</p>}
        </div>

        <div className="card closure-delay">
          <h3>Closure Delay</h3>
          {isLoading ? <p>Loading...</p> : <p>{projectCounts.closureDelay}</p>}
        </div>
      </div>

      {/* Graph */}
      <div className="graph-container">
        <br></br>
        <h2>Project Plan Vs Actual</h2>
        {/* Add your graph/chart component here */}
        {/* Example: <BarChart data={yourData} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
