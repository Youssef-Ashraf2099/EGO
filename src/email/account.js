const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const nodemailer=require("nodemailer")
//store otp to be later compared
const otpStore = new Map();

function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,        
      pass: process.env.EMAIL_PASS,   
    }
  });

  const sendOtpEmail=(email,otp)=>{
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'forgot password',
        text:`otp code is: ${otp}`
    }
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email is sent ' + info.response)
        }
    })

  }

  const forgotpassword=(email)=>{
    const otp=generateOtp()
    otpStore.set(email,otp)
    sendOtpEmail(email,otp)

    //expiration time for otp=5 min
    setTimeout(() => otpStore.delete(email), 5 * 60 * 1000);
}

//verify entered otp is the same as send otp
const verify=(email,otp)=>{
    const storedOtp=otpStore.get(email)
    if(storedOtp==otp){
        otpStore.delete(email)
        return true;
    }
    return false
}


module.exports={
    forgotpassword,
    verify
}