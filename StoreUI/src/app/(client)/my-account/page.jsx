"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import "@/styles/myAccount.scss";
import "@/styles/sliders.scss";
import "@/styles/cartPage.scss";
import "@/styles/pagination.scss";
import { LogoutUser } from "@/utils/auth";
import { getUserById, updateUser } from "@/app/api/users";
import { useSession } from "next-auth/react";
import {
  addAddress,
  deleteAddress,
  fetchUserAddress,
  updateUserAddress
} from "@/app/api/address";
import { FaPen, FaPlus, FaTrash, FaBars, FaShoppingCart } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { userOrders } from "@/app/api/orders";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createStripePaymentIntent } from "@/app/api/payments";
import PaymentWrapper, { PaymentForm, stripePromise } from "@/components/Payments/payment";
import Select from "react-select";
import countryList from "react-select-country-list";
import validator from "validator";


export default function MyAccount() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const token = session?.user?.token;
  useEffect(() => {
    if (!token && status === "unauthenticated") {
      router.push("/signin");
    }
  }, [token, router]);
  const [panel, setPanel] = useState("info");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  let panelContent;
  switch (panel) {
    case "order":
      panelContent = <Orders />;
      break;
    case "address":
      panelContent = <Address />;
      break;
    default:
      panelContent = <AccountInfo />;
  }

  return (
    <div className="my-account-wrapper section-padding">
      <div className="container">
        <div className="section-bg-color">
          <div className="row">
            <div className="col-lg-12">
              <div className="myaccount-page-wrapper">
                <div className="row">
                  <div
                    className={`col-lg-3 col-md-4 filter-sidebar ${isSidebarOpen ? "open" : ""
                      }`}
                  >
                    <div
                      className="btn-close-"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <i className="pe-7s-close"></i>
                    </div>
                    <SideBar
                      setPanel={setPanel}
                      setIsSidebarOpen={setIsSidebarOpen}
                    />
                  </div>
                  <div className="col-lg-9 col-md-8">{panelContent}</div>
                </div>
                <div
                  className={isSidebarOpen ? "off-canvas-overlay" : ""}
                  onClick={() => setIsSidebarOpen(false)}
                ></div>

                {/* Floating button for mobile */}
                <button
                  className="floating-menu-btn hide-on-large"
                  onClick={() => setIsSidebarOpen(true)}
                  style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 999
                  }}
                >
                  <FaBars size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SideBar = ({ setPanel, setIsSidebarOpen }) => {
  const [activeTab, setActiveTab] = useState("info");

  const handleLogout = () => {
    LogoutUser();
  };

  const handleMenuClick = (panelName) => {
    setActiveTab(panelName);
    setPanel(panelName);
    setIsSidebarOpen(false);
  };

  return (
    <div className="myaccount-tab-menu nav" role="tablist">
      <a
        className="myaccount-tab-menu-link" style={{ background: "black", color: "white" }}
        onClick={() => handleMenuClick("admin")}
        href="/admin"
      >
        <i className="fa fa-dashboard"></i> Admin Dashboard
      </a>
      <button
        className={`myaccount-tab-menu-link ${activeTab === "info" ? "active" : ""
          }`}
        onClick={() => handleMenuClick("info")}
      >
        <i className="fa fa-user"></i> Account Details
      </button>
      <button
        className={`myaccount-tab-menu-link ${activeTab === "order" ? "active" : ""
          }`}
        onClick={() => handleMenuClick("order")}
      >
        <i className="fa fa-cart-arrow-down"></i> Orders
      </button>
      <button
        className={`myaccount-tab-menu-link ${activeTab === "address" ? "active" : ""
          }`}
        onClick={() => handleMenuClick("address")}
      >
        <i className="fa fa-map-marker"></i> address
      </button>
      <a className={`myaccount-tab-menu-link ${activeTab === "wishlist" ? "active" : ""
        }`} href="/wishlist">
        <i className="fa fa-heart"></i> Wishlist
      </a>
      <button
        className="myaccount-tab-menu-link"
        onClick={() => handleLogout()}
      >
        <i className="fa fa-sign-out"></i> Logout
      </button>
    </div>
  );
};

const Orders = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.token;

  const [orders, setOrders] = useState([]);
  const [pageDetails, setPageDetails] = useState({
    total: 1,
    currentPage: 0,
    limit: 10,
    totalPages: 1
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const fetchUserOrders = async (token, currentPage) => {
    const response = await userOrders(token, currentPage, pageDetails.limit);
    if (response) {
      setOrders(response.orders);
      setPageDetails(response.pageDetails);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 0 || newPage >= pageDetails.totalPages) return;
    setPageDetails((prev) => ({
      ...prev,
      currentPage: newPage
    }));
  };

  const togglePopup = (order) => {
    setSelectedOrder(order);
    setIsOpen(!isOpen);
  };
  const [loading, setLoading] = useState(false);

  const confirmCancel = async () => {
    setLoading(true);
    await handleCancelOrder();
    setLoading(false);
    handleClose();
  };

  const handleCancelOrder = async () => {
    if (!selectedOrder) return;
    try {
      toast.success(`Order ${selectedOrder.orderNumber} has been canceled.`);
      setIsOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error("Failed to cancel order. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserOrders(token, pageDetails.currentPage);
    }
  }, [pageDetails.currentPage, token, status]);

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

  const getPaymentColor = (paid) => {
    return paid
      ? { text: "#10b981", bg: "#d1fae5", border: "#10b981" }
      : { text: "#ef4444", bg: "#fee2e2", border: "#ef4444" };
  };

  const canCancelOrder = (order) => {

    if (!order.cancellationExpiry) return false;
    const now = new Date();
    const expiry = new Date(order.cancellationExpiry);
    // console.log("order.cancellationExpiry", order.cancellationExpiry);
    return now < expiry && order.status.toLowerCase() === "confirmed";
  };
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClose = () => setShowConfirm(false);
  const handleShow = () => setShowConfirm(true);

  
  /* ================= SUBMIT ================= */
  const handleSubmit = async (paymentMethodId) => {
    setIsProcessing(true);

    try {

      const orderId = selectedOrder.id;

      /* ===============================
         CREATE PAYMENT INTENT
      =============================== */
      const { clientSecret } = await createStripePaymentIntent(orderId, token);

      /* ===============================
         CONFIRM CARD PAYMENT
      =============================== */
      const stripe = await stripePromise;

      const { error, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethodId,
        });

      if (error) {
        throw new Error(error.message);
      }

      /* ===============================
         SUCCESS
      =============================== */
      if (paymentIntent.status === "succeeded") {
        setIsPaymentDone(true);
        toast.success("Payment successful!");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(err.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PaymentWrapper>
      <div className="myaccount-content">
        <div className="d-flex justify-content-between align-item-center mb-4">
          <h3 className="mx-1">My Orders</h3>
        </div>

        {/* Card Grid Layout */}
        <div className="row g-3 mb-4">
          {orders.map((order, index) => (
            <div key={index} className="col-12 col-lg-6">
              <div
                className="order-card p-3"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}
                onClick={() => togglePopup(order)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Header Row */}
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2" style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <div>
                    <div className="text-muted" style={{ fontSize: "12px", marginBottom: "4px" }}>
                      Order #{order.orderNumber}
                    </div>
                    <div className="text-muted" style={{ fontSize: "12px" }}>
                      {new Date(order.orderDate).toLocaleDateString("en-GB")}
                    </div>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: "500",
                        backgroundColor: getStatusColor(order.status).bg,
                        color: getStatusColor(order.status).text,
                        border: `1px solid ${getStatusColor(order.status).border}`
                      }}
                    >
                      {order.status}
                    </span>

                    {/* 👁 Eye icon instead of cancel button */}
                    <i
                      className="fa fa-eye"
                      style={{
                        fontSize: "16px",
                        color: "#6b7280",
                      }}
                    ></i>
                  </div>
                </div>

                {/* Product Names */}
                <div className="mb-3">
                  <div className="text-muted" style={{ fontSize: "11px", marginBottom: "6px", fontWeight: "600" }}>
                    PRODUCTS
                  </div>
                  <div style={{ fontSize: "13px", lineHeight: "1.6" }}>
                    {order.products.slice(0, 2).map((item, idx) => (
                      <div key={idx} style={{ marginBottom: "4px" }}>
                        • {item.name || 'Product'}
                      </div>
                    ))}
                    {order.products.length > 2 && (
                      <div className="text-muted" style={{ fontSize: "12px" }}>
                        +{order.products.length - 2} more items
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="d-flex justify-content-between align-items-center pt-2" style={{ borderTop: "1px solid #f3f4f6" }}>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="text-muted" style={{ fontSize: "11px" }}>
                      PAYMENT:
                    </div>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: "500",
                        backgroundColor: getPaymentColor(order.isPaid).bg,
                        color: getPaymentColor(order.isPaid).text,
                        border: `1px solid ${getPaymentColor(order.isPaid).border}`
                      }}
                    >
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </div>

                  <div className="d-flex gap-3 align-items-center">
                    <div style={{ textAlign: "right" }}>
                      <div className="text-muted" style={{ fontSize: "11px" }}>
                        TOTAL AMOUNT
                      </div>
                      <div style={{ fontSize: "18px", fontWeight: "600", color: "#1f2937" }}>
                        £{Number(order.summary["Total Amount"]).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="sa-divider" />
        <div className="paginatoin-area text-center">
          <ul className="pagination-box">
            <li
              onClick={() => handlePageChange(pageDetails.currentPage - 1)}
              className={pageDetails.currentPage < 1 ? "disabled" : ""}
            >
              <button className="previous">
                <i className="pe-7s-angle-left"></i>
              </button>
            </li>

            {(() => {
              let pages = [];
              const totalPages = Math.ceil(pageDetails.total / pageDetails.limit);
              const currentPage = pageDetails.currentPage;

              if (totalPages <= 10) {
                pages = Array.from({ length: totalPages }, (_, i) => i + 1);
              } else {
                let startPage = Math.max(0, currentPage - 4);
                let endPage = Math.min(totalPages, currentPage + 5);

                if (startPage > 4) pages.push(0, "...");
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(i);
                }
                if (endPage < totalPages) pages.push("...", totalPages);
              }
              return pages.map((page, index) => (
                <li
                  key={index}
                  className={`${currentPage + 1 === page ? "active" : ""} ${page === "..." ? "disabled" : ""
                    }`}
                >
                  {page === "..." ? (
                    <span>...</span>
                  ) : (
                    <button onClick={() => handlePageChange(page - 1)}>
                      {page}
                    </button>
                  )}
                </li>
              ));
            })()}

            <li
              onClick={() => handlePageChange(pageDetails.currentPage + 1)}
              className={
                pageDetails.currentPage + 1 >= pageDetails.totalPages
                  ? "disabled"
                  : ""
              }
            >
              <button className="next">
                <i className="pe-7s-angle-right"></i>
              </button>
            </li>
          </ul>
        </div>

        {/* Order Details Modal */}
        {isOpen && selectedOrder && (
          <>
            <div className="modal-overlay">
              <div className="modal-back" onClick={togglePopup}></div>
              <div className="modal-content p-3">
                <div className="w-100" style={{ overflowY: "auto", overflowX: "hidden" }}>
                  <div className="card mt-2" style={{ border: "none", boxShadow: "none" }}>
                    <div className="modal-head">
                      <div className="d-flex align-items-center gap-2">
                        <h4 className="mb-0">Order #{selectedOrder.orderNumber}</h4>
                        <span
                          style={{
                            padding: "4px 12px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: "500",
                            backgroundColor: getStatusColor(selectedOrder.status).bg,
                            color: getStatusColor(selectedOrder.status).text,
                            border: `1px solid ${getStatusColor(selectedOrder.status).border}`,
                            display: "inline-block"
                          }}
                        >
                          {selectedOrder.status}
                        </span>
                      </div>
                      <button className="modal-close-button" onClick={togglePopup}>
                        <i className="pe-7s-close"></i>
                      </button>
                    </div>

                    {/* Order Info Row */}
                    <div className="px-3 py-2 d-flex gap-3 align-items-center justify-content-between" style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <div className="d-flex gap-3 align-items-center">
                        <div className="text-muted" style={{ fontSize: "14px" }}>
                          Order Date: {new Date(selectedOrder.orderDate).toLocaleDateString("en-GB")}
                        </div>
                        <span
                          style={{
                            padding: "4px 12px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: "500",
                            backgroundColor: getPaymentColor(selectedOrder.isPaid).bg,
                            color: getPaymentColor(selectedOrder.isPaid).text,
                            border: `1px solid ${getPaymentColor(selectedOrder.isPaid).border}`,
                            display: "inline-block"
                          }}
                        >
                          {selectedOrder.isPaid ? "Paid" : "Unpaid"}
                        </span>
                      </div>

                      {/* ✅ Show cancel only if pending and not expired */}
                      {canCancelOrder(selectedOrder) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShow();
                          }}
                          style={{
                            padding: "4px 16px",
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: "500",
                            backgroundColor: "#ef4444",
                            color: "#fee2e2",
                            border: "1px solid #ef4444",
                            cursor: "pointer",
                          }}
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                    <div className="row p-1 mx-0">
                      <div className="col-12 p-0">
                        <div className="row mx-0 g-1">
                          {/* Products Column */}
                          <div className="col-12 col-md-7 mb-2 px-0">
                            <div className="priceDetailsContainer p-3 h-100">
                              <h3 className="priceDetailsTitle">Order Items</h3>
                              {selectedOrder.products.map((item) => (
                                <div key={item.id} className="orderItem" style={{ marginBottom: "12px" }}>
                                  <div className="orderItem-content" style={{ flex: 1 }}>
                                    <h4 className="orderItem-name" style={{ fontSize: "14px", marginBottom: "4px" }}>
                                      {item.name}
                                    </h4>
                                    <div className="orderItem-price" style={{ fontSize: "13px", color: "#6b7280" }}>
                                      <span>Qty: {item.quantity}</span>
                                      <span> × </span>
                                      <span>£{item.price}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Price Details Column */}
                          <div className="col-12 col-md-5 mb-2 px-0">
                            <div className="priceDetailsContainer p-3 h-100">
                              <h5 className="fw-bold mb-2 pb-2 border-bottom">
                                <FaShoppingCart className="me-2" />
                                Order Summary
                              </h5>

                              {/* Sub Total */}
                              <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Sub Total</span>
                                <span className="fw-semibold">
                                  £{Number(selectedOrder.summary["Sub Total"]).toFixed(2)}
                                </span>
                              </div>

                              {/* Coupons / Discounts */}
                              {selectedOrder.summary?.Coupons?.length > 0 &&
                                selectedOrder.summary.Coupons.map((coupon, index) => (
                                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-muted d-flex gap-2 align-items-center">Discount

                                      {coupon.code && (
                                        <div className="small text-success fw-semibold">
                                          {coupon.code}
                                        </div>
                                      )}
                                    </span>
                                    <span className="fw-semibold text-danger">
                                      - £{Number(coupon.amount).toFixed(2)}
                                    </span>
                                  </div>
                                ))}

                              {/* Delivery Charges */}
                              <div className="d-flex justify-content-between border-top mb-2 pt-2">
                                <span className="text-muted">Delivery Charges</span>
                                <span
                                  className={`fw-semibold ${Number(selectedOrder.summary["Delivery Charges"]) === 0
                                    ? "text-success"
                                    : ""
                                    }`}
                                >
                                  {Number(selectedOrder.summary["Delivery Charges"]) === 0
                                    ? "FREE"
                                    : `£${Number(selectedOrder.summary["Delivery Charges"]).toFixed(2)}`}
                                </span>
                              </div>

                              {/* Additional Charges (e.g., VAT) */}
                              {selectedOrder.summary?.Charges?.length > 0 &&
                                selectedOrder.summary.Charges.map((charge, index) => (
                                  <div
                                    key={index}
                                    className="d-flex justify-content-between mb-2"
                                  >
                                    <span className="text-muted text-capitalize">
                                      {charge.name}
                                    </span>
                                    <span className="fw-semibold">
                                      £{Number(charge.amount).toFixed(2)}
                                    </span>
                                  </div>
                                ))}

                              {/* Total Amount */}
                              <div className="d-flex justify-content-between fw-bold border-top pt-2 mt-2 fs-5">
                                <span>Total Amount</span>
                                <span className="text-dark">
                                  £{Number(selectedOrder.summary["Total Amount"]).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Address and Payment Row */}
                        <div className="row mx-0 mt-3 g-1">
                          <div className="col-12 col-md-6 mb-2 px-0">
                            <div className="priceDetailsContainer p-3 h-100">
                              <h4 className="mb-3" style={{ fontSize: "16px", fontWeight: "600" }}>
                                <i className="pe-7s-box2 me-2"></i>Shipping Address
                              </h4>
                              <p className="mb-1" style={{ fontSize: "14px", fontWeight: "500" }}>
                                {selectedOrder.userName}
                              </p>
                              <p className="mb-0 text-muted" style={{ fontSize: "13px", lineHeight: "1.5" }}>
                                {selectedOrder.shippingStreet || selectedOrder.billingStreet}
                                {(selectedOrder.shippingStreet || selectedOrder.billingStreet) && ", "}
                                {selectedOrder.shippingCity || selectedOrder.billingCity}
                                {(selectedOrder.shippingCity || selectedOrder.billingCity) && ", "}
                                {selectedOrder.shippingState || selectedOrder.billingState}
                                <br />
                                {selectedOrder.shippingCountry || selectedOrder.billingCountry}
                                {(selectedOrder.shippingZip || selectedOrder.billingZip) && ` - ${selectedOrder.shippingZip || selectedOrder.billingZip}`}
                                <br />
                                Ph. {selectedOrder.mobileNumber}
                              </p>
                            </div>
                          </div>

                          <div className="col-12 col-md-6 mb-2 px-0">
                            <div className="priceDetailsContainer p-3 h-100">
                              <h4 className="mb-3" style={{ fontSize: "16px", fontWeight: "600" }}>
                                <i className="pe-7s-box2 me-2"></i>Billing Address
                              </h4>
                              <p className="mb-1" style={{ fontSize: "14px", fontWeight: "500" }}>
                                {selectedOrder.userName}
                              </p>
                              <p className="mb-0 text-muted" style={{ fontSize: "13px", lineHeight: "1.5" }}>
                                {selectedOrder.billingStreet}
                                {selectedOrder.billingStreet && ", "}
                                {selectedOrder.billingCity}
                                {selectedOrder.billingCity && ", "}
                                {selectedOrder.billingState}
                                <br />
                                {selectedOrder.billingCountry}
                                {selectedOrder.billingZip && ` - ${selectedOrder.billingZip}`}
                                <br />
                                Ph. {selectedOrder.mobileNumber}
                              </p>
                            </div>
                          </div>

                          <div className="col-12 col-md-6 mb-2 px-0">
                            {(isPaymentDone || (selectedOrder.paymentType === "ONLINE" && selectedOrder.status === "PENDING")) ?
                              <div className="priceDetailsContainer p-3 h-100">
                                <h4 className="mb-3" style={{ fontSize: "16px", fontWeight: "600" }}>
                                  Create Payment
                                </h4>
                                <div className="summary-footer-area" style={{marginBlockStart: 30}}>

                                  <PaymentForm
                                    handlePayment={handleSubmit}
                                    isProcessing={isProcessing}
                                  />
                                </div>
                              </div> :
                              <div className="priceDetailsContainer p-3 h-100">
                                <h4 className="mb-3" style={{ fontSize: "16px", fontWeight: "600" }}>
                                  Payment Method
                                </h4>
                                <div className="d-flex align-items-center gap-3">
                                  <div
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      borderRadius: "50%",
                                      backgroundColor: "#2563eb",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      flexShrink: 0
                                    }}
                                  >
                                    <i className="pe-7s-credit" style={{ color: "white", fontSize: "20px" }}></i>
                                  </div>
                                  <div>
                                    <p className="mb-0" style={{ fontSize: "14px", fontWeight: "500" }}>
                                      {selectedOrder.paymentType === "ONLINE" ? "Online Payment" : "Cash on Delivery"}
                                    </p>
                                    <p className="mb-0 text-muted" style={{ fontSize: "12px" }}>
                                      {selectedOrder.isPaid ? "Payment completed" : "Pay on delivery"}
                                    </p>
                                  </div>
                                </div>
                              </div>}
                          </div>

                          <div className="col-12 col-md-6 mb-2 px-0">
                            <div className="priceDetailsContainer p-3 h-100">
                              <h4 className="mb-3" style={{ fontSize: "16px", fontWeight: "600" }}>
                                Shipment Details
                              </h4>
                              <div className="table-responsive">
                                <table className="sa-table" style={{ minWidth: "100%" }}>
                                  <tbody className="sa-table__group">

                                    <tr>
                                      <td colSpan="3">Provider</td>
                                      <td className="text-end">{selectedOrder.shipmentTracking?.provider || "-"}</td>
                                    </tr>

                                    <tr>
                                      <td colSpan="3">Service</td>
                                      <td className="text-end">{selectedOrder.shipmentTracking?.service || "-"}</td>
                                    </tr>

                                    <tr>
                                      <td colSpan="3">Status</td>
                                      <td className="text-end">
                                        {selectedOrder.shipmentTracking?.status === "CREATED" ? (
                                          <span className="badge bg-secondary">Created</span>
                                        ) : selectedOrder.shipmentTracking?.status === "DESPATCHED" ? (
                                          <span className="badge bg-info">Despatched</span>
                                        ) : selectedOrder.shipmentTracking?.status === "IN_TRANSIT" ? (
                                          <span className="badge bg-warning">In Transit</span>
                                        ) : selectedOrder.shipmentTracking?.status === "DELIVERED" ? (
                                          <span className="badge bg-success">Delivered</span>
                                        ) : (
                                          selectedOrder.shipmentTracking?.status || "-"
                                        )}
                                      </td>
                                    </tr>

                                    <tr>
                                      <td colSpan="3">Tracking Number</td>
                                      <td className="text-end">
                                        {selectedOrder.shipmentTracking?.trackingNumber ? (
                                          selectedOrder.shipmentTracking.trackingNumber
                                        ) : (
                                          <span className="text-muted">Not generated</span>
                                        )}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <style>{`body { overflow: hidden; }`}</style>
            {showConfirm && (
              <div className="modal-overlay">
                <div className="modal-back" onClick={() => setShowConfirm(false)}></div>
                <div className="modal-content p-3" style={{ overflowY: "auto", overflowX: "hidden", width: "auto", height: "auto" }}>
                  <div className="card mt-2" style={{ border: "none", boxShadow: "none" }}>
                    <div className="modal-head px-0">
                      <div className="d-flex align-items-center gap-2">
                        <h4 className="mb-0">Confirm Cancellation</h4>
                      </div>
                      <button className="modal-close-button" onClick={() => setShowConfirm(false)}>
                        <i className="pe-7s-close"></i>
                      </button>
                    </div>

                    <div className="modal-body">
                      <p className="text-muted" style={{ fontSize: "14px" }}>
                        Are you sure you want to cancel order #
                        <strong>{selectedOrder.orderNumber}</strong>?
                      </p>
                    </div>

                    <div className="modal-footer">
                      <button
                        style={{
                          padding: "4px 16px",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: "500",
                          backgroundColor: "#676767",
                          color: "#fee2e2",
                          border: "1px solid #676767",
                          cursor: "pointer",
                        }} onClick={() => setShowConfirm(false)} disabled={loading}>
                        No
                      </button>
                      <button
                        style={{
                          padding: "4px 16px",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: "500",
                          backgroundColor: "#ef4444",
                          color: "#fee2e2",
                          border: "1px solid #ef4444",
                          cursor: "pointer",
                        }} onClick={confirmCancel} disabled={loading}>
                        {loading ? "Cancelling..." : "Yes, Cancel Order"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </PaymentWrapper>
  );
};

const Address = () => {
  const { data: session, status } = useSession();
  const [address, setAddress] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [reason, setReason] = useState("add");
  const countryOptions = useMemo(() => countryList().getData(), []);

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    stateOrProvince: "",
    country: "",
    zip: "",
  });

  const token = session?.user?.token;
  const fetchUserAddres = async (token) => {
    const response = await fetchUserAddress(token);
    setAddress(response);
  };

  const handleShowPopup = (e, action, data) => {
    e.preventDefault();
    setFormData(data);
    setReason("edit");
    setShowPopup(true);
  };

  const closeModal = async (e) => {
    e.preventDefault();
    setShowPopup(false);
    setFormData({
      street: "",
      city: "",
      stateOrProvince: "",
      country: "",
      zip: "",
    });
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addAddress(formData, token);
      toast.success("Address Added Successfully");
      fetchUserAddres(token);
      setShowPopup(false);
      setReason("add");
      setFormData({
        street: "",
        city: "",
        stateOrProvince: "",
        country: "",
        zip: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting address!");
    }
  };

  const updateAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserAddress(formData, token, formData.id);
      toast.success("Address Updated Successfully");
      fetchUserAddres(token);

      setShowPopup(false);
      setReason("add");
      setFormData({
        street: "",
        city: "",
        stateOrProvince: "",
        country: "",
        zip: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error submitting address!");
    }
  };

  const onDelete = async (e, id) => {
    e.preventDefault();
    try {
      const response = await deleteAddress(id, token);
      toast.success("Address Deleted Successfully");
      fetchUserAddres(token);
    } catch (error) {
      toast.error("Failed to delete address");
    }
  };

  useEffect(() => {
    fetchUserAddres(token);
  }, [token]);

  return (
    <div className="myaccount-content">
      {showPopup && (
        <div className="address-popup">
          <div className="address-popup-wrap">
            <div className="d-flex justify-content-between items-center mb-4">
              <h4 className="inline text-lg font-semibold">Address Info</h4>
              <button type="button" onClick={(e) => closeModal(e)}>
                <IoMdClose size={24} />
              </button>
            </div>
            <hr />

            <form
              className="mt-0"
              onSubmit={reason === "edit" ? updateAddress : handleSubmit}
            >
              <div className="address-form">
                {[
                  {
                    label: "Name",
                    name: "name",
                    placeholder: "Name (For Quick Ref)"
                  },
                  {
                    label: "Street",
                    name: "street",
                    placeholder: "Street Address"
                  },
                  { label: "City", name: "city", placeholder: "City" },
                  {
                    label: "State/Province",
                    name: "stateOrProvince",
                    placeholder: "State/Province"
                  },
                  // { label: "Country", name: "country", placeholder: "Country" },
                  { label: "ZIP Code", name: "zip", placeholder: "ZIP Code" }
                ].map(({ label, name, placeholder }) => (
                  <div key={name} className="address-form-field">
                    <input
                      type="text"
                      id={name}
                      name={name}
                      value={formData[name]}
                      onChange={handleAddressChange}
                      placeholder={placeholder}
                      required
                    />
                  </div>
                ))}
                  <div key={name} className="address-form-field">
                    <Select
                      options={countryOptions}
                      value={countryOptions.find(
                        (c) => c.value === formData.country
                      )}
                      onChange={(option) =>
                        setFormData((prev) => ({
                          ...prev,
                          country: option.value
                        }))
                      }
                      placeholder="Select Country"
                    />
                  </div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="myaccount-tab-menu-link active w-100 text-center"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="d-flex card_border justify-content-between align-item-center">
        <h4>Address</h4>
        <button type="button" onClick={(e) => setShowPopup(true)}>
          <FaPlus />
        </button>
      </div>

      <div className="row">
        {address?.length !== 0 &&
          address?.map((add, index) => (
            <div key={`address-${index}`} className="col-12 col-md-6">
              <address>
                <p>
                  <strong>Address</strong>
                </p>
                <strong>{add.name}</strong>
                <p>
                  {add.street}, {add.city}, {add.country}
                </p>
              </address>
              <div className="d-flex gap-5">
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={(e) => handleShowPopup(e, "edit", add)}
                  title="Edit Address"
                >
                  <FaPen />
                </button>
                <button
                  onClick={(e) => onDelete(e, add.id)}
                  title="Delete Address"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const AccountInfo = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    phone: ""
  });
  const token = session?.user?.token;
  const fetchUserByid = async (token) => {
    const response = await getUserById(token);
    setUser((prev) => ({
      ...prev,
      name: response?.name || "",
      email: response?.email || "",
      phone: response?.phone || ""
    }));
  };
  useEffect(() => {
    if (token) fetchUserByid(token);
  }, [token]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password === user.newPassword) {
      toast.error("Current password and new password should not be same");
    }
    if (user.newPassword !== user.confirmPassword) {
      toast.error("New password and confirm password should be same");
    }

    try {
      const response = await updateUser(token, user);
      setUser((prev) => ({
        ...prev,
        name: response?.name,
        email: response?.email,
        phone: response?.phone
      }));

      toast.success("User updated successfully");
    } catch (error) { }
  };

  return (
    <div className="myaccount-content">
      <h5>Account Details</h5>
      <div className="account-details-form">
        <form
          action="#"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="single-input-item">
            <label htmlFor="user-name" className="required">
              user Name
            </label>
            <input
              type="text"
              id="user-name"
              placeholder="user Name"
              name="name"
              required
              value={user?.name}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="single-input-item">
            <label htmlFor="email" className="required">
              Email Addres
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              name="email"
              required
              value={user?.email}
              readOnly
            />
          </div>
          <div className="single-input-item">
            <label htmlFor="email" className="required">
              Phone number
            </label>
            <input
              type="tel"
              id="number"
              placeholder="Enter Your Number"
              name="phone"
              required
              value={user?.phone}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <fieldset>
            <legend>Password change</legend>
            <div className="single-input-item">
              <label htmlFor="current-pwd" className="">
                Current Password
              </label>
              <input
                type="password"
                id="current-pwd"
                placeholder="Current Password"
                name="password"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="single-input-item">
                  <label htmlFor="new-pwd" className="">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-pwd"
                    placeholder="New Password"
                    name="newPassword"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="single-input-item">
                  <label htmlFor="confirm-pwd" className="">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm-pwd"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>
            </div>
          </fieldset>
          <div className="single-input-item">
            <button className="btn btn-sqr" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
