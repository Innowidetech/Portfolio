const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    name:{
        type:String,
        required:true,
    },
    skills:[{
        type:String,
        required:true,
    }],
    bio:{
        type:String,
        required:true,
    },
    profilePhoto:{
        type:String,
        required:true,
    },
    hackerRank:{
        type:String,
    },
    leetCode:{
        type:String,
    },
    codeChef:{
        type:String,
    },
    resume:{
        type:String,
    },
    github:{
        type:String,
    },
    email:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    geeksforgeeks:{
        type:String,
    },
    aboutMe:{
        type:String,
        required:true,
    },
    data:[
        {
            title:String,
            description:String
        }
    ],
    experienceYears:{
        type:Number,
        required:true,
        default:0
    },
    completedProjects:{
        type:Number,
        required:true,
        default:0
    },
    clients:{
        type:Number,
        required:true,
        default:0
    },
    reviews:{
        type:Number,
        required:true,
        default:0
    },
    // experienceMonths:{
    //     type:Number,
    //     required:true
    // },
    mobileNumber:{
        type:Number,
        required:true
    },
    whatsappNumber:{
        type:Number,
        required:true
    },
    telegram:{
        type:String,
        required:true,
    },
    
},{timestamps:true});

module.exports = mongoose.model('Profile', ProfileSchema);