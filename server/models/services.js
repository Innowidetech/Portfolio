const mongoose = require('mongoose');
const ServicesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description1: {
        type: String,
        required: true
    },
    description2: {
        type: String,
        required: true
    },
    skills:[{
        type:String,
        required:true,
    }],
},{timestamps:true});

module.exports = mongoose.model('Services', ServicesSchema);