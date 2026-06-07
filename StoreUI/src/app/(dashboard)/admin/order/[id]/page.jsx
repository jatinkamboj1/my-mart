"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUserOrder, userOrder } from "@/app/api/orders";
import Select from "react-select";
import Image from "next/image";
import { convertS3UrlToLocalPath } from "@/utils/util";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

const Page = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.token;

  const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "CONFIRMED", label: "Confirmed" },
    { value: "IN_TRANSIT", label: "In Transit" },
    { value: "DELIVERED", label: "Delivered" }
  ];

  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [shipmentTracking, setShipmentTracking] = useState([]);
  const [user, setUser] = useState();
  const [subTotal, setSubTotal] = useState(0);

  // Form State
  const [formState, setFormState] = useState({
    vendorRemarks: "",
    addressId: "",
    status: ""
  });

  useEffect(() => {
    if (token) fetchOrder();
  }, [token]);

  const fetchOrder = async () => {
    try {
      const data = await userOrder(token, id);
      // Reset state before setting
      setProducts([]);

      setOrder(data);

      setFormState({
        customerRemarks: data.customerRemarks,
        addressId: data.addressId,
        shippingStreet: data.shippingStreet,
        shippingCity: data.shippingCity,
        shippingState: data.shippingState,
        shippingCountry: data.shippingCountry,
        shippingZip: data.shippingZip,
        billingStreet: data.billingStreet,
        billingCity: data.billingCity,
        billingState: data.billingState,
        billingCountry: data.billingCountry,
        billingZip: data.billingZip,
        status: data.status,
      });

      setUser(data.user);

      const newProducts = [];

      // data.products.forEach((item) => {
      //   if (item.productId === null && item.productVariant) {
      //     item.productVariant.stock = item.quantity;
      //     newProductVarients.push(item.productVariant);
      //   } else if (item.product) {
      //     item.product.stock = item.quantity;
      //     newProducts.push(item.product);
      //   }
      // });

      setProducts(data.products);
      const productTotal =
        data.products.reduce(
          (subTotal, product) => subTotal + product.price * product.quantity,
          0
        ) || 0;

      setSubTotal(productTotal);
      setPayments(data.payments);
      setShipmentTracking(data.shipmentTracking);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const handleNoteChange = (e) => {
    e.preventDefault();
    setFormState((prev) => {
      return { ...prev, vendorRemarks: e.target.value };
    });
  };

  const handleStatusChange = (selectedOption) => {
    setFormState((prev) => {
      return { ...prev, status: selectedOption.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateUserOrder(formState, order.id, token);
    if (response) {
      toast.success("Successfully Updated Order");
      router.push("/admin/order");
    }
  };

  const handleBillingChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setFormState({
        ...formState,
        billingStreet: "",
        billingCity: "",
        billingState: "",
        billingCountry: "",
        billingZip: ""
      });
      return;
    }
    const data = user.Address[value];
    const billingStreet = data.street;
    const billingCity = data.city;
    const billingState = data.stateOrProvince;
    const billingCountry = data.country;
    const billingZip = data.zip;
    setFormState({
      ...formState,
      billingStreet,
      billingCity,
      billingState,
      billingCountry,
      billingZip,
    });
  };

  const handleShippingChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setFormState({
        ...formState,
        shippingStreet: '',
        shippingCity: '',
        shippingState: '',
        shippingCountry: '',
        shippingZip: ''
      });
      return;
    }
    const data = user.Address[value];
    const shippingStreet = data.street;
    const shippingCity = data.city;
    const shippingState = data.stateOrProvince;
    const shippingCountry = data.country;
    const shippingZip = data.zip;
    setFormState({
      ...formState,
      shippingStreet,
      shippingCity,
      shippingState,
      shippingCountry,
      shippingZip,
    });
  };

  if (!order) return <LoadingScreen />;
  return (
    <div
      className="container container--max--xl"
    // style={{ position: "relative " }}
    >
      <div className="py-5">
        <div className="row g-4 align-items-center">
          <div className="col">
            <h1 className="h3 m-0">Order Details</h1>
          </div>
          <div className="col-auto d-flex gap-4">
            {(!order.isPaid || (!order.isPaid && order.paymentType === "COD")) && (
              <button
                type="button"
                className="btn btn-secondary"
              // onClick={handlePaidClick}
              >
                Paid
              </button>
            )}

            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => handleSubmit(e)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="sa-page-meta mb-5">
        <div className="sa-page-meta__body">
          <div className="sa-page-meta__list">
            <div className="sa-page-meta__item">
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div className="sa-page-meta__item">
              {order?.products?.length} items
            </div>
            <div className="sa-page-meta__item">Total ₹{subTotal}</div>
            <div className="sa-page-meta__item d-flex align-items-center fs-6">
              <span className="badge badge-sa-success me-2">
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </div>
            <div className="sa-page-meta__item d-flex align-items-center fs-6">
              <span className="badge badge-sa-warning me-2">
                {order.paymentType}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="sa-entity-layout sa-entity-layout--size--md">
        <div className="sa-entity-layout__body">
          <div className="sa-entity-layout__main">
            <div className="mt-5 bg-white p-4 position-relative d-flex align-items-center justify-content-between gap-3" >
              <h6 className="m-0">Order Status:</h6>
              <Select
                options={statusOptions}
                value={statusOptions.find(
                  (opt) => opt.value === formState.status
                )}
                onChange={handleStatusChange}
                className="w-50"
              />
            </div>
            <div className="mt-5 bg-white p-4 sa-card-area">
              <span>Customer Note:</span>
              <textarea
                className="sa-card-area__area"
                rows={2}
                placeholder="Customer didn't leave any notes"
                value={formState.customerRemarks}
                readOnly
              />
            </div>
            <div className="mt-5 bg-white p-4 sa-card-area">
              <span>Vendor Note:</span>
              <textarea
                className="sa-card-area__area"
                rows={2}
                placeholder="Write a note for customer (e.g. expected delivery time, etc)"
                value={formState.vendorRemarks}
                onChange={(e) => handleNoteChange(e)}
              />

              <div className="sa-card-area__card" style={{ top: "auto", left: "auto", zIndex: 0 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-edit"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
            </div>

            {/* Items */}
            <div className="card mt-5">
              <div className="card-body px-5 py-4 d-flex align-items-center justify-content-between">
                <h2 className="mb-0 fs-exact-18 me-4">Items</h2>
              </div>
              <div className="table-responsive">
                <table className="sa-table">
                  <tbody>
                    {products.length > 0 &&
                      products.map((item) => (
                        <tr key={item.id}>
                          <td className="min-w-20x">
                            <div className="d-flex align-items-center">
                              <a href={`/product/${item.slug}`} className="text-reset">
                                {item.name || "Unknown Product"}
                              </a>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="sa-price">
                              <span className="sa-price__symbol">₹</span>
                              <span className="sa-price__integer">
                                {item.price || 0}
                              </span>
                            </div>
                          </td>
                          <td className="text-center" style={{ textWrapMode: "nowrap" }}>x {item.quantity}</td>
                          <td className="text-end">
                            <div className="sa-price">
                              <span className="sa-price__symbol">₹</span>
                              <span className="sa-price__integer">
                                {Number(item.price || 0) * item.quantity}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tbody className="sa-table__group">
                    {/* Sub Total */}
                    <tr>
                      <td colSpan="3">Product Price</td>
                      <td className="text-end">
                        <div className="sa-price">
                          <span className="sa-price__symbol">₹</span>
                          <span className="sa-price__integer">
                            {Number(order?.summary["Sub Total"] || 0).toFixed(2)}
                          </span>
                        </div>
                      </td>
                    </tr>

                    {/* Delivery Charges */}
                    <tr>
                      <td colSpan="3">Shipping</td>
                      <td className="text-end">
                        <div className="sa-price">
                          {Number(order?.summary["Delivery Charges"]) === 0 ? (
                            <span className="sa-price__integer text-success fw-semibold">
                              FREE
                            </span>
                          ) : (
                            <>
                              <span className="sa-price__symbol">₹</span>
                              <span className="sa-price__integer">
                                {Number(order?.summary["Delivery Charges"]).toFixed(2)}
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Additional Charges (e.g. VAT) */}
                    {order?.summary?.Charges?.map((charge, index) => (
                      <tr key={index}>
                        <td colSpan="3" className="text-capitalize">
                          {charge.name}
                        </td>
                        <td className="text-end">
                          <div className="sa-price">
                            <span className="sa-price__symbol">₹</span>
                            <span className="sa-price__integer">
                              {Number(charge.amount).toFixed(2)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tbody className="sa-table__group">
                    {/* Coupons / Discounts */}
                    {order?.summary?.Coupons?.map((coupon, index) => (
                      <tr key={index}>
                        <td colSpan="3">
                          Discount
                          {coupon.code && (
                            <div className="small text-success">
                              Code: <span className="fw-semibold">{coupon.code}</span>
                            </div>
                          )}
                        </td>
                        <td className="text-end">
                          <div className="sa-price">
                            <span className="sa-price__integer text-danger fw-semibold">
                              - ₹{Number(coupon.amount).toFixed(2)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tbody>
                    {/* Total Amount */}
                    <tr>
                      <td colSpan="3">Total</td>
                      <td className="text-end">
                        <div className="sa-price">
                          <span className="sa-price__symbol">₹</span>
                          <span className="sa-price__integer">
                            {Number(order?.summary["Total Amount"]).toFixed(2)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-5 bg-white p-4 sa-card-area">
              <div className="card-body px-5 py-4 d-flex align-items-center justify-content-between">
                <h2 className="mb-0 fs-exact-18 me-4">Payment Details</h2>
              </div>

              <div className="table-responsive">
                <table className="sa-table">
                  {/* No Payment */}
                  {!payments || payments.length === 0 ? (
                    <tbody className="sa-table__group">
                      <tr>
                        <td colSpan="4" className="text-center">
                          No payment found
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    payments.map((payment) => (
                      <tbody className="sa-table__group" key={payment.id} style={{ backgroundColor: "whitesmoke", borderBottom: "1rem solid white" }}>

                        {/* Payment Intent */}
                        <tr>
                          <td colSpan="3">Payment Intent</td>
                          <td className="text-end">{payment.paymentIntentId}</td>
                        </tr>

                        {/* Method */}
                        {payment.method && (
                          <tr>
                            <td colSpan="3">Payment Method</td>
                            <td className="text-end">
                              {payment.method}
                            </td>
                          </tr>
                        )}

                        {/* Method */}
                        {payment.captureMethod && (
                          <tr>
                            <td colSpan="3">Payment capture method</td>
                            <td className="text-end">
                              {payment.captureMethod}
                            </td>
                          </tr>
                        )}

                        {/* Amount */}
                        <tr>
                          <td colSpan="3">Amount</td>
                          <td className="text-end">
                            ₹{Number(payment.amount).toFixed(2)}
                          </td>
                        </tr>

                        {/* Status */}
                        <tr>
                          <td colSpan="3">Payment Status</td>
                          <td className="text-end">
                            {payment.status === "SUCCEEDED" ? (
                              <span className="badge bg-success">Succeeded</span>
                            ) : payment.status === "PENDING" ? (
                              <span className="badge bg-warning">Pending</span>
                            ) : payment.status === "FAILED" ? (
                              <span className="badge bg-danger">Failed</span>
                            ) : (
                              payment.status
                            )}
                          </td>
                        </tr>

                        {/* Captured */}
                        <tr>
                          <td colSpan="3">Amount Captured</td>
                          <td className="text-end">
                            ₹{Number(payment.amountCaptured || 0).toFixed(2)}
                          </td>
                        </tr>

                        {/* Refunded */}
                        {Number(payment.amountRefunded) > 0 && (
                          <tr>
                            <td colSpan="3">Amount Refunded</td>
                            <td className="text-end text-danger">
                              - ₹{Number(payment.amountRefunded).toFixed(2)}
                            </td>
                          </tr>
                        )}

                        {/* Currency */}
                        <tr>
                          <td colSpan="3">Currency</td>
                          <td className="text-end">{payment.currency}</td>
                        </tr>

                        {/* receiptUrl */}
                        {payment.receiptUrl && (
                          <tr>
                            <td colSpan="3">Receipt URL</td>
                            <td className="text-end">
                              {payment.receiptUrl}
                            </td>
                          </tr>
                        )}

                      </tbody>
                    ))
                  )}
                </table>
              </div>
            </div>

            <div className="mt-5 bg-white p-4 sa-card-area">
              <div className="card-body px-5 py-4 d-flex align-items-center justify-content-between">
                <h2 className="mb-0 fs-exact-18 me-4">Shipment Details</h2>
              </div>

              <div className="table-responsive">
                <table className="sa-table">
                  <tbody className="sa-table__group">

                    <tr>
                      <td colSpan="3">Provider</td>
                      <td className="text-end">{shipmentTracking?.provider || "-"}</td>
                    </tr>

                    <tr>
                      <td colSpan="3">Service</td>
                      <td className="text-end">{shipmentTracking?.service || "-"}</td>
                    </tr>

                    <tr>
                      <td colSpan="3">Status</td>
                      <td className="text-end">
                        {shipmentTracking?.status === "CREATED" ? (
                          <span className="badge bg-secondary">Created</span>
                        ) : shipmentTracking?.status === "DESPATCHED" ? (
                          <span className="badge bg-info">Despatched</span>
                        ) : shipmentTracking?.status === "IN_TRANSIT" ? (
                          <span className="badge bg-warning">In Transit</span>
                        ) : shipmentTracking?.status === "DELIVERED" ? (
                          <span className="badge bg-success">Delivered</span>
                        ) : (
                          shipmentTracking?.status || "-"
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="3">Order Reference</td>
                      <td className="text-end">{shipmentTracking?.orderReference || "-"}</td>
                    </tr>

                    <tr>
                      <td colSpan="3">Courier Order ID</td>
                      <td className="text-end">{shipmentTracking?.orderIdentifier || "-"}</td>
                    </tr>

                    <tr>
                      <td colSpan="3">Tracking Number</td>
                      <td className="text-end">
                        {shipmentTracking?.trackingNumber ? (
                          shipmentTracking.trackingNumber
                        ) : (
                          <span className="text-muted">Not generated</span>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="3">Packages</td>
                      <td className="text-end">
                        {shipmentTracking?.packageDetails?.length || 0}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="3">Last Event</td>
                      <td className="text-end">{shipmentTracking?.lastEvent || "-"}</td>
                    </tr>

                    <tr>
                      <td colSpan="3">Last Event Time</td>
                      <td className="text-end">
                        {shipmentTracking?.lastEventAt
                          ? new Date(shipmentTracking.lastEventAt).toLocaleString()
                          : "-"}
                      </td>
                    </tr>

                    {shipmentTracking?.labelUrl && (
                      <tr>
                        <td colSpan="3">Shipping Label</td>
                        <td className="text-end">
                          <a
                            href={shipmentTracking.labelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-primary"
                          >
                            Download Label
                          </a>
                        </td>
                      </tr>
                    )}
                    {shipmentTracking?.packageDetails?.map((pkg, i) => (
                      <tr key={i}>
                        <td colSpan="3">Package #{pkg.packageNumber}</td>
                        <td className="text-end">
                          {pkg.trackingNumber || "No tracking yet"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* User */}
          {user !== undefined && (
            <div className="sa-entity-layout__sidebar">
              <div className="card">
                <div className="card-body d-flex align-items-center justify-content-between pb-0 pt-4">
                  <h2 className="fs-exact-16 mb-0">Customer</h2>
                </div>
                <div className="card-body pt-4 fs-exact-14">
                  <div className="card-body d-flex align-items-center pt-4 px-0">
                    <div className="sa-symbol sa-symbol--shape--circle sa-symbol--size--lg">
                      <img
                        width={40}
                        height={40}
                        src="/assets/Avtar.png"
                        alt=""
                      />
                    </div>
                    <div className="ms-3 ps-2">
                      <div className="fs-exact-14 fw-medium">{user.name}</div>
                      <div className="fs-exact-13 text-muted">
                        This is a first order
                      </div>
                    </div>
                  </div>
                  <div>{user.name}</div>
                  <div className="mt-1">
                    <a href="#">{user.email}</a>
                  </div>
                  <div className="text-muted mt-1">{user.phone}</div>
                </div>
              </div>
              <div className="card mt-5">
                <div className="card-body d-flex align-items-center justify-content-between pb-0 pt-4">
                  <h2 className="fs-exact-16 mb-0">Shiping Address </h2>
                </div>
                <div className="card-body pt-4 fs-exact-14">
                  <div className="single-input-item">
                    <label htmlFor="billing" className="form-label">Select Shipping Address</label>
                    <select className="address-form-select" onChange={handleShippingChange}>
                      <option id="billing" value="">Enter Address Manualy</option>
                      {user?.Address && user?.Address.map((item, i) => (
                        <option key={`address-${i}`} value={i}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="address-form">
                    {[
                      { label: "Street", name: "shippingStreet" },
                      { label: "City", name: "shippingCity" },
                      { label: "State/Province", name: "shippingState" },
                      { label: "ZIP Code", name: "shippingZip" },
                      { label: "Country", name: "shippingCountry" },
                    ].map(({ label, name }) => (
                      <div key={name} className="address-form-field">
                        <input
                          className="form-control mt-4"
                          type="text"
                          id={name}
                          name={name}
                          value={formState[name]}
                          onChange={(e) => handleChange(name, e.target.value)}
                          placeholder={label}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card mt-5">
                <div className="card-body d-flex align-items-center justify-content-between pb-0 pt-4">
                  <h2 className="fs-exact-16 mb-0">Billing Address </h2>
                </div>
                <div className="card-body pt-4 fs-exact-14">
                  <div className="single-input-item">
                    <label htmlFor="shipping" className="form-label">Select Billing Address</label>
                    <select className="address-form-select" onChange={handleBillingChange}>
                      <option id="shipping" value="">Enter Address Manualy</option>
                      {user?.Address && user?.Address.map((item, i) => (
                        <option key={`address-${i}`} value={i}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="address-form">
                    {[
                      { label: "Street", name: "billingStreet" },
                      { label: "City", name: "billingCity" },
                      { label: "State/Province", name: "billingState" },
                      { label: "ZIP Code", name: "billingZip" },
                      { label: "Country", name: "billingCountry" },
                    ].map(({ label, name }) => (
                      <div key={name} className="address-form-field">
                        <input
                          className="form-control mt-4"
                          type="text"
                          id={name}
                          name={name}
                          value={formState[name]}
                          onChange={(e) => handleChange(name, e.target.value)}
                          placeholder={label}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* {user.Address.map((address, index) => (
                <div className="card mt-5" key={index}>
                  <div className="card-body d-flex align-items-center justify-content-between pb-0 pt-4">
                    <h2 className="fs-exact-16 mb-0">
                      {address.addressType} Address
                    </h2>
                    <input
                      type="radio"
                      name="selectedAddress"
                      value={address.id}
                      checked={formState.addressId === address.id}
                      onChange={(e) => handleAddressChange(e, address.id)}
                      className="form-check-input"
                    />
                  </div>
                  <div className="card-body pt-4 fs-exact-14">
                    {user.name || "Unknown Name"}
                    <br />
                    {address.country || "Unknown Country"}
                    <br />
                    {address.zip || "Unknown Postal Code"}
                    <br />
                    {address.street || "Unknown Street"}
                  </div>
                </div>
              ))} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
