"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaCcVisa,
  FaShoppingCart,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaTruck,
  FaStickyNote
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { userOrderHistory } from "@/app/api/orders";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { convertS3UrlToLocalPath } from "@/utils/util";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: session, status } = useSession();
  const token = session?.user?.token;

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  const getStatusColor = (status) => {
    const statusColors = {
      pending: { text: "#f59e0b", bg: "#fef3c7", border: "#f59e0b" },
      processing: { text: "#3b82f6", bg: "#dbeafe", border: "#3b82f6" },
      shipped: { text: "#8b5cf6", bg: "#ede9fe", border: "#8b5cf6" },
      delivered: { text: "#10b981", bg: "#d1fae5", border: "#10b981" },
      cancelled: { text: "#ef4444", bg: "#fee2e2", border: "#ef4444" }
    };
    return (
      statusColors[status?.toLowerCase()] || {
        text: "#6b7280",
        bg: "#f3f4f6",
        border: "#6b7280"
      }
    );
  };

  const getPaymentColor = (paymentType) => {
    const isOnline = paymentType === "ONLINE";
    return isOnline
      ? { text: "#10b981", bg: "#d1fae5", border: "#10b981" }
      : { text: "#ef4444", bg: "#fee2e2", border: "#ef4444" };
  };

  const fetchOrders = async () => {
    try {
      const response = await userOrderHistory(token, id);
      setOrders(response);
      setProducts(response.products);
      setDiscounts(response.Discount[0]);
      setPaymentMethod(response.isPaid);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Login to continue");
      router.push("/signin");
    }
    if (token && status === "authenticated") fetchOrders();
  }, [token, status]);

  if (!orders || Object.keys(orders).length === 0) return <LoadingScreen />;

  return (
    <div className="container bg-white my-5 p-4 rounded-4">
      {/* Header */}
      <div className="text-center py-4 border-bottom d-flex align-items-center justify-content-center justify-content-lg-between flex-column flex-lg-row">
        <div className="d-flex justify-content-center mb-3">
          <div className="bg-dark rounded-circle p-3 shadow-sm">
            <FaShoppingCart className="text-white display-5" />
          </div>
        </div>
        <div>
        <h2 className="fw-bold mb-2">Purchase Confirmation</h2>
        <p className="text-secondary mb-1">
          Thank you for your order, {orders.userName}.
        </p>
        <p className="text-muted">
          We&apos;ll send tracking information as soon as your order ships.
        </p>
        </div>
        <Link href={"/"} className="btn btn-cart2 mt-3 px-4 py-2 rounded-pill d-flex justify-content-center align-items-center w-fit">
          Continue Shopping
        </Link>
      </div>

      {/* Order Number */}
      <div className="border-bottom py-3 text-center gap-5 d-flex justify-content-center align-items-center">
        <span className="fw-semibold text-secondary fs-5">
          Order Number:{" "}
          <span className="text-dark fw-bold fs-4">#{orders.orderNumber}</span>
        </span>
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "500",
            backgroundColor: getStatusColor(orders.status).bg,
            color: getStatusColor(orders.status).text,
            border: `1px solid ${getStatusColor(orders.status).border}`,
            display: "inline-block",
            marginLeft: "12px"
          }}
        >
          {orders.status}
        </span>
      </div>

      {/* Products and Order Summary Row */}
      <div className="row g-4 mt-3">
        {/* Products - Left Side */}
        <div className="col-12 col-lg-7">
          <div className="border rounded-3 p-4 shadow-sm h-100">
            <h5 className="fw-bold mb-3 pb-2  border-bottom">Order Details</h5>
            <p className="text-muted mb-3 mx-3"  style={{ fontSize: "1rem" }}>
              <strong>Order Date:</strong> {formatDate(orders.orderDate)}
            </p>

            {products.length > 0 &&
              products.map((item) => (
                <div
                  key={item.id}
                  className="d-flex p-3 align-items-center border-top border-bottom"
                >
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold mb-0">{item.name}</h6>
                      <span className="fw-semibold">₹{item.price}</span>
                    </div>
                    <p className="mb-1 text-muted">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Order Summary - Right Side */}
        <div className="col-12 col-lg-5">
          <div className="border rounded-3 p-4 shadow-sm">
            <h5 className="fw-bold mb-2 pb-2 border-bottom">
              <FaShoppingCart className="me-2" />
              Order Summary
            </h5>

            {/* Sub Total */}
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Sub Total</span>
              <span className="fw-semibold">
                ₹{Number(orders.summary["Sub Total"]).toFixed(2)}
              </span>
            </div>

            {/* Coupons / Discounts */}
            {orders.summary?.Coupons?.length > 0 &&
              orders.summary.Coupons.map((coupon, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted d-flex gap-2 align-items-center">Discount

                    {coupon.code && (
                      <div className="small text-success fw-semibold">
                          {coupon.code}
                      </div>
                    )}
                    </span>
                  <span className="fw-semibold text-danger">
                    - ₹{Number(coupon.amount).toFixed(2)}
                  </span>
                </div>
              ))}

            {/* Delivery Charges */}
            <div className="d-flex justify-content-between border-top mb-2 pt-2">
              <span className="text-muted">Delivery Charges</span>
              <span
                className={`fw-semibold ${
                  Number(orders.summary["Delivery Charges"]) === 0
                    ? "text-success"
                    : ""
                }`}
              >
                {Number(orders.summary["Delivery Charges"]) === 0
                  ? "FREE"
                  : `₹${Number(orders.summary["Delivery Charges"]).toFixed(2)}`}
              </span>
            </div>

            {/* Additional Charges (e.g., VAT) */}
            {orders.summary?.Charges?.length > 0 &&
              orders.summary.Charges.map((charge, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between mb-2"
                >
                  <span className="text-muted text-capitalize">
                    {charge.name}
                  </span>
                  <span className="fw-semibold">
                    ₹{Number(charge.amount).toFixed(2)}
                  </span>
                </div>
              ))}

            {/* Total Amount */}
            <div className="d-flex justify-content-between fw-bold border-top pt-2 mt-2 fs-5">
              <span>Total Amount</span>
              <span className="text-dark">
                ₹{Number(orders.summary["Total Amount"]).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Address and Payment Section */}
      <div className="row g-4 mt-3">
        {/* Shipping Address */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="border rounded-3 p-4 shadow-sm h-100">
            <h5 className="fw-bold mb-3 pb-2 border-bottom">
              <FaTruck className="me-2" />
              Shipping Address
            </h5>
            <div className="d-flex align-items-start">
              <FaMapMarkerAlt className="text-muted me-2 mt-1" />
              <div>
                <p className="mb-2 fw-semibold">{orders.userName}</p>
                <p className="mb-1 text-muted">{orders.shippingStreet}</p>
                <p className="mb-1 text-muted">
                  {orders.shippingCity}, {orders.shippingState}
                </p>
                <p className="mb-1 text-muted">
                  {orders.shippingCountry} - {orders.shippingZip}
                </p>
                <p className="mb-0 text-muted">
                  <small>Ph: {orders.mobileNumber}</small>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="border rounded-3 p-4 shadow-sm h-100">
            <h5 className="fw-bold mb-3 pb-2 border-bottom">
              <FaMapMarkerAlt className="me-2" />
              Billing Address
            </h5>
            <div className="d-flex align-items-start">
              <FaMapMarkerAlt className="text-muted me-2 mt-1" />
              <div>
                <p className="mb-2 fw-semibold">{orders.userName}</p>
                <p className="mb-1 text-muted">{orders.billingStreet}</p>
                <p className="mb-1 text-muted">
                  {orders.billingCity}, {orders.billingState}
                </p>
                <p className="mb-1 text-muted">
                  {orders.billingCountry} - {orders.billingZip}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="col-12 col-lg-4">
          <div className="border rounded-3 p-4 shadow-sm h-100">
            <h5 className="fw-bold mb-3 pb-2 border-bottom">
              Payment Method
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: "500",
                  backgroundColor: getPaymentColor(orders.paymentType).bg,
                  color: getPaymentColor(orders.paymentType).text,
                  border: `1px solid ${getPaymentColor(orders.paymentType).border}`,
                  display: "inline-block",
                  marginLeft: "12px"
                }}
              >
                {orders.isPaid ? "Paid" : "Unpaid"}
              </span>
            </h5>
            {paymentMethod === "COD" ? (
              <div className="d-flex align-items-center p-3 bg-light rounded-3">
                <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                  <FaMoneyBillWave className="text-success fs-4" />
                </div>
                <div>
                  <p className="mb-0 fw-semibold text-dark">Cash on Delivery</p>
                  <small className="text-muted">Pay when you receive</small>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center p-3 bg-light rounded-3">
                <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                  <FaCcVisa className="text-primary fs-4" />
                </div>
                <div>
                  <p className="mb-0 fw-semibold text-dark">
                    Visa Card â€¢â€¢â€¢â€¢ 3234
                  </p>
                  <small className="text-muted">Online Payment</small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer and Vendor Notes Section */}
      <div className="row g-4 mt-3">
        {/* Customer Notes */}
        <div className="col-12 col-md-6">
          <div className="border rounded-3 p-4 shadow-sm h-100">
            <h5 className="fw-bold mb-3 pb-2 border-bottom">
              <FaStickyNote className="me-2" />
              Customer Notes
            </h5>
            <textarea
              className="form-control"
              rows="4"
              value={orders.customerRemarks || ""}
              readOnly
              placeholder="No customer notes"
              style={{ resize: "none", backgroundColor: "#f8f9fa" }}
            />
          </div>
        </div>

        {/* Vendor Remarks */}
        <div className="col-12 col-md-6">
          <div className="border rounded-3 p-4 shadow-sm h-100">
            <h5 className="fw-bold mb-3 pb-2 border-bottom">
              <FaStickyNote className="me-2" />
              Vendor Remarks
            </h5>
            <textarea
              className="form-control"
              rows="4"
              value={orders.vendorRemarks || ""}
              readOnly
              placeholder="No vendor remarks"
              style={{ resize: "none", backgroundColor: "#f8f9fa" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
