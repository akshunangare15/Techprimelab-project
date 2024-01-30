const mongoose = require("mongoose");
//Schema for Projects Collection
let projectSchema = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    projectName:String,
    reason:String,
    type:String,
    division:String,
    category:String,
    priority:String,
    department:String,
    location:String,
    projectStatus:String,
    
});

module.exports = mongoose.model('projects',projectSchema);
