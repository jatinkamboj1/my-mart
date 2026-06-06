const { sendEmail } = require("../brevo");
const { otpMailTemplate, invoiceMailTemplate } = require("./templates");

// Send OTP to EMAIL
async function sendEmailOTP(email, otp) {
  try {
  const {subject, body} = otpMailTemplate({otp});
  const mail = await sendEmail({
    subject,
    body,
    email
  })
  if (mail.messageId) {
    return otp;
  }
  } catch (error) {
    throw new Error(error?.message || "Not able to send email");
  }
};

const sendEmailInvoice = async (email, order) => {
  try {
  const {subject, body} = invoiceMailTemplate({order});
  const mail = await sendEmail({
    subject,
    body,
    email
  })
  if (mail.messageId) {
    return order;
  }
  } catch (error) {
    throw new Error(error?.message || "Not able to send email");
  }
};

async function sendDispatchEmail(email, order, trackingNumber) {
  try {
    const { subject, body } = dispatchMailTemplate({ order, trackingNumber });

    const mail = await sendEmail({
      subject,
      body,
      email
    });

    return mail?.messageId;
  } catch (error) {
    console.error("Dispatch email failed:", error);
  }
}

async function sendDeliveredEmail(email, order) {
  try {
    const { subject, body } = deliveredMailTemplate({ order });

    const mail = await sendEmail({
      subject,
      body,
      email
    });

    return mail?.messageId;
  } catch (error) {
    console.error("Delivery email failed:", error);
  }
}

module.exports = {
  sendEmailOTP,
  sendEmailInvoice,
sendDispatchEmail,
sendDeliveredEmail
};