    const express = require("express");
    const Login = require('./models/User');
    const Project = require('./models/Projects'); 

    const mongoose = require("mongoose");
    const app = express();
    const bodyParser = require("body-parser");
    const jsonParser = bodyParser.json();
    const cors = require('cors');
    const Projects = require("./models/Projects");
    app.use(cors());
  
  //connect nodejs to mongodb
  mongoose.connect("mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false")
  .then(()=>{
      console.log("Connected")
  })
  .catch(()=>{
      console.log("Try again")
  })

 app.post("/api/login", jsonParser, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("User email and password are required");
    }

    // Check if the user with the provided email exists
    const existingUser = await Login.findOne({ email: email });

    if (existingUser) {
      // Compare passwords
      if (existingUser.password !== password) {
        throw new Error("Invalid password");
      }

      res.json("Login successful!");
    } else {
      // Create a new user
      const newUser = new Login({
        email: email,
        password: password,
      });

      await newUser.save();
      res.json("User registered and logged in!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


   // Insert new project API
app.post('/api/projects/addproject', jsonParser, (req, res) => {
    const data = new Project({
        _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for the _id field
        projectName: req.body.projectName,
        reason: req.body.reason,
        type: req.body.type,
        division: req.body.division,
        category: req.body.category,
        priority: req.body.priority,
        department: req.body.department,
        location: req.body.location,
        projectStatus: req.body.projectStatus
    });

    data.save()
        .then((result) => {
            res.json("Saved Successfully!!");
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

    //Total projects API
    app.get('/api/projects/getALLprojects',(req,res)=>{
        Project.find({}).then((data)=>{
            res.status(200).json(data)
        })
    });  
   
    // Update project status API
   app.put('/api/projects/update/:projectId', jsonParser, async (req, res) => {
    try {
      const projectId = req.params.projectId;

        // Log the received projectId for debugging
        console.log('Received projectId:', projectId);

        // Ensure projectId is a valid ObjectId before querying the database
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ error: 'Invalid projectId format' });
        }
        const updatedFields = req.body;
        const project = await Project.findByIdAndUpdate(projectId, updatedFields, { new: true });
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        // Log the updated project for debugging
        console.log('Updated Project:', project);

        res.json({ message: "Updated successfully", updatedProject: project });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


    
  
  app.listen(3000);

