const mongoose = require('mongoose');
const EducationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    study: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
},{timestamps:true});

module.exports = mongoose.model('Education', EducationSchema);