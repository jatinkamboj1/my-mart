import axios from "axios";

export const createRazorpayOrder = async (orderId, token) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/payment/create-order`,
      { orderId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error(
      "createRazorpayOrder error:",
      err.response?.data || err.message
    );

    throw new Error(
      err.response?.data?.error || "Failed to create Razorpay order"
    );
  }
};

export const verifyRazorpayPayment = async (paymentResponse, token) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/payment/verify`,
      paymentResponse,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error(
      "verifyRazorpayPayment error:",
      err.response?.data || err.message
    );

    throw new Error(
      err.response?.data?.error || "Payment verification failed"
    );
  }
};
