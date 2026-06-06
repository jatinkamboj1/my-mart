"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useSession } from "next-auth/react";
import { applyCoupon } from "@/app/api/discount";
import toast from "react-hot-toast";
import { addOrder } from "@/app/api/orders";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import Image from "next/image";
import { convertS3UrlToLocalPath } from "@/utils/util";
import { getApplicableShippingFee } from "@/app/api/shippingFee";

const Page = () => {
  const router = useRouter();
  // Auth related code
  const { data: session, status } = useSession();
  const token = session?.user?.token;

  // Other UseStates
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [userDetails, setUsertDetails] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedcategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [filteredProductsData, setFilteredProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [productVariantDetails, setProductVariantDetails] = useState([]);
  const [productVariant, setProductVariant] = useState([]);
  const [transactionId, setTransactionId] = useState();

  const [formState, setFormState] = useState({
    userId: null,
    addressId: null,
    categories: [],
    products: [],
    discountIds: [],
    paid: "COD",
    cancellationExpiry: "",
    status: "PENDING",
    shippingStreet: "",
    transactionId: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "",
    shippingZip: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: ""
  });
  const [selectedProduct, setSelectedProduct] = useState({
    productId: "",
    quantity: 1
  });
  const [quantity, setQuantity] = useState("0");
  const [cart, setCart] = useState([]);
  const [selectedProductVariant, setSelectedProductVariant] = useState({
    productVariantId: "",
    quantity: 1
  });

  const [discount, setDiscount] = useState("");
  const [discountDetails, setDiscountDetails] = useState({});

  // Calculation UseStates
  const [subTotal, setSubTotal] = useState();
  const [discountValue, setDiscountValue] = useState();
  const [shipphingCharge, setShipphingCharge] = useState(0);
  const [total, setTotal] = useState();
  const [paymentMethod, setPaymentMethod] = useState("COD"); // default COD
  const [paidByCustomer, setPaidByCustomer] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);

  // Fetch Users and Categories
  useEffect(() => {
    if (status === "authenticated" && token) {
      fetchUsers(token);
      fetchCategories();
      fetchShippingFee(token);
    } else {
      console.error("No authentication token found");
      // LogoutUser();
    }
  }, [status, token]);

  // Fetch Users
  const fetchUsers = async (token) => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const formattedUsers = response.data.users.map((user) => {
        return {
          value: user.id,
          label: user.name
        };
      });

      setUsers(formattedUsers);
      setUsertDetails(response.data.users);
    } catch (error) {
      // console.error("Error fetching users:", error);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}/category`);
      const formattedCategories = response.data.categories.map((category) => {
        return {
          value: category.id,
          label: category.categoryName
        };
      });

      setCategories(formattedCategories);
    } catch (error) {
      // console.error("Error fetching categories:", error);
    }
  };

  // Fetch Products
  useEffect(() => {
    if (selectedcategories.val && selectedcategories.val.length > 0) {
      fetchProducts(selectedcategories);
    }
  }, [selectedcategories]);

  const fetchProducts = async (categories) => {
    try {
      const response = await axios.get(
        `${process.env.SERVER_URL}/product/names`,
        {
          params: {
            categories
          }
        }
      );
      const formattedProducts = response.data.products.map((products) => {
        return {
          value: products.id,
          label: products.name
        };
      });

      setProducts(formattedProducts);
      setProductDetails(response.data.products);
    } catch (error) {
      // console.error("Error fetching Products:", error);
    }
  };

  // Fetch Product Variants
  useEffect(() => {
    if (productIds.length > 0 && token) fetchVariants();
  }, [productIds, token]);

  const fetchVariants = async () => {
    try {
      const response = await axios.get(
        `${process.env.SERVER_URL}/product/variants`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            productIds
          }
        }
      );
      const formattedVariants = response.data.map((variant) => ({
        value: variant.id,
        label: variant.variantName
      }));

      setProductVariant(formattedVariants);
      setProductVariantDetails(response.data);
    } catch (error) {}
  };

  function getDefaultAddresses(users) {
    return (
      users
        .flatMap((user) => user.Address || [])
        .find((address) => address.isDefault === true) || null
    );
  }
  // Handle DropDown Change
  const handleMultiSelectChange = (name, val) => {
    setFormState((prevState) => {
      const updatedFormState = {
        ...prevState,
        [name]: val
      };

      // Handle selectedCategories if 'userId' field is updated
      if (name === "userId") {
        const filteredUsers = userDetails.filter((user) => user.id === val);
        setSelectedUser(filteredUsers);
        const defaultAddress = getDefaultAddresses(filteredUsers);
        setFormState((prev) => {
          return { ...prev, addressId: defaultAddress?.id };
        });
      }

      // Handle selectedCategories if 'categories' field is updated
      if (name === "categories") {
        setSelectedCategories((prevState) => ({
          ...prevState,
          val
        }));
      }

      return updatedFormState;
    });
  };

  // Handle DropDown Change For Products and ProductVariants
  const handleProductMuiltiSelectChange = (name, val) => {
    const filtereProduct = productDetails.filter(
      (product) => product.id === val
    );
    setQuantity(filtereProduct[0].quantity);

    const newProduct = {
      productId: val,
      quantity: 1
    };
    setSelectedProduct({
      ...newProduct
    });

    setProductIds([filtereProduct[0].id]);

    setFormState((prevState) => ({
      ...prevState,
      products: filtereProduct[0].id
    }));
  };

  const handleProductVariantMuiltiSelectChange = (name, val) => {
    const filterVariant = productVariantDetails.filter(
      (product) => product.id === val
    );
    setQuantity(filterVariant[0].quantity);

    const newProduct = {
      productVariantId: val,
      quantity: 1
    };
    setSelectedProductVariant({
      ...newProduct
    });
  };

  useEffect(() => {
    if (
      products &&
      products.length > 0 &&
      formState.products &&
      formState.products.length > 0
    ) {
      const filteredProducts = productDetails.filter((product) => {
        return formState.products.includes(product.id);
      });
      setFilteredProducts(filteredProducts);
    }
  }, [products, formState.products, productDetails]);

  // Handle Add To Cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    const filteredProducts = productDetails.filter(
      (product) => product.id === selectedProduct.productId
    );
    filteredProducts[0].stock = parseInt(selectedProduct.quantity);
    setFormState((prevState) => ({
      ...prevState,
      categories: []
    }));

    setCart((prev) => {
      return [...prev, filteredProducts[0]];
    });
    setSelectedProduct({
      productId: "",
      quantity: ""
    });
    setIsOpen(false);
  };

  // Handle Add Variant To Cart
  const handleAddVarientToCart = (e) => {
    e.preventDefault();
    const filteredProducts = productVariantDetails.filter(
      (product) => product.id === selectedProductVariant.productVariantId
    );
    filteredProducts[0].stock = parseInt(selectedProductVariant.quantity);
    filteredProducts[0].images = filteredProducts[0].product.images;
    setFormState((prev) => ({
      ...prev,
      categories: []
    }));
    setCart((prev) => {
      return [...prev, filteredProducts[0]];
    });
    setSelectedProductVariant({
      productVariantId: "",
      quantity: 1
    });
    setIsOpen(false);
  };

  // Product Quantity Change
  const handleQuantityChange = (e, value, index) => {
    e.preventDefault();
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, stock: parseInt(e.target.value) } : item
      )
    );
  };

  // Remove Product
  const removeProduct = (index) => {
    setCart((prevData) => {
      const updatedData = [...prevData];
      updatedData.splice(index, 1);
      return updatedData;
    });
  };

  
    const fetchShippingFee = async (token) => {
      if (!token) return;
      // Pick city or postcode as "zone" – whichever you treat as zone in backend
      const zone =
        formState.shippingCity?.trim() ||
        formState.shippingState?.trim() ||
        formState.shippingZip?.trim() || "default";
  
      if (!zone || subTotal <= 0) return;
  
      const shipping = await getApplicableShippingFee(zone, subTotal, token);
  
      if (shipping) {
        setShipphingCharge(shipping.feeAmount);
      } else {
        setShipphingCharge(0);
      }
    };

  // Handle Apply Discount
  const handleApplyDiscount = async (e) => {
    e.preventDefault();
    const amount =
      cart.reduce(
        (subTotal, product) => subTotal + (product.discountedPrice || product.price) * product.stock,
        0
      ) || 0;
    const response = await applyCoupon(amount, discount, token);
    if (response?.message) toast.success(response?.message);
    if (response?.discount) setDiscountDetails(response.discount);
  };

  const handleChange = (name, value) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build products payload from cart (avoid mutating formState directly)
    let finalProducts = [];
    cart.forEach((product) => {
      let newObject = null;
      // If this product is a variant (has productVariantId stored earlier)
      if ("productId" in product) {
        // In your original code you used product.id as variant id for product entries
        newObject = {
          productVariantId: product.id,
          quantity: product.stock
        };
      } else if ("ProductVariant" in product) {
        newObject = {
          productId: product.id,
          quantity: product.stock
        };
      } else {
        // Fallback: if product is a productDetail (no special keys)
        newObject = {
          productId: product.id,
          quantity: product.stock
        };
      }
      finalProducts.push(newObject);
    });

    // Prepare payload (do not mutate formState)
    const payload = {
      ...formState,
      products: finalProducts,
      cancellationExpiry: new Date(
        new Date().setDate(new Date().getDate() + 2)
      ).toISOString(),
      paid: paymentMethod || formState.paid,
      ...(paymentMethod === "ONLINE" && {
        transactionId: formState.transactionId
      })
    };

    // If there's a discount applied, include it (avoid duplicates)
    if (discountDetails?.id) {
      payload.discountIds = Array.isArray(formState.discountIds)
        ? [...new Set([...(formState.discountIds || []), discountDetails.id])]
        : [discountDetails.id];
    }

    try {
      const response = await addOrder(token, payload);
      if (response?.order?.id) {
        toast.success("Added Order Successfully");
        router.push("/admin/order");
      } else {
        toast.error("Failed to add order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Error creating order");
    }
  };


  // Auto-fetch shipping fee when zone (city / postcode) or total changes
  useEffect(() => {
    fetchShippingFee(token);
  }, [
    formState.shippingCity,
    formState.shippingZip,
    formState.shippingState,
    subTotal,
    token,
  ]);

  // Calculate Sub total, discount value, shipping charges
  useEffect(() => {
    const amount =
      cart.reduce(
        (subTotal, product) => subTotal + (product.discountedPrice || product.price) * product.stock,
        0
      ) || 0;
    setSubTotal(amount);    
    if (discountDetails.type === "PERCENTAGE") {
      setDiscountValue((amount * discountDetails.amount) / 100);
    } else if (discountDetails.type === "FIXED") {
      setDiscountValue(discountDetails.amount);
    } else if (discountDetails.type === "SHIPPING_FREE") {
      setDiscountValue(0);
      setShipphingCharge(0);
    }
  }, [cart, discountDetails]);

  // Calcualte Total Amount
  useEffect(() => {
    const totalAmount =
      parseFloat(subTotal) -
        (parseFloat(discountValue) || 0) +
        (parseFloat(shipphingCharge) || 0) || 0;
    setTotal(totalAmount);
  }, [subTotal, discountValue, shipphingCharge]);

  // Calculate Paid By Customer amount
  useEffect(() => {
    if (paymentMethod && total >= 0) {
      if (paymentMethod === "COD") {
        setPaidByCustomer(0);
        setFinalBalance(total);
      } else {
        setPaidByCustomer(total);
        setFinalBalance(0);
      }
    }
  }, [total, paymentMethod]);

  const handleNoteChange = (e) => {
    e.preventDefault();
    setFormState((prev) => {
      return { ...prev, customerRemarks: e.target.value };
    });
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
    const data = selectedUser[0].Address[value];
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
      billingZip
    });
  };

  const handleShippingChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setFormState({
        ...formState,
        shippingStreet: "",
        shippingCity: "",
        shippingState: "",
        shippingCountry: "",
        shippingZip: ""
      });
      return;
    }
    const data = selectedUser[0].Address[value];
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
      shippingZip
    });
  };

  if (status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="py-5">
        <div className="row g-4 align-items-center">
          <div className="col">
            <h1 className="h3 m-0">Add Order</h1>
          </div>
          <div className="col-auto d-flex">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Create Order
            </button>
          </div>
        </div>
      </div>
      <div
        className="sa-entity-layout sa-entity-layout--size--md"
        style={{ position: "relative" }}
      >
        <div className="sa-entity-layout__body">
          <div className="sa-entity-layout__main">
            <div className="card my-5">
              <div className="sa-card-area">
                <textarea
                  className="sa-card-area__area"
                  rows={2}
                  placeholder="Notes about order"
                  value={formState.customerRemarks}
                  onChange={(e) => handleNoteChange(e)}
                />
                <div className="sa-card-area__card">
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
            </div>
            <div className="card">
              <div className="card-body p-5">
                <div className="mb-5">
                  <h2 className="mb-0 fs-exact-18">Order Information</h2>
                </div>
                {/* Users Drop-Down */}
                <div className="mb-4">
                  <label htmlFor="form-category/name" className="form-label">
                    Users
                  </label>
                  <Select
                    name="users"
                    options={users}
                    onChange={(e) => handleMultiSelectChange("userId", e.value)}
                  />
                </div>
                <div>
                  Add Product Details:{"  "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(true);
                    }}
                    style={{
                      fontSize: "1.5rem"
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            {isOpen && (
              <div
                className="p-5"
                style={{
                  position: "absolute",
                  zIndex: "999",
                  width: "100%",
                  top: "5%",
                  backgroundColor: "white",
                  boxShadow: "1px 1px 10px 1px black",
                  borderRadius: "10px"
                }}
              >
                {/* Pop-up Form Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "item-center"
                  }}
                >
                  <h3>Details:</h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                    }}
                  >
                    ❌
                  </button>
                </div>
                <hr />
                {/* Pop Up Form Body */}
                <div>
                  {/* Category Drop-Down */}
                  <div className="mb-4">
                    <label htmlFor="form-category/name" className="form-label">
                      Categories
                    </label>
                    <Select
                      name="categories"
                      // isMulti
                      options={categories}
                      onChange={(e) =>
                        handleMultiSelectChange(
                          "categories",
                          e ? e.value : null
                          // e.map((option) => option.value)
                        )
                      }
                    />
                  </div>
                  {/* Product Drop-Down */}
                  {formState.categories.length !== 0 && (
                    <div className="mb-4">
                      <label
                        htmlFor="form-category/name"
                        className="form-label"
                      >
                        Product
                      </label>

                      <Select
                        name="products"
                        // isMulti
                        options={products}
                        onChange={(e) => {
                          const selectedProducts = e ? e.value : null;
                          handleProductMuiltiSelectChange(
                            "products",
                            selectedProducts
                          );
                        }}
                      />
                    </div>
                  )}
                  {/* Product Variant Drop-Down */}
                  {formState.categories.length !== 0 &&
                    productVariant.length > 0 && (
                      <div className="mb-4">
                        <label
                          htmlFor="form-category/name"
                          className="form-label"
                        >
                          Product Variant
                        </label>
                        <Select
                          name="productVariantId"
                          // isMulti
                          options={productVariant}
                          onChange={(e) => {
                            const selectedProducts = e ? e.value : null;
                            handleProductVariantMuiltiSelectChange(
                              "productVariantId",
                              selectedProducts
                            );
                          }}
                        />
                      </div>
                    )}
                  {formState.categories.length !== 0 &&
                    selectedProduct.productId !== "" && (
                      <div className="mb-4">
                        <label htmlFor="quantity" className="form-label">
                          Quantity
                        </label>
                        <br />
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          min="1"
                          max={quantity}
                          className="form-input"
                          placeholder="1"
                          onChange={(e) => {
                            e.preventDefault();

                            if (
                              selectedProductVariant.productVariantId === ""
                            ) {
                              setSelectedProduct((prevState) => ({
                                ...prevState,
                                quantity: e.target.value
                              }));
                            } else {
                              setSelectedProductVariant((prevState) => ({
                                ...prevState,
                                quantity: e.target.value
                              }));
                            }
                          }}
                        />
                      </div>
                    )}
                </div>
                {/* Pop Up Form Footer */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) =>
                    selectedProductVariant.productVariantId === ""
                      ? handleAddToCart(e)
                      : handleAddVarientToCart(e)
                  }
                >
                  Add to Basket
                </button>
              </div>
            )}

            <div className="card my-5">
              <div className="card-body p-5">
                <div className="mb-5">
                  <h2 className="mb-0 fs-exact-18">Product Details</h2>
                </div>
              </div>

              <div className="w-full bg-white p-2 rounded-lg shadow-md my-3 ">
                {filteredProductsData && filteredProductsData.length > 0 ? (
                  <table className="w-100 table-auto mb-4  px-5">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left w-[200px]">Image</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formState.products.length > 0 &&
                        filteredProductsData &&
                        cart.map((data, index) => (
                          <tr key={index} className="border-b">
                            <td className="px-4 py-2">
                              <img
                                width={80}
                                height={100}
                                src={
                                  data?.images.length > 0
                                    ? convertS3UrlToLocalPath(
                                        data.images[0].url
                                      )
                                    : `${process.env.PLACEHOLDER_IMAGE}`
                                }
                                alt="Product"
                                className="w-[100px] h-auto"
                              />
                            </td>

                            <td className="px-4 py-2">
                              <p>{data.name || data.variantName}</p>
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                onChange={(e) =>
                                  handleQuantityChange(e, e.value, index)
                                }
                                min={1}
                                max={data.quantity}
                                value={data.stock}
                                className="w-full"
                              />
                            </td>

                            <td className="px-4 py-2 text-right">
                              <button
                                onClick={() => removeProduct(index)} // Trigger removeProduct on click
                                className="text-red-500 hover:text-red-700"
                              >
                                <span className="text-xl">❌</span>{" "}
                                {/* Cross icon */}
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center text-gray-600">
                    Please select a{" "}
                    {formState.categories.length > 0
                      ? "products"
                      : "categories"}{" "}
                    in the fields above
                  </p>
                )}
              </div>
            </div>
            {/* Items Card */}
            <div className="card mt-5">
              <div className="card-body px-5 py-4 d-flex align-items-center justify-content-between">
                <h2 className="mb-0 fs-exact-18 me-4">Items</h2>
              </div>
              <div className="table-responsive">
                <table className="sa-table">
                  <tbody>
                    {formState.products.length > 0 &&
                      cart.map((product) => (
                        <tr key={product.id}>
                          <td className="min-w-20x">
                            <div className="d-flex align-items-center">
                              <img
                                width={80}
                                height={80}
                                src={
                                  product?.images.length > 0
                                    ? convertS3UrlToLocalPath(
                                        product.images[0].url
                                      )
                                    : `${process.env.PLACEHOLDER_IMAGE}`
                                }
                                className="me-4"
                                alt={product.name}
                              />
                              <a
                                href={`/product/${product.slug}`}
                                className="text-reset pl-4"
                              >
                                {product.name || product.variantName}
                              </a>
                            </div>
                          </td>
                          <td className="text-end" colSpan="2">
                            <div className="sa-price">
                              <span className="sa-price__symbol">£</span>
                              <span className="sa-price__integer">
                                {(product.discountedPrice || product.price)}
                              </span>
                              <span> x </span>
                              <span className="text-end">{product.stock}</span>
                            </div>
                          </td>
                          <td className="text-end">
                            <div className="sa-price">
                              <span className="sa-price__symbol">£</span>
                              <span className="sa-price__integer">
                                {((product.discountedPrice || product.price) * product.stock)}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>

                  <tbody className="sa-table__group">
                    <tr>
                      <td colSpan="3">Product Price</td>
                      <td className="text-end">
                        <div className="sa-price">
                          <span className="sa-price__symbol">£</span>
                          <span className="sa-price__integer">
                            {subTotal || 0}
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        Shipping
                      </td>
                      <td className="text-end">
                        <div className="sa-price">
                          <span className="sa-price__symbol">£</span>
                          <span className="sa-price__integer">
                            {shipphingCharge || 0}
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        <span>
                          Apply Discount:{" "}
                          <input
                            type="text"
                            name="discount"
                            onChange={(e) => {
                              e.preventDefault();
                              setDiscount(e.target.value);
                            }}
                          />
                          <button
                            type="button"
                            className="btn btn-primary mx-3"
                            onClick={(e) => handleApplyDiscount(e)}
                          >
                            Apply
                          </button>
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="sa-price">
                          <span className="sa-price__integer text-danger fw-semibold">
                            - £{discountValue ? `${discountValue}` : "0"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td colSpan="3">Total</td>
                      <td className="text-end">
                        <div className="sa-price">
                          <span className="sa-price__symbol">£</span>
                          <span className="sa-price__integer">
                            {total || 0}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Balance Card */}
            <div className="card my-5">
              <div className="card-body px-5 py-4 d-flex align-items-center justify-content-between">
                <h2 className="mb-0 fs-exact-18 me-4">Balance</h2>
              </div>

              <table className="sa-table">
                <tbody className="sa-table__group">
                  <tr>
                    <td>Grand Total</td>
                    <td className="text-end">
                      <div className="sa-price">
                        <span className="sa-price__symbol">£</span>
                        <span className="sa-price__integer">
                          {total || 0}
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Payment Method Row */}
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap"
                        }}
                      >
                        <span>Payment Method</span>
                        <div>
                          <label>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="COD"
                              checked={paymentMethod === "COD"}
                              onChange={(e) => {
                                const method = e.target.value;
                                setPaymentMethod(method);
                                if (method === "COD") {
                                  setFormState((prev) => ({
                                    ...prev,
                                    transactionId: ""
                                  }));
                                }
                              }}
                            />{" "}
                            COD
                          </label>
                          <label style={{ marginLeft: "10px" }}>
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="ONLINE"
                              checked={paymentMethod === "ONLINE"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />{" "}
                            Pay Online
                          </label>
                        </div>
                      </div>

                      {/* ✅ Show input only if ONLINE selected */}
                      {paymentMethod === "ONLINE" && (
                        <div style={{ marginTop: "8px" }}>
                          <label
                            htmlFor="transactionId"
                            style={{ fontSize: "14px", color: "#6b7280" }}
                          >
                            Transaction ID:
                          </label>
                          <input
                            id="transactionId"
                            type="text"
                            placeholder="Enter transaction ID"
                            value={formState.transactionId}
                            onChange={(e) =>
                              setFormState((prev) => ({
                                ...prev,
                                transactionId: e.target.value
                              }))
                            }
                            style={{
                              width: "100%",
                              padding: "8px 10px",
                              borderRadius: "6px",
                              border: "1px solid #d1d5db",
                              marginTop: "4px",
                              fontSize: "14px"
                            }}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>

                {/* Paid by Customer */}
                <tbody className="sa-table__group">
                  <tr>
                    <td>Paid by customer</td>
                    <td className="text-end">
                      <div className="sa-price">
                        <span className="sa-price__symbol">£</span>
                        <span className="sa-price__integer">
                          {paidByCustomer || 0}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>

                {/* Final Balance */}
                <tbody>
                  <tr>
                    <td>
                      Balance{" "}
                      <span className="text-muted">(customer owes you)</span>
                    </td>
                    <td className="text-end">
                      <div className="sa-price">
                        <span className="sa-price__symbol">£</span>
                        <span className="sa-price__integer">
                          {finalBalance || 0}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Customer Details */}
          {selectedUser && selectedUser.length > 0 && (
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
                      <div className="fs-exact-14 fw-medium">
                        {selectedUser[0]?.name}
                      </div>
                      <div className="fs-exact-13 text-muted">
                        This is a first order
                      </div>
                    </div>
                  </div>
                  <div>{selectedUser[0]?.name}</div>
                  <div className="mt-1">
                    <a href="#">{selectedUser[0]?.email}</a>
                  </div>
                  <div className="text-muted mt-1">
                    {selectedUser[0]?.phone}
                  </div>
                </div>
              </div>
              <div className="card mt-5">
                <div className="card-body d-flex align-items-center justify-content-between pb-0 pt-4">
                  <h2 className="fs-exact-16 mb-0">Shiping Address </h2>
                </div>
                <div className="card-body pt-4 fs-exact-14">
                  <div className="single-input-item">
                    <label htmlFor="billing" className="form-label">
                      Select Shipping Address
                    </label>
                    <select
                      className="address-form-select"
                      onChange={handleShippingChange}
                    >
                      <option id="billing" value="">
                        Enter Address Manualy
                      </option>
                      {selectedUser[0].Address.map((item, i) => (
                        <option key={`address-${i}`} value={i}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="address-form">
                    {[
                      { label: "Street", name: "shippingStreet" },
                      { label: "City", name: "shippingCity" },
                      { label: "State/Province", name: "shippingState" },
                      { label: "ZIP Code", name: "shippingZip" },
                      { label: "Country", name: "shippingCountry" }
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
                    <label htmlFor="shipping" className="form-label">
                      Select Billing Address
                    </label>
                    <select
                      className="address-form-select"
                      onChange={handleBillingChange}
                    >
                      <option id="shipping" value="">
                        Enter Address Manualy
                      </option>
                      {selectedUser[0].Address.map((item, i) => (
                        <option key={`address-${i}`} value={i}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="address-form">
                    {[
                      { label: "Street", name: "billingStreet" },
                      { label: "City", name: "billingCity" },
                      { label: "State/Province", name: "billingState" },
                      { label: "ZIP Code", name: "billingZip" },
                      { label: "Country", name: "billingCountry" }
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
