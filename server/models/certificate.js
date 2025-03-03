const mongoose = require('mongoose');
const CertificateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    issuedBy: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
},{timestamps:true});

module.exports = mongoose.model('Certificate', CertificateSchema);