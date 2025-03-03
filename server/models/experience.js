const mongoose = require('mongoose');
const ExperienceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    startYear: {
        type: String,
        required: true
    },
    endYear: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    description: [{
        type: String,
        required: true
    }],
},{timestamps:true});

module.exports = mongoose.model('Experience', ExperienceSchema);