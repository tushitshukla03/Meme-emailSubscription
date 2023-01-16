const nodemailer = require("nodemailer");



const dotenv = require('dotenv'); 

dotenv.config();

const mailOPtions = {
  from: process.env.MAIL_USER_EMAIL,
  to: process.env.MAIL_TO,
  subject: "Daily Top News..",
  html: "<h1>hello</h1>"

}



const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER_EMAIL,
            pass: process.env.MAIL_USER_PASSWORD
        },
    });

transporter.sendMail(mailOPtions,(error,info)=>{
  if (error) {
    console.log(error);
  } else {
    console.log("Email send:" + info.response);
        }
      });   



