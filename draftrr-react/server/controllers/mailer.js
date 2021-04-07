var nodemailer = require('nodemailer');
require('dotenv').config()

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    ignoreTLS: false,
    secure: false,
  auth: {
    user: 'draftrrservice@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  }
});



const sendEmail = (req, res) => {

    transporter.sendMail(req.body, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
  }


  module.exports = {
    sendEmail
  }