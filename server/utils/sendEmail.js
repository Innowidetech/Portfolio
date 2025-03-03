const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSKEY,
    },
  });

exports.sendEmail = async(to, replyTo, subject, htmlContent)=>{
    const mailOptions = {
        from:process.env.EMAIL_ID,
        to,
        replyTo,
        subject,
        html:htmlContent
    };
    await transporter.sendMail(mailOptions)
};

