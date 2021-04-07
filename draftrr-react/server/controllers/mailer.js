var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    ignoreTLS: false,
    secure: false,
  auth: {
    user: 'rockman4447@gmail.com ',
    pass: 'Cr*cker08'
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