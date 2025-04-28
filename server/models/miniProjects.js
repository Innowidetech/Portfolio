const mongoose = require('mongoose');
const MiniProjectsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    title:{
        type:String,
        require:true,
    },
    githubUrl:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    projectUrl:{
        type:String,
        require: true,
    },
    skills:[{
        type:String,
        require:true,
    }],
},{timestamps:true});

module.exports = mongoose.model('MiniProjects', MiniProjectsSchema);