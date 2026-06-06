// import { BrevoClient } from '@getbrevo/brevo';

// const brevo = new BrevoClient({
//   apiKey: process.env.BREVO_API_KEY,
// });
// console.log(
//   "BREVO_API_KEY:",
//   process.env.BREVO_API_KEY
// );
// console.log(
//   "USER_EMAIL:",
//   process.env.USER_EMAIL
// );
// console.log(
//   "USER_Name:",
//   process.env.USER_Name
// );
// export const sendEmail = async ({subject, email, body}) => {
//   try {
//     const result = await brevo.transactionalEmails.sendTransacEmail({
//       sender: {
//         email: process.env.USER_EMAIL,
//         name: process.env.USER_Name,
//       },
//       to: [{ email: email }],
//       subject,
//       htmlContent: body,
//     });

//     return result;
//   } catch (error) {
//     console.error("Brevo Error:", error.response?.body || error);
//     throw error;
//   }
// };
import nodemailer from "nodemailer";

console.log(
  "BREVO_SMTP_HOST:",
  process.env.BREVO_SMTP_HOST
);

console.log(
  "BREVO_SMTP_PORT:",
  process.env.BREVO_SMTP_PORT
);

console.log(
  "BREVO_SMTP_LOGIN:",
  process.env.BREVO_SMTP_LOGIN
);

console.log(
  "BREVO_API_KEY Exists:",
  !!process.env.BREVO_API_KEY
);

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false, // port 587 => false
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_API_KEY, // xsmtpsib key yaha use hogi
  },
});

export const sendEmail = async ({
  subject,
  email,
  body,
}) => {
  try {
    console.log("Sending email to:", email);

    // SMTP verify
    await transporter.verify();
    console.log("SMTP Connected Successfully");

    const info = await transporter.sendMail({
      from: `"MyKart" <sales.codebiceps@gmail.com>`,
      to: email,
      subject,
      html: body,
    });

    console.log(
      "Email sent successfully:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.error(
      "Email sending failed FULL:",
      error
    );

    throw error;
  }
};