const { BrevoClient } = require("@getbrevo/brevo");

const getBrevoClient = () => {
  const apiKey =
    process.env.BREVO_API_KEY || process.env.BREVO_SMTP_KEY;

  if (!apiKey) {
    throw new Error("Missing Brevo API key");
  }

  return new BrevoClient({ apiKey });
};

const sendEmail = async ({ subject, email, body }) => {
  const brevo = getBrevoClient();

  try {
    return await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        email: process.env.USER_EMAIL || process.env.BREVO_EMAIL,
        name: process.env.USER_Name || "MY MART",
      },
      to: [{ email }],
      subject,
      htmlContent: body,
    });
  } catch (error) {
    console.error("Brevo Error:", error.response?.body || error);
    throw error;
  }
};

module.exports = {
  sendEmail,
};
