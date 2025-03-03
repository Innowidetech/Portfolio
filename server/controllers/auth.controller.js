const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail } = require('../utils/sendEmail');
const ForgotPassword = require('../models/forgotPassword');
const generateOtpTemplate = require('../utils/otpTemplate');
require('dotenv').config();
const {addRevokedToken} = require('../utils/tokenRevocation');


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) { return res.status(400).json({ message: 'Provide email and password to login.' }) }

        const user = await User.findOne({ email })
        if (!user) { return res.status(404).json({ message: "User not found with the email." }) }

        let validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) { return res.status(403).json({ message: "Incorrect password." }) }

        const token = jwt.sign({userId: user._id, email}, process.env.JWT_SECRET);

        res.status(200).json({message:"Login success", token})
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message })
    }
};


// exports.registration = async(req,res)=>{
//     try{
//         const {email, password} = req.body;
//         if(!email || !password){ return res.status(400).json({message:'Provide email and password to register.'})}

//         hpass = bcrypt.hashSync(password,10)

//         let newUser = await User.findOne({email})
//         if(newUser){return res.status(403).json({message:"User with the email already exist."})}

//         let users = await User.find()
//         if(users.length >= 1){ return res.status(403).json({message:'More than 1 user cannot register.'})}

//         newUser = new User({
//                 email, password:hpass
//             });
//         await newUser.save()
//         return res.status(201).json({message:"Registration success."})
//         }
//     catch(err) {
//         return res.status(500).json({message:'Internal server error.', error:err.message})
//     }
// };


exports.forgotPassword = async (req, res) => {
    try {
        const {email} = req.body;
        if(!email){return res.status(400).json({message:"Please enter email id."})}

        const user = await User.findOne({email});
        if(!user){return res.status(404).json({message:"Please enter valid email."})}

        const otp = crypto.randomInt(100000,999999)
        await ForgotPassword.create({email,otp})

        await sendEmail(email, process.env.EMAIL_ID, 'Password Reset - Portfolio', generateOtpTemplate(otp));
        res.status(201).json({message:"OTP sent to email, it will expires in 3 minutes."})
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message })
    }
};


exports.resetPassword = async(req,res)=>{
    try{
        const {email, otp, newPassword} = req.body;
        if(!otp || !newPassword){return res.status(400).json({message:"OTP or new password is missing."})}

        const user = await User.findOne({email})
        if(!user){return res.status(404).json({message:"User not found with the email."})}

        const request = await ForgotPassword.findOne({email, otp})
        if(!request){ return res.status(404).json({message:"Invalid OTP or email."})}

        hpass = bcrypt.hashSync(newPassword, 10);

        user.password = hpass
        await user.save();

        await ForgotPassword.deleteOne({email, otp});

        res.status(201).json({message:"Password reset successfully."})
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message })
    }
};


exports.logout = async(req,res)=>{
    try{
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(400).json({ message: 'No token provided.' });
      }

      addRevokedToken(token);
      
      res.status(200).json({ message: 'Logout successful.' }); 
    }
    catch (error) {
      res.status(500).json({ message: 'Logout failed', error: error.message });
    }
  };