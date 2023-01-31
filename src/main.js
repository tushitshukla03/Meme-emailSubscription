const nodemailer = require("nodemailer");
const fetch = require("node-fetch");

const dotenv = require('dotenv'); 

dotenv.config();

const recipients = process.env.MAIL_TO.split(" "); // recipients are stored as a comma-separated string in .env file

const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER_EMAIL,
            pass: process.env.MAIL_USER_PASSWORD
        },
    });

const generateEmailHTML = async (meme) => {
  return `
  <html>
    <body>
      <h1>Top Meme of the Day</h1>
      <img src="${meme.url}" alt="${meme.title}" />
      <p>${meme.title}</p>
    </body>
  </html>
  `;
}

const sendEmails = async (transporter, recipients, emailHTML) => {
  for (const recipient of recipients) {
    const mailOptions = {
      from: process.env.MAIL_USER_EMAIL,
      to: recipient,
      subject: "Daily Top News..",
      html: emailHTML
    };
  
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Email sent to ${recipient}: ${info.response}`);
      }
    });
  }
}

(async () => {
  const response = await fetch("https://meme-api.com/gimme/dankmemes");
  const meme = await response.json();
  const emailHTML = await generateEmailHTML(meme);
  await sendEmails(transporter, recipients, emailHTML);
})();



