"use client";
import "@/styles/checkout.scss";
import "@/styles/cartPage.scss";

import { loadStripe } from "@stripe/stripe-js";
import {
Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

/* ================= PAYMENT FORM ================= */
export const PaymentForm = ({ handlePayment, isProcessing }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement
      });

    if (error) {
      toast.error(error.message);
      return;
    }
    
    handlePayment(paymentMethod.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <CardElement />
      </div>
      <button
        type="submit"
        disabled={isProcessing}
        className="btn btn-cart2 w-100"
      >
        {isProcessing ? "Processing..." : "Pay and Place Order"}
      </button>
    </form>
  );
};

export default function PaymentWrapper({children}) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}