const mongoose = require('mongoose');

const ForgotPasswordSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    otp:{
        type:Number,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:180
    }
});

module.exports = mongoose.model('ForgotPassword', ForgotPasswordSchema);