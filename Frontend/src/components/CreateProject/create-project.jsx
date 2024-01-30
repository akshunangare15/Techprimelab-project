// CreateProject.jsx
import React, { useState } from 'react';
import './create-project.css';

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    projectName: '',
    reason: '',
    type: '',
    division: '',
    category: '',
    priority: '',
    department: '',
    location: '',
    projectStatus: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/projects/addproject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData), // Fix the variable name here
      });

      if (response.ok) {
        console.log('Project saved successfully');

        // Fetch the updated list of projects after saving
        fetchProjectsList();

        // Clear form fields after successful submission
        setProjectData({
          projectName: '',
          reason: '',
          type: '',
          division: '',
          category: '',
          priority: '',
          department: '',
          location: '',
          projectStatus: '',

        });
       window.location.href = '/projectlist';
      } else {

        const data = await response.json();
        console.error('Failed to save project:', data.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

const fetchProjectsList = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/projects/getALLprojects');
    if (response.ok) {
      const data = await response.json();
      setProjectData(data); // Update the state with the fetched projects
    } else {
      console.error('Failed to fetch projects:', response.status);
    }
  } catch (error) {
    console.error('Error fetching projects:', error.message);
  }
};

  return (
   
      <div className="page">
        
      <h2>Add Project Details</h2>

      <input
        type="text"
        className="inputField"
        placeholder="Add Project"
        name="projectName"
        value={projectData.projectName}
        onChange={handleChange}
      />

      {/* Horizontal dropdowns */}
      <div className="horizontalDropdownContainer">
        {/* Reason */}
        <div>
          <label htmlFor="reason">Reason</label>
          <select name="reason" id="reason" onChange={handleChange} value={projectData.reason}>
            <option value="select"></option>
            <option value="Business">Business</option>
            <option value="Dealership">Dealership</option>
            <option value="Transport">Transport</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label htmlFor="type">Type</label>
          <select name="type" id="type" onChange={handleChange} value={projectData.type}>
            <option value="select"></option>
            <option value="Internal">Internal</option>
            <option value="External">External</option>
            <option value="Vendor">Vendor</option>
          </select>
        </div>

        {/* Division */}
        <div>
          <label htmlFor="division">Division</label>
          <select name="division" id="division" onChange={handleChange} value={projectData.division}>
            <option value="select"></option>
            <option value="Glass">Glass</option>
            <option value="Compressor">Internal</option>
            <option value="Filter">External</option>
            <option value="Pumps">Vendor</option>
            <option value="Pumps">Compressor</option>
            <option value="Water Heater">Water Heater</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category">Category</label>
          <select name="category" id="category" onChange={handleChange} value={projectData.category}>
            <option value="select"></option>
            <option value="Quality A">Quality A</option>
            <option value="Quality B">Quality B</option>
            <option value="Quality C">Quality C</option>
            <option value="Quality D">Quality D</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority">Priority</label>
          <select name="priority" id="priority" onChange={handleChange} value={projectData.priority}>
            <option value="select"></option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department">Department</label>
          <select name="department" id="department" onChange={handleChange} value={projectData.department}>
            <option value="select"></option>
            <option value="Strategy">Strategy</option>
            <option value="Finance">Finance</option>
            <option value="Quality">Quality</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Stores">Stores</option>
          </select>
        </div>

      <div>
        <label htmlFor="startDate">Start Date As Per Business Plan:</label>
        <input type="date" id="startDate" name="startDate"></input>
      </div>

      <div>
        <label htmlFor="EndDate">End Date As Per Business Plan:</label>
        <input type="date" id="EndDate" name="endDate"></input>
      </div>
        {/* Location */}
        <div>
          <label htmlFor="location">Location</label>
          <select name="location" id="location" onChange={handleChange} value={projectData.location}>
            <option value="select"></option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="projectStatus">Status</label>
          <select name="projectStatus" id="projectStatus" onChange={handleChange} value={projectData.projectStatus}>
            <option value="select"></option>
            <option value="Registered">Registered</option>
            <option value="Closed">Closed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <br />
      <br />
    <button className="saveButton" onClick={handleSubmit}>
        Save Project
      </button>
    </div>
   
  );
};

export default CreateProject;
