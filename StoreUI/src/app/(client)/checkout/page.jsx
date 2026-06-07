"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { getUserById } from "@/app/api/users";
import { fetchUserCart, clearUserCart } from "@/app/api/cart";
import { fetchUserAddress } from "@/app/api/address";
import { applyCoupon } from "@/app/api/discount";
import { addOrder } from "@/app/api/orders";
import { getApplicableShippingFee } from "@/app/api/shippingFee";
import { applyCharges } from "@/app/api/charges";

import "@/styles/checkout.scss";
import "@/styles/cartPage.scss";

import { createStripePaymentIntent } from "@/app/api/payments";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Select from "react-select";
import countryList from "react-select-country-list";
import { useMemo } from "react";
import validator from "validator";
import PaymentWrapper, { PaymentForm, stripePromise } from "@/components/Payments/payment";


/* ================= CHECKOUT PAGE ================= */
const CheckoutPage = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.token;
  const router = useRouter();

  const countryOptions = useMemo(() => countryList().getData(), []);
  const [user, setUser] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState([]);
  const [showBilling, setShowShipping] = useState(false);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const [coupon, setCoupon] = useState("");
  const [couponDetail, setCouponDetail] = useState({ discount: 0 });

  const [deliveryChargesOptions, setDeliveryChargesOptions] = useState([]);
  const [deliveryCharges, setDeliveryCharges] = useState([]);
  const [deliveryCharge, setDeliveryCharge] = useState({});
  const [chargesResult, setChargesResult] = useState({
    totalPay: 0,
    charges: []
  });

  const [formData, setFormData] = useState({
    userName: "",
    mobileNumber: "",
    email: "",
    customerRemarks: "",
    paid: "ONLINE",
    status: "PENDING",
    shippingStreet: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "GB",
    shippingZip: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingCountry: "GB",
    billingZip: "",
    shippingId: "",
    terms: false
  });

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    if (status !== "authenticated" || !token) return;

    Promise.all([
      getUserById(token),
      fetchUserCart(token),
      fetchUserAddress(token)
    ]).then(([u, cart, addr]) => {
      setUser(u || {});
      setCartItems(cart || []);
      setAddress(addr || []);
      setFormData((prev) => ({
        ...prev,
        userName: u?.name || "",
        mobileNumber: u?.phone || ""
      }));
    });
  }, [status, token]);

  /* ================= TOTALS ================= */
  const totalItems = Number(cartItems.reduce(
    (t, i) => t + Number(i.quantity),
    0
  ));

  const productsTotal = Number(cartItems.reduce(
    (t, i) =>
      t + (Number(i.discountedPrice) > 0 ? Number(i.discountedPrice) : Number(i.unitPrice)) * Number(i.quantity),
    0
  ));

  const originalTotal = Number(cartItems.reduce(
    (t, i) => t + Number(i.unitPrice) * Number(i.quantity),
    0
  ));

  console.log('cartItems', productsTotal, originalTotal);
  const discountSaving = (originalTotal - productsTotal);

  /* ================= SHIPPING ================= */
  const fetchShippingFee = async () => {
    console.log('zone', token, productsTotal);
    if (!token || productsTotal <= 0) return;

    const zone = formData.shippingZip?.trim() || formData.shippingCity?.trim();// || "default";
    const check = {label: "Selected Shipping Option", value: ""};

    if (!zone) {
      setDeliveryCharges([]);
      setDeliveryChargesOptions([check]);
      setFormData((prev) => ({
        ...prev,shippingId: ""  }));
      setDeliveryCharge({});
      return;
    }
    const shipping = await getApplicableShippingFee(
      zone,
      productsTotal,
      token
    );
    if (!shipping || shipping?.length <= 0) {
      setDeliveryCharges([]);
      setDeliveryChargesOptions([check]);
      setFormData((prev) => ({
        ...prev,shippingId: ""  }));
      setDeliveryCharge({});
      return;
    }
    setDeliveryCharges(shipping)
    setDeliveryChargesOptions(shipping.map((s) => ({
      value: s.id,
      label: `${s.deliveryType.name} - £${s.feeAmount} (Ex. VAT)`
    })));
    setFormData((prev) => ({
      ...prev,
      shippingId: shipping[0]?.id || ""
    }));
    setDeliveryCharge(shipping[0] || {});
  };

  useEffect(() => {
    if (formData.shippingCity || formData.shippingZip) {
      fetchShippingFee();
    }
  }, [
    formData.shippingCity,
    formData.shippingZip,
    productsTotal,
    token
  ]);

  /* ================= COUPON ================= */
  const handleApplyDiscount = async (e) => {
    e.preventDefault();

    const res = await applyCoupon(productsTotal, coupon, token);

    if (res?.discount) {
      let discount = res.discount.amount;

      setCouponDetail({ ...res.discount, discount: Number(discount) });

      toast.success("Coupon applied");
    }
  };

  /* ================= APPLY CHARGES ================= */
  const baseAmount =
    productsTotal +
    (Number(deliveryCharge.feeAmount) || 0) -
    (Number(couponDetail?.discount) || 0);


  useEffect(() => {
    if (!token || baseAmount <= 0) return;

    applyCharges(baseAmount, token).then((res) => {
      if (res) setChargesResult(res);
    });
  }, [baseAmount, token]);

  const finalPayableAmount =
    Number(chargesResult.totalPay) || Number(baseAmount);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBillingChange = (e) => {
    const value = e.target.value;
    if (showBilling) {
      if (!value) {
        setFormData({
          ...formData,
          billingStreet: "",
          billingCity: "",
          billingState: "",
          billingCountry: "",
          billingZip: ""
        });
        return;
      }
      const data = address[value];
      const shippingStreet = data.street;
      const shippingCity = data.city;
      const shippingState = data.stateOrProvince;
      const shippingCountry = data.country;
      const shippingZip = data.zip;
      setFormData({
        ...formData,
        billingStreet: shippingStreet,
        billingCity: shippingCity,
        billingState: shippingState,
        billingCountry: shippingCountry,
        billingZip: shippingZip
      });
    } else {
      if (!value) {
        setFormData({
          ...formData,
          shippingStreet: "",
          shippingCity: "",
          shippingState: "",
          shippingCountry: "",
          shippingZip: "",
          billingStreet: "",
          billingCity: "",
          billingState: "",
          billingCountry: "",
          billingZip: ""
        });
        return;
      }
      const data = address[value];
      const shippingStreet = data.street;
      const shippingCity = data.city;
      const shippingState = data.stateOrProvince;
      const shippingCountry = data.country;
      const shippingZip = data.zip;
      setFormData({
        ...formData,
        shippingStreet,
        shippingCity,
        shippingState,
        shippingCountry,
        shippingZip,
        billingStreet: shippingStreet,
        billingCity: shippingCity,
        billingState: shippingState,
        billingCountry: shippingCountry,
        billingZip: shippingZip
      });
    }
  };

  const handleShippingChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setFormData({
        ...formData,
        shippingStreet: "",
        shippingCity: "",
        shippingState: "",
        shippingCountry: "",
        shippingZip: ""
      });
      return;
    }
    const data = address[value];
    const shippingStreet = data.street;
    const shippingCity = data.city;
    const shippingState = data.stateOrProvince;
    const shippingCountry = data.country;
    const shippingZip = data.zip;
    setFormData({
      ...formData,
      shippingStreet,
      shippingCity,
      shippingState,
      shippingCountry,
      shippingZip
    });
  };

  const handleIsShipping = () => {
    if (!showBilling) {
      setFormData({
        ...formData,
        billingStreet: "",
        billingCity: "",
        billingState: "",
        billingCountry: "",
        billingZip: ""
      });
    } else {
      setFormData({
        ...formData,
        billingStreet: formData.shippingStreet,
        billingCity: formData.shippingCity,
        billingState: formData.shippingState,
        billingCountry: formData.shippingCountry,
        billingZip: formData.shippingZip
      });
    }
    setShowShipping(!showBilling);
  };

  const validateCheckoutForm = (formData, showBilling) => {
    const errors = {};

    /* =========================
      BASIC USER INFO
    ========================= */
    if (!formData.userName?.trim()) {
      errors.userName = "Name is required";
    }

    if (!formData.mobileNumber?.trim()) {
      errors.mobileNumber = "Phone number is required";
    }

    /* =========================
      SHIPPING ADDRESS (ALWAYS)
    ========================= */
    const shippingFields = [
      "shippingStreet",
      "shippingCity",
      // "shippingState",
      "shippingZip",
      "shippingCountry",
    ];

    shippingFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        errors[field] = "Required";
      }
    });

    if (
      formData.shippingZip &&
      formData.shippingCountry &&
      !validator.isPostalCode(
        formData.shippingZip,
        formData.shippingCountry
      )
    ) {
      errors.shippingZip = "Invalid postal code for selected country";
    }
    /* =========================
      BILLING ADDRESS (OPTIONAL)
    ========================= */
    if (showBilling) {
      const billingFields = [
        "billingStreet",
        "billingCity",
        // "billingState",
        "billingCountry",
        "billingZip",
      ];

      billingFields.forEach((field) => {
        if (!formData[field]?.trim()) {
          errors[field] = "Required";
        }
      });
    }

    if (
      formData.billingZip &&
      formData.billingCountry &&
      !validator.isPostalCode(
        formData.billingZip,
        formData.billingCountry
      )
    ) {
      errors.billingZip = "Invalid postal code for selected country";
    }

    /* =========================
      ORDER META
    ========================= */
    if (!formData.paid) {
      errors.paid = "Payment method is required";
    }

    if (!formData.status) {
      errors.status = "Order status is required";
    }

    /* =========================
      TERMS
    ========================= */
    if (!formData.terms) {
      errors.terms = "Please accept terms & conditions";
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (paymentMethodId) => {
    setIsProcessing(true);

    try {
      /* ===============================
        1️⃣ VALIDATION
      =============================== */
      const { valid, errors } = validateCheckoutForm(formData, showBilling);
      
      setErrors(errors);

      if (!valid) {
        toast.error("Please fix validation errors");
        return;
      }

      /* ===============================
        2️⃣ PREPARE ORDER
      =============================== */
      const orderData = {
        ...formData,
        email: user.email,
        products: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.discountedPrice ?? item.unitPrice,
        })),
        discountIds: couponDetail?.id
          ? [couponDetail.id]
          : [],
        ShippingAmount: deliveryCharge.feeAmount || 0,
        total: finalPayableAmount,
        actualAmount: finalPayableAmount,
        discountPrice: couponDetail?.discount || 0,
      };

      if (!showBilling) {
        orderData.billingStreet = orderData.shippingStreet;
        orderData.billingCity = orderData.shippingCity;
        orderData.billingState = orderData.shippingState;
        orderData.billingCountry = orderData.shippingCountry;
        orderData.billingZip = orderData.shippingZip;
      }

      /* ===============================
        3️⃣ CREATE ORDER (PENDING)
      =============================== */
      const orderResponse = await addOrder(token, orderData);

      if (!orderResponse?.order?.id) {
        throw new Error("Order creation failed");
      }

      const orderId = orderResponse.order.id;

      /* ===============================
        4️⃣ CREATE PAYMENT INTENT
      =============================== */
      const { clientSecret } = await createStripePaymentIntent(orderId, token);

      /* ===============================
        5️⃣ CONFIRM CARD PAYMENT
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
        6️⃣ SUCCESS
      =============================== */
      if (paymentIntent.status === "succeeded") {
        await clearUserCart(token);
        toast.success("Payment successful!");
        router.push(`/order/${orderResponse.order.orderNumber}`);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(err.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
      <div className="checkout-page-wrapper section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="checkout-billing-details-wrap">
                <h5 className="checkout-title">Billing Details</h5>
                <div className="billing-form-wrap">
                  <form action="#">
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="single-input-item">
                          <label htmlFor="name" className="required">
                            Name
                          </label>
                          <input
                            onChange={(e) => handleChange(e)}
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            placeholder="Name"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <div className="single-input-item">
                          <label htmlFor="mobileNumber">Phone Number</label>

                          <PhoneInput
                            country={'in'} // default country (change if needed)
                            value={formData.mobileNumber?.replace("+", "")}
                            onChange={(phone, countryData, e, formattedValue) => {                          
                              handleChange({
                                target: {
                                  name: 'mobileNumber',
                                  value: "+" + phone
                                }
                              })
                            }}
                            inputProps={{
                              name: 'mobileNumber',
                              required: true,
                              id: 'mobileNumber'
                            }}
                            inputClass="pl-8"
                            containerClass="w-100"
                          // enableSearch={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="single-input-item">
                      <label htmlFor="email" className="required">
                        Email Address
                      </label>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="email"
                        id="email"
                        value={user.email}
                        placeholder="Email Address"
                        required
                        readOnly
                      />
                    </div>

                    <div>

                      <div className="single-input-item d-flex align-items-center">
                        <h5 className="checkout-title py-2 px-0 m-0">
                          Shiping Address
                        </h5>
                        <select
                          className="address-select py-2"
                          onChange={handleShippingChange}
                        >
                          <option id="billing" value="">
                            Enter Address Manualy
                          </option>
                          {address.map((item, i) => (
                            <option key={`address-${i}`} value={i}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="single-input-item">
                        {/* <label htmlFor="shippingStreet" className="required mt-20">Street address</label> */}
                        <input
                          onChange={(e) => handleChange(e)}
                          type="text"
                          id="shippingStreet"
                          name="shippingStreet"
                          value={formData.shippingStreet}
                          placeholder="Street Address"
                          required
                          className={errors.shippingStreet ? "error-input" : ""}
                        />
                        {errors.shippingStreet && (
                          <span className="error-message">
                            {errors.shippingStreet}
                          </span>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="single-input-item">
                            {/* <label htmlFor="shippingCity" className="required">Town / City</label> */}
                            <input
                              onChange={(e) => handleChange(e)}
                              type="text"
                              id="shippingCity"
                              name="shippingCity"
                              value={formData.shippingCity}
                              placeholder="Town / City"
                              required
                              className={errors.shippingCity ? "error-input" : ""}
                            />
                        {errors.shippingCity && (
                          <span className="error-message">
                            {errors.shippingCity}
                          </span>
                        )}
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="single-input-item">
                            {/* <label htmlFor="shippingState">County / Region</label> */}
                            <input
                              onChange={(e) => handleChange(e)}
                              type="text"
                              id="shippingState"
                              name="shippingState"
                              value={formData.shippingState}
                              placeholder="County / Region"
                              className={errors.shippingState ? "error-input" : ""}
                            />
                        {errors.shippingState && (
                          <span className="error-message">
                            {errors.shippingState}
                          </span>
                        )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="single-input-item">
                            {/* <label htmlFor="shippingZip" className="required">Postcode / ZIP</label> */}
                            <input
                              onChange={(e) => handleChange(e)}
                              type="text"
                              id="shippingZip"
                              name="shippingZip"
                              value={formData.shippingZip}
                              placeholder="Postcode / ZIP"
                              required
                              className={errors.shippingZip ? "error-input" : ""}
                            />
                                {errors.shippingZip && (
                                  <span className="error-message">
                                    {errors.shippingZip}
                                  </span>
                                )}
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="single-input-item">
                            {/* <label htmlFor="shippingCountry" className="required">Country</label> */}
                            <Select
                              options={countryOptions}
                              value={countryOptions.find(
                                (c) => c.value === formData.shippingCountry
                              )}
                              onChange={(option) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  shippingCountry: option.value
                                }))
                              }
                              placeholder="Select Country"
                            />
                                {errors.shippingCountry && (
                                  <span className="error-message">
                                    {errors.shippingCountry}
                                  </span>
                                )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="checkout-box-wrap">
                      <div className="single-input-item">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            onChange={handleIsShipping}
                            checked={showBilling}
                            className="custom-control-input"
                            id="ship_to_different"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="ship_to_different"
                          >
                            Bill to a different address?
                          </label>
                        </div>
                      </div>
                      <div
                        className={
                          showBilling ? "" : "ship-to-different single-form-row"
                        }>
                        <div className="single-input-item d-flex align-items-center">
                          <h5 className="checkout-title py-2 px-0 m-0">
                            Billing Address
                          </h5>
                          <select
                            className="address-select py-2"
                            onChange={handleBillingChange}
                          >
                            <option id="shipping" value="">
                              Enter Address Manualy
                            </option>
                            {address.map((item, i) => (
                              <option key={`address-${i}`} value={i}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <div className="single-input-item">
                            <input
                              onChange={(e) => handleChange(e)}
                              type="text"
                              id="billingStreet"
                              name="billingStreet"
                              value={formData.billingStreet}
                              placeholder="Street address Line 1"
                              className={errors.billingStreet ? "error-input" : ""}
                            />
                            {errors.billingStreet && (
                              <span className="error-message">
                                {errors.billingStreet}
                              </span>
                            )}
                          </div>

                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="single-input-item">
                                <input
                                  onChange={(e) => handleChange(e)}
                                  type="text"
                                  id="billingCity"
                                  name="billingCity"
                                  value={formData.billingCity}
                                  placeholder="Town / City"
                                  className={errors.billingCity ? "error-input" : ""}
                                />
                                {errors.billingCity && (
                                  <span className="error-message">
                                    {errors.billingCity}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="single-input-item">
                                <input
                                  onChange={(e) => handleChange(e)}
                                  type="text"
                                  id="billingState"
                                  name="billingState"
                                  value={formData.billingState}
                                  placeholder="County / Region"
                                  className={errors.billingState ? "error-input" : ""}
                                />
                                {errors.billingState && (
                                  <span className="error-message">
                                    {errors.billingState}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="single-input-item">
                                <input
                                  onChange={(e) => handleChange(e)}
                                  type="text"
                                  id="billingZip"
                                  name="billingZip"
                                  value={formData.billingZip}
                                  placeholder="Postcode / ZIP"
                                  className={errors.billingZip ? "error-input" : ""}
                                />
                                {errors.billingZip && (
                                  <span className="error-message">
                                    {errors.billingZip}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="single-input-item">
                                <Select
                                  options={countryOptions}
                                  value={countryOptions.find(
                                    (c) => c.value === formData.billingCountry
                                  )}
                                  onChange={(option) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      billingCountry: option.value
                                    }))
                                  }
                                  placeholder="Select Country"
                                />
                                {errors.billingCountry && (
                                  <span className="error-message">
                                    {errors.billingCountry}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="single-input-item">
                      <label htmlFor="customerRemarks">Order Note</label>
                      <textarea
                        onChange={(e) => handleChange(e)}
                        name="customerRemarks"
                        value={formData.customerRemarks}
                        id="customerRemarks"
                        cols="30"
                        rows="3"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="order-summary-details">
                <h5 className="checkout-title" style={{marginBlockEnd: 0}}>Select Delivery Charge</h5>
                  <div className="order-summary-content" style={{marginBlockStart: 0}}>
                    <div className="">
                      <Select
                        options={deliveryChargesOptions}
                        value={deliveryChargesOptions.find(
                          (c) => c.value === formData.shippingId
                        )}
                        onChange={(option) =>{
                          setFormData((prev) => ({
                            ...prev,
                            shippingId: option.value
                          }))
                          setDeliveryCharge(deliveryCharges.find(dc => dc.id === option.value) || {})
                        }
                        }
                        placeholder="Select shipping option"
                      />
                      {errors.shippingId && (
                        <span className="error-message">
                          {errors.shippingId}
                        </span>
                      )}
                    </div>
                  </div>
              </div>
              <div className="order-summary-details mt-5">
                <h5 className="checkout-title">Your Order Summary</h5>

                <div className="order-summary-content">
                  <div className="priceDetailsContent">

                    {/* Products total */}
                    <div className="priceRow">
                      <span>Sub Total ({totalItems} items)</span>
                      <span>£{Number(productsTotal).toFixed(2)} (Ex. VAT)</span>
                    </div>

                    {/* Coupon */}
                    {couponDetail?.discount > 0 && (
                      <div className="priceRow">
                        <span>
                          Applied Coupon ({couponDetail.code})
                        </span>
                        <span>
                          - £{Number(couponDetail.discount).toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/* Shipping */}
                    <div className="priceRow">
                      <span>Delivery Charges</span>
                      <span>£{Number(deliveryCharge.feeAmount || 0).toFixed(2)} (Ex. VAT)</span>
                    </div>

                    {/* Charges breakdown */}
                    {chargesResult.charges?.length > 0 &&
                      chargesResult.charges.map((charge, index) => (
                        <div className="priceRow" key={`charge-${index}`}>
                          <span>{charge.name}</span>
                          <span>£{Number(charge.amount).toFixed(2)}</span>
                        </div>
                      ))}

                    {/* Final total */}
                    <div className="totalAmountRow">
                      <span>Total Amount</span>
                      <span>£{Number(finalPayableAmount).toFixed(2)} (Inc. VAT)</span>
                    </div>
                  </div>

                  {/* Coupon input */}
                  <div className="apply-coupon-wrapper">
                    <input
                      type="text"
                      name="discount"
                      placeholder="Enter Coupon Code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="couponInput"
                    />
                    <button
                      onClick={handleApplyDiscount}
                      className="btn btn-sqr"
                    >
                      Apply
                    </button>

                    {couponDetail.error && (
                      <p className="errorMessage">{couponDetail.error}</p>
                    )}
                  </div>

                  {/* Savings */}
                  <p className="savingsMessage">
                    You will save £
                    {(
                      (discountSaving) +
                      (couponDetail?.discount || 0)
                    ).toFixed(2)}{" "}
                    on this order
                  </p>

                  {/* Payment */}
                  {deliveryCharges.length > 0 && <div className="order-payment-method">
                    <div className="summary-footer-area">

                      <div
                        className={`custom-control custom-checkbox mb-20 ${errors.terms ? "error-input" : ""
                          }`}
                      >
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="terms"
                          name="terms"
                          required
                          onChange={handleChange}
                          checked={formData.terms}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="terms"
                        >
                          I have read and agree to the website{" "}
                          <a href="/terms-and-conditions">terms and conditions.</a>
                        </label>
                      </div>

                      {errors.terms && (
                        <span className="error-message">
                          {errors.terms}
                        </span>
                      )}

                      <PaymentForm
                        handlePayment={handleSubmit}
                        isProcessing={isProcessing}
                      />
                    </div>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

// Export the wrapped component
export default function Checkout() {
  return (
    <PaymentWrapper>
      <CheckoutPage />
    </PaymentWrapper>
  );
}
