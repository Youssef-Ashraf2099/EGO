const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const nodemailer=require("nodemailer")


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,        
      pass: process.env.EMAIL_PASS,   
    }
  });

  const forgotpassword=(email, name)=>{
   

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'forgot password',
        text:`hi`
    }
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email is sent ' + info.response);
        }
    });
}

forgotpassword("hamzaa098poi@gmail.com","hamza")