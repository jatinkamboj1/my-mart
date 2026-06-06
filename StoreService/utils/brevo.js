import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});
console.log(
  "BREVO_API_KEY:",
  process.env.BREVO_API_KEY
);
console.log(
  "USER_EMAIL:",
  process.env.USER_EMAIL
);
console.log(
  "USER_Name:",
  process.env.USER_Name
);
export const sendEmail = async ({subject, email, body}) => {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        email: process.env.USER_EMAIL,
        name: process.env.USER_Name,
      },
      to: [{ email: email }],
      subject,
      htmlContent: body,
    });

    return result;
  } catch (error) {
    console.error("Brevo Error:", error.response?.body || error);
    throw error;
  }
};