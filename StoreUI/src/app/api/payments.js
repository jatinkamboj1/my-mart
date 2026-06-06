import toast from "react-hot-toast";
import axios from "axios";

export const createStripePaymentIntent = async (orderId, token) => {
  try {
    const response = await axios.post(`${process.env.SERVER_URL}/payment/create-payment-intent`, 
        {
        orderId,
        currency: "gbp",
      },
        {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    
    return response.data; // { clientSecret }
  } catch (err) {
    console.error(
      "createPaymentIntent error:",
      err.response?.data || err.message
    );
    // toast.error(error.message || "Payment failed. Please try again.");
    throw new Error(
      err.response?.data?.error || "Failed to create payment intent"
    );
  }
};