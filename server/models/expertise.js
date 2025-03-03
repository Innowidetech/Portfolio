const mongoose = require('mongoose');
const ExpertiseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    skills:[{
        title:{
            type:String,
            required:true
        },
        icon:{
            type:String,
            required:true
        },
        percentage:{
            type:Number,
            required:true
        },
    }]
},{timestamps:true});

module.exports = mongoose.model('Expertise', ExpertiseSchema);