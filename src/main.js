const nodemailer = require("nodemailer");

require('dotenv').config()


(async function run() {
    console.log("Running ")
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER_EMAIL,
            pass: process.env.MAIL_USER_PASSWORD
        },
    });

    await transporter.sendMail({
        from: process.env.MAIL_USER_EMAIL,
        to: process.env.MAIL_TO,
        subject: 'Daily Top News',
        text: `
          Daily Top News 

        `,
        html: `
          <h1>Lodu</h1>
        `,
      });   
})();


