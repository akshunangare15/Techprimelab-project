// ListOfProjects.jsx
import React, { useState, useEffect } from 'react';
import './project-list.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/projects/getALLprojects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error('Failed to fetch projects:', response.status);
        }
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects-container">
      <h2>Project Listing</h2>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button className="search-button">Search</button>
      </div>

      <div className="table-container">
        <table className="project-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Reason</th>
              <th>Type</th>
              <th>Division</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Department</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.projectName}</td>
                <td>{project.reason}</td>
                <td>{project.type}</td>
                <td>{project.division}</td>
                <td>{project.category}</td>
                <td>{project.priority}</td>
                <td>{project.department}</td>
                <td>{project.location}</td>
                <td>{project.projectStatus}</td>
                <td>
                  <button className="start-button">Start</button>
                  <button className="close-button">Close</button>
                  <button className="cancel-button">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
