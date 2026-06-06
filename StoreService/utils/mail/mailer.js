const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

// const transporter = nodemailer.createTransport({
//   host: "mail.yourdomain.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.USER_EMAIL,
//     pass: process.env.USER_PASS
//   },
//   tls: {
//     minVersion: "TLSv1.2",
//     rejectUnauthorized: false
//   }
// });

async function sendMail({subject, email, body}) {
    try {
        const mailOptions = {
          from: process.env.USER_EMAIL,
          to: email,
          subject: subject,
          html: body,
        };
        await transporter.sendMail(mailOptions);
        return {success: true, error: null};
    } catch (error) {
        console.error(error);
        return {success: false, error: error};
    }
}

module.exports = { sendMail };