function otpMailTemplate({otp}) {
    return {
        subject: "Your OTP for MY MART",
        body:`
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://stage.shippingmart.co.uk/logo.png" alt="MY MART" style="width: 150px;"/>
          </div>
          <h2 style="color: #bb0100; text-align: center;">Your OTP Code</h2>
          <p style="font-size: 16px; color: #333; text-align: center;">
            Thank you for choosing <strong>MY MART</strong>. To continue with your secure transaction, please use the OTP below:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #bb0100; padding: 10px 20px; border: 1px dashed #bb0100; border-radius: 8px;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 14px; color: #555; text-align: center;">
            This OTP is valid for the next <strong>5 minutes</strong>. Please do not share it with anyone for security reasons.
          </p>

        </div>
      </div>
    `};
}

function invoiceMailTemplate({ order }) {
  const {
    orderNumber,
    orderDate,
    userName,
    mobileNumber,
    products = [],
    summary = {},
    shippingStreet,
    shippingCity,
    shippingState,
    shippingCountry,
    shippingZip,
    billingStreet,
    billingCity,
    billingState,
    billingCountry,
    billingZip,
    paymentType,
    status,
    customerRemarks,
  } = order;

  const formattedDate = new Date(orderDate).toLocaleDateString("en-GB");

  const productRows = products
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong><br/>
          <span style="font-size: 13px; color: #777;">
            Quantity: ${item.quantity}
          </span>
        </td>
        <td style="text-align: right; border-bottom: 1px solid #eee;">
          £${Number(item.price).toFixed(2)}
        </td>
      </tr>
    `
    )
    .join("");

  const discountRows =
    summary?.Coupons?.length > 0
      ? summary.Coupons.map(
          (c) => `
        <tr>
          <td style="padding: 6px 0; color: #777;">
            Discount (${c.code})
          </td>
          <td style="text-align:right; color:#bb0100;">
            - £${Number(c.amount).toFixed(2)}
          </td>
        </tr>
      `
        ).join("")
      : "";

  const chargesRows =
    summary?.Charges?.length > 0
      ? summary.Charges.map(
          (c) => `
        <tr>
          <td style="padding: 6px 0; color:#777;">
            ${c.name}
          </td>
          <td style="text-align:right;">
            £${Number(c.amount).toFixed(2)}
          </td>
        </tr>
      `
        ).join("")
      : "";

  return {
    subject: `Invoice for Order #${orderNumber} - MY MART`,
    body: `
    <div style="font-family: Arial, sans-serif; background-color:#f5f5f5; padding:20px;">
      <div style="max-width:650px; margin:0 auto; background:#ffffff; padding:30px; border-radius:8px;">

        <!-- Logo -->
        <div style="text-align:center; margin-bottom:20px;">
          <img src="https://stage.shippingmart.co.uk/logo.png" alt="MY MART" style="width:150px;" />
        </div>

        <!-- Header -->
        <h2 style="color:#bb0100; text-align:center; margin-bottom:5px;">
          Invoice
        </h2>
        <p style="text-align:center; color:#555;">
          Thank you for your purchase, <strong>${userName}</strong>
        </p>

        <!-- Order Info -->
        <div style="margin-top:20px; font-size:14px; color:#555;">
          <p><strong>Order Number:</strong> #${orderNumber}</p>
          <p><strong>Order Date:</strong> ${formattedDate}</p>
          <p><strong>Status:</strong> ${status}</p>
          <p><strong>Payment Type:</strong> ${paymentType}</p>
        </div>

        <!-- Products Table -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
          ${productRows}
        </table>

        <!-- Summary -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px; font-size:14px;">
          <tr>
            <td style="padding:6px 0;">Sub Total</td>
            <td style="text-align:right;">
              £${Number(summary["Sub Total"] || 0).toFixed(2)}
            </td>
          </tr>

          ${discountRows}

          <tr>
            <td style="padding:6px 0;">Delivery Charges</td>
            <td style="text-align:right;">
              ${
                Number(summary["Delivery Charges"]) === 0
                  ? "FREE"
                  : `£${Number(summary["Delivery Charges"] || 0).toFixed(2)}`
              }
            </td>
          </tr>

          ${chargesRows}

          <tr>
            <td style="padding-top:10px; font-weight:bold; font-size:16px;">
              Total Amount
            </td>
            <td style="text-align:right; font-weight:bold; font-size:16px;">
              £${Number(summary["Total Amount"] || 0).toFixed(2)}
            </td>
          </tr>
        </table>

        <!-- Shipping Address -->
        <div style="margin-top:30px; font-size:14px; color:#555;">
          <h4 style="margin-bottom:5px;">Shipping Address</h4>
          <p>
            ${userName}<br/>
            ${shippingStreet}<br/>
            ${shippingCity}, ${shippingState}<br/>
            ${shippingCountry} - ${shippingZip}<br/>
            Ph: ${mobileNumber}
          </p>
        </div>

        <!-- Billing Address -->
        <div style="margin-top:20px; font-size:14px; color:#555;">
          <h4 style="margin-bottom:5px;">Billing Address</h4>
          <p>
            ${userName}<br/>
            ${billingStreet}<br/>
            ${billingCity}, ${billingState}<br/>
            ${billingCountry} - ${billingZip}
          </p>
        </div>

        ${
          customerRemarks
            ? `
          <div style="margin-top:20px;">
            <h4>Customer Notes</h4>
            <p style="background:#f9f9f9; padding:10px; border-radius:6px;">
              ${customerRemarks}
            </p>
          </div>
        `
            : ""
        }

        <!-- Footer -->
        <div style="margin-top:30px; text-align:center; font-size:13px; color:#777;">
          <p>
            If you have any questions, contact us at 
            <strong>support@mymarts.co.uk</strong>
          </p>
          <p>© ${new Date().getFullYear()} MY MART. All rights reserved.</p>
        </div>

      </div>
    </div>
    `,
  };
}

function dispatchMailTemplate({ order, trackingNumber }) {
  const { orderNumber, userName } = order;

  return {
    subject: `Your Order #${orderNumber} Has Been Dispatched 🚚`,
    body: `
      <div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#fff; padding:30px; border-radius:8px;">
          
          <div style="text-align:center; margin-bottom:20px;">
            <img src="https://stage.shippingmart.co.uk/logo.png" width="150"/>
          </div>

          <h2 style="color:#bb0100; text-align:center;">
            Your Order Is On The Way!
          </h2>

          <p>Hello <strong>${userName}</strong>,</p>

          <p>Your order <strong>#${orderNumber}</strong> has been dispatched.</p>

          <div style="background:#f9f9f9; padding:15px; border-radius:6px; margin:20px 0;">
            <strong>Tracking Number:</strong><br/>
            ${trackingNumber}
          </div>

          <p>You can track your parcel using Royal Mail tracking.</p>

          <p style="margin-top:30px;">
            Thank you for shopping with MY MART.
          </p>

        </div>
      </div>
    `
  };
}

function deliveredMailTemplate({ order }) {
  const { orderNumber, userName } = order;

  return {
    subject: `Order #${orderNumber} Delivered ✅`,
    body: `
      <div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#fff; padding:30px; border-radius:8px;">

          <div style="text-align:center; margin-bottom:20px;">
            <img src="https://stage.shippingmart.co.uk/logo.png" width="150"/>
          </div>

          <h2 style="color:#bb0100; text-align:center;">
            Your Order Has Been Delivered
          </h2>

          <p>Hello <strong>${userName}</strong>,</p>

          <p>We’re happy to inform you that your order 
          <strong>#${orderNumber}</strong> has been delivered.</p>

          <p>If you have any issues, please contact our support team.</p>

          <p style="margin-top:30px;">
            Thank you for choosing MY MART.
          </p>

        </div>
      </div>
    `
  };
}

module.exports = { otpMailTemplate, invoiceMailTemplate, dispatchMailTemplate, deliveredMailTemplate };