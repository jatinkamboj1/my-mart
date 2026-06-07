
"use client";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { fetchUserCart, removeItemFromCart, updateCartItemQuantity } from "@/app/api/cart";
import { useSession } from "next-auth/react";
import "@/styles/cartPage.scss";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import useCartStore from "@/store/cartStore";
import Link from "next/link";
import Image from "next/image";
import { convertS3UrlToLocalPath } from "@/utils/util";
import { applyCharges } from "@/app/api/charges";

const Page = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.token;
  const { fetchCart, cartItems, removeFromCart } = useCartStore();
  const [chargesResult, setChargesResult] = useState({
    totalPay: 0,
    charges: []
  });

  useEffect(() => {
    if (status === "authenticated" && token) {
      fetchCart(token);
    }
  }, [token]);

  // Decrease quantity
  const handleDecrement = (id) => {
    handleQuantityChange(id, "decrement");
  };

  // Increase quantity
  const handleIncrement = (id) => {
    handleQuantityChange(id, "increment");
  };

  const handleQuantityChange = async (cartItem, action) => {
    try {
      const cartItemId = cartItem.id;
      const totalQuantity = cartItem.product.stock;
      if ((action === "increment" && totalQuantity > cartItem.quantity) || (action === "decrement" && cartItem.quantity > 1)) {
        const updatedItem = await updateCartItemQuantity(token, cartItemId, action);
        if (updatedItem) {
          fetchCart(token);
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Remove item from cart
  const handleRemove = async (id) => {
    removeFromCart(token, id);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + ((item.unitPrice) * item.quantity),
    0
  );

  const baseAmount = cartItems.reduce(
    (total, item) => total + ((item?.discountedPrice ? item.discountedPrice : item.unitPrice) * item.quantity),
    0
  );

  
  const totalDisPrice = Number(chargesResult.totalPay) || Number(baseAmount);

  const disPrice = (totalPrice - baseAmount);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    if (!token || baseAmount <= 0) return;

    applyCharges(baseAmount, token).then((res) => {
      if (res) setChargesResult(res);
    });
  }, [baseAmount, token]);

  if (!cartItems) {
    return <LoadingScreen />
  }

  return (
    <div className="pageContainer">
      <div className="mainContainer">
        {/* Cart Items Section */}
        <div className="cartContainer">
          <h2 className="cartTitle">Shopping Basket</h2>

          {cartItems.length === 0 ? (
            <p className="emptyCartMessage">Your Basket is empty.</p>
          ) : (
            cartItems.map((item) => {
              let cart_item = item.product;
              if (item.productVariant) {
                cart_item.name = item.productVariant.variantName;
                cart_item.stock = item.productVariant.stock;
                cart_item.isVariant = true;
                cart_item.variantAttributes = item.productVariant.variantAttributes;
              }
              return (
                <div key={cart_item.id} className="cartItem">
                  <Link href={`/product/${cart_item.slug}`} className="imageContainer">
                    <img loading="eager" width={130} height={130}
                      src={cart_item?.images.length > 0 ? convertS3UrlToLocalPath(cart_item.images[0].url) : `${process.env.PLACEHOLDER_IMAGE}`}
                      alt={cart_item.name}
                      className="productImage"
                    />
                  </Link>

                  <div className="detailsContainer">
                    <Link href={`/product/${cart_item.slug}`} style={{ color: "black" }} className="productName">{cart_item.name}</Link>
                    <p className="productDescription">{cart_item.brandName}</p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p className="stockStatus">{cart_item.stock > 0 ? "In Stock" : "Out of Stock"}</p>
                      <p className="productPrice d-block d-md-none">₹{(item?.discountedPrice ?? item.unitPrice)} (Ex. VAT)</p>
                    </div>
                    {cart_item?.variantAttributes && cart_item.variantAttributes.map((item, index) => {
                      // Capitalize the first letter of the 'name'
                      const label = item.name.charAt(0).toUpperCase() + item.name.slice(1);

                      return (
                        <span className="productVarient" key={index} style={{ color: item.value }}>
                          {`${label}: ${item.value}`}
                        </span>
                      );
                    })}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div className="quantityControls">
                        <button className="quantityButton" onClick={() => handleDecrement(item)} >
                          <FaMinus />
                        </button>

                        <span className="quantityInput">{item.quantity}</span>

                        <button className="quantityButton" onClick={() => handleIncrement(item)} >
                          <FaPlus />
                        </button>
                      </div>
                      <button className="removeButton d-block d-md-none" onClick={() => handleRemove(item.id)}>
                        <FaTrashAlt />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className="d-none d-md-block d-flex">
                    <div className="price-box">
                      {item?.discountedPrice ? (
                        <>
                          <span className="price-old" style={{ marginInlineEnd: 8 }}>
                            <del>₹{Number(item.unitPrice).toFixed(2)} (Ex. VAT)</del>
                          </span>
                          <span className="productPrice">
                            ₹{Number(item.discountedPrice).toFixed(2)} (Ex. VAT)
                          </span>
                        </>
                      ) : (
                        <span className="productPrice">
                          ₹{Number(item.unitPrice).toFixed(2)} (Ex. VAT)
                        </span>
                      )}
                    </div>
                    {/* <p className="productPrice">₹{(item.discountedPrice ?? item.unitPrice)} (Ex. VAT)</p> */}
                    <button className="removeButton" onClick={() => handleRemove(item.id)}>
                      <FaTrashAlt />
                      <span>Remove </span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Price Details Section */}
        <div>
          <div className="priceDetailsContainer" >
            <h3 className="priceDetailsTitle">Price Details</h3>
            <div className="priceDetailsContent">
              <div className="priceRow">
                <span>Price ({totalItems} items)</span>
                <span>₹{Number(totalPrice).toFixed(2)} (Ex. VAT)</span>
              </div>
              <div className="priceRow">
                <span>Discount</span>
                <span> ₹{Number(disPrice).toFixed(2)} (Ex. VAT)</span>
              </div>
              {chargesResult.charges?.length > 0 &&
                chargesResult.charges.map((charge, index) => (
                  <div className="priceRow" key={`charge-${index}`}>
                    <span>{charge.name}</span>
                    <span>₹{Number(charge.amount).toFixed(2)}</span>
                  </div>
                ))}
              <div className="totalAmountRow">
                <span>Total Amount</span>
                <span>₹{Number(totalDisPrice).toFixed(2)} (Inc. VAT)</span>
              </div>
            </div>
            <p className="savingsMessage">
              You will save ₹{Number(disPrice).toFixed(2)} on this order
            </p>
            {cartItems.length > 0 && (<a href="/checkout" className="btn btn-cart2 w-100">Proceed to Checkout</a>)}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Page;