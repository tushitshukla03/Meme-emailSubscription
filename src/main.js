const nodemailer = require("nodemailer");
const axios = require("axios");

const dotenv = require('dotenv'); 
dotenv.config();

async function main() {
  const response = await axios.get("https://meme-api.com/gimme/dankmemes");
  const meme = response.data;

  const mailOptions = {
    from: process.env.MAIL_USER_EMAIL,
    to: process.env.MAIL_TO,
    subject: "Daily Top News..",
    html: `
      <div>
        <h1>Top Meme</h1>
        <img src="${meme.url}" />
      </div>
    `
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER_EMAIL,
      pass: process.env.MAIL_USER_PASSWORD
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

main();




