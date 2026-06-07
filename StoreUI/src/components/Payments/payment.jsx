"use client";

import "@/styles/checkout.scss";
import "@/styles/cartPage.scss";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/app/api/payments";
import { toast } from "react-hot-toast";

/* ================= PAYMENT FORM ================= */
export const PaymentForm = ({
  orderId,
  token,
  amount,
  customer,
  handlePayment,
  onSuccess,
  isProcessing,
  setProcessing,
}) => {
  const updateProcessing = setProcessing || (() => {});

  const handleRazorpayPayment = async () => {
    try {
      updateProcessing(true);

      const preparedOrder = handlePayment ? await handlePayment() : { orderId };
      const payableOrderId = preparedOrder?.orderId || orderId;

      if (!payableOrderId) {
        throw new Error("Order creation failed");
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout script is not loaded");
      }

      const data = await createRazorpayOrder(payableOrderId, token);

      if (!data?.orderId) {
        throw new Error("Failed to create Razorpay order");
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "MY MART",
        description: "Order Payment",
        order_id: data.orderId,
        prefill: {
          name: customer?.name || "",
          email: customer?.email || "",
          contact: customer?.contact || "",
        },
        handler: async (response) => {
          const verified = await verifyRazorpayPayment(
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            },
            token
          );

          toast.success("Payment successful!");
          await onSuccess?.({
            ...verified,
            orderId: payableOrderId,
            orderNumber: preparedOrder?.orderNumber,
          });
        },
        modal: {
          ondismiss: () => {
            updateProcessing(false);
          },
        },
        theme: {
          color: "#111111",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        toast.error(response?.error?.description || "Payment failed");
        updateProcessing(false);
      });
      rzp.open();
    } catch (error) {
      console.error("Razorpay payment error:", error);
      toast.error(error.message || "Payment failed");
      updateProcessing(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleRazorpayPayment}
      disabled={isProcessing || !token || Number(amount || 0) <= 0}
      className="btn btn-cart2 w-100"
    >
      {isProcessing ? "Processing..." : "Pay and Place Order"}
    </button>
  );
};

/* ================= WRAPPER ================= */
export default function PaymentWrapper({ children }) {
  return <>{children}</>;
}
