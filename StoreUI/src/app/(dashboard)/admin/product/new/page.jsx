"use client";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { addProduct, fetchVariantTypes, getDiscountedAmount } from "@/app/api/products";
import { addTags, fetchTags } from "@/app/api/tags";
// import { LogoutUser } from "@/utils/auth";
import "react-quill/dist/quill.snow.css";
import { Plus, Upload, XCircle } from "lucide-react";
import Popup from "reactjs-popup";
import Image from "next/image";
import { convertS3UrlToLocalPath } from "@/utils/util";
import { fetchAllCategoriesName } from "@/app/api/categories";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Page = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.token;
  const router = useRouter();
  const visible_on = [
    {
      label: "Homepage",
      value: "HOMEPAGE",
    },
    {
      label: "Crosspage",
      value: "CROSSPAGE",
    },
  ];


  const productState = {
    name: "",
    slug: "",
    sku: "",
    description: "",
    shortDescription: "",
    stock: 0,
    price: 0,
    discountedPrice: null,
    discountedPercentage: null,
    categories: [],
    tags: [],
    visibility: false,
    metaTitle: "",
    metaDescription: "",
    visible_on: "",
    keywords: "",
    brandName: '',
    bulkPrices: [],

    // Parameters
    color: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    capacity: '',
    material: '',
    handlingType: 'NORMAL',

    images: [],
    productVariants: [],
  };

  const varientState = {
    productVariants: [
      {
        description: "",
        shortDescription: "",
        variantName: "",
        sku: "",
        price: 0,
        discountedPrice: null,
    discountedPercentage: null,
        stock: 0,
        attributes: [{ name: "", value: "" }],

        // Parameters
        color: '',
        length: '',
        width: '',
        height: '',
        weight: '',
        capacity: '',
        material: '',
        handlingType: 'NORMAL',
        bulkPrices: [],
      },
    ],
  };

  const handelingType = [
    "NORMAL",
    "FRAGILE",
    "PERISHABLE",
  ]

  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editVariantIndex, setEditVariantIndex] = useState();
  const [tags, setTags] = useState({
    name: "",
    isCategory: false,
  });
  const [formState, setFormState] = useState(productState);
  const [popupFormState, setPopupFormState] = useState(varientState);
  const [variantType, setvariantType] = useState("");
  const [variantTypes, setVariantTypes] = useState([]);
  const [submittedVariants, setSubmittedVariants] = useState([]);
  const [tag, setTag] = useState([]);
  const fileInputRef = useRef();


  const variantTypeChange = (e) => {
    e.preventDefault();
    setvariantType(e.target.value);

  };

  const savePopupData = () => {
    setFormState((prev) => {
      const updatedState = {
        ...prev,
        productVariants: submittedVariants,
      };

      return updatedState;
    });
  };

  useEffect(() => {
    if (token) {
      getTags();
      getVariantTypes();
    }
    fetchCategories();
  }, [token]);

  useEffect(() => {
    savePopupData();
  }, [submittedVariants]);

  const fetchCategories = async () => {
    try {
      const response = await fetchAllCategoriesName();
      const formattedCategories = response.categories.map((category) => {
        return {
          value: category.id,
          label: category.categoryName,
        };
      });

      setCategories(formattedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getTags = async () => {
    try {
      const response = await fetchTags(token);

      if (response?.length) {
        const filteredTags = response.filter(
          (item) =>
            !item.isCategory
        );

        setTag(filteredTags);
      }
      // setTags(formattedTags);
    } catch (error) {
      // console.error(
      //   "Error fetching tags :",
      //   error.response?.data || error.message
      // );
    }
  };

  const [errors, setErrors] = useState({
    name: false,
    slug: false,
    sku: false,
    brandName: false,
    price: false,
    stock: false
  });

  const validateForm = () => {
    const newErrors = {
      name: !formState.name || formState.name.trim() === "",
      slug: !formState.slug || formState.slug.trim() === "",
      sku: !formState.sku || formState.sku.trim() === "",
      brandName: !formState.brandName || formState.brandName.trim() === "",
      price: !formState.price || formState.price <= 0,
      stock: formState.stock < 1
    };

    setErrors(newErrors);

    // Return true if no errors
    return !Object.values(newErrors).some(error => error === true);
  };

  const getVariantTypes = async () => {
    try {
      const response = await fetchVariantTypes(token);
      
      setVariantTypes(response.variants);
    } catch (error) {
      // console.error(
      //   "Error fetching variant types:",
      //   error.response?.data || error.message
      // );
    }
  };

  const handleMultiSelectChange = (name, val) => {
    // Ensure val is an array of objects
    if (!Array.isArray(val)) {
      val = [];
    }

    setFormState((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  const addBulkPrice = () => {
    setFormState((p) => ({
      ...p,
      bulkPrices: [
        ...p.bulkPrices,
        { minQuantity: 1, maxQuantity: "", price: "", percentage: "" },
      ],
    }));
  };

  const updateBulkPrice = (index, field, value) => {
    setFormState((p) => {
      const updated = [...p.bulkPrices];
      if (field === "percentage") {
        updated[index]['price'] = getDiscountedAmount(formState.discountedPrice ? formState.discountedPrice : formState.price, value);
      }
      updated[index][field] = value;
      return { ...p, bulkPrices: updated };
    });
  };

  const removeBulkPrice = (index) => {
    setFormState((p) => ({
      ...p,
      bulkPrices: p.bulkPrices.filter((_, i) => i !== index),
    }));
  };

  const addBulkVariantPrice = (index) => {
    setPopupFormState((prevState) => {
      const updatedVariants = [...prevState.productVariants];
      updatedVariants[index] = { ...updatedVariants[index], 
      bulkPrices: [
        ...updatedVariants[index].bulkPrices,
        { minQuantity: 1, maxQuantity: "", price: "", percentage: "" },
      ] };
      return { ...prevState, productVariants: updatedVariants };
    });
  };

  const updateBulkVariantPrice = (varindex, index, field, value) => {
    setPopupFormState((prevState) => {
      const updatedVariants = [...prevState.productVariants];
      const updatedBulkPrices = [...updatedVariants[varindex].bulkPrices];
      if (field === "percentage") {
        updatedBulkPrices[index]['price'] = getDiscountedAmount(updatedVariants[varindex].discountedPrice ? updatedVariants[varindex].discountedPrice : updatedVariants[varindex].price, value);
      }
      updatedBulkPrices[index][field] = value;
      updatedVariants[varindex] = { ...updatedVariants[varindex], bulkPrices: updatedBulkPrices };
      
      return { ...prevState, productVariants: updatedVariants };
    });
  };

  const removeBulkVariantPrice = (index, bulkPriceIndex) => {
    setPopupFormState((prevState) => {
      const updatedVariants = [...prevState.productVariants];
      updatedVariants[index] = { ...updatedVariants[index], 
      bulkPrices: updatedVariants[index].bulkPrices.filter((_, i) => i !== bulkPriceIndex), };
      return { ...prevState, productVariants: updatedVariants };
    });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "slug") {
      const regex = /^[a-z0-9\-]*$/;
      if (!regex.test(value)) {
        toast.error("Invalid slug.");
        return;
      }
    }
    if (name === "price" && formState.discountedPercentage) {
      setFormState((prevState) => ({
        ...prevState,
        discountedPrice: getDiscountedAmount(value, prevState.discountedPercentage)
      }));
    }
    if (name === "discountedPercentage") {
      setFormState((prevState) => ({
        ...prevState,
        discountedPrice: getDiscountedAmount(prevState.price, value)
      }));
    }
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === "visibility" ? value === "true" : value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleVariantChange = (index, field, value) => {
    setPopupFormState((prevState) => {
      const updatedVariants = [...prevState.productVariants];
      if (field === "price" && updatedVariants[index].discountedPercentage) {
        updatedVariants[index] = { ...updatedVariants[index], discountedPrice: getDiscountedAmount(value, updatedVariants[index].discountedPercentage) };
      }
      if (field === "discountedPercentage") {
        updatedVariants[index] = { ...updatedVariants[index], discountedPrice: getDiscountedAmount(updatedVariants[index].price, value) };
      }
      updatedVariants[index] = { ...updatedVariants[index], [field]: value };
      return { ...prevState, productVariants: updatedVariants };
    });
  };

  const handleAttributeChange = (variantIndex, attrIndex, event) => {
    const { name, value } = event.target;
    setPopupFormState((prevState) => {
      const updatedVariants = [...prevState.productVariants];
      updatedVariants[variantIndex].attributes[attrIndex] = {
        ...updatedVariants[variantIndex].attributes[attrIndex],
        [name]: value,
      };
      return { ...prevState, productVariants: updatedVariants };
    });
  };

  const handleQuillChange = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const newImages = [...formState.images];

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push({
          id: Date.now() + index,
          base64: e.target.result, // Base64 image preview
          alt: "",
          order: newImages.length + 1,
        });

        setFormState((prev) => ({
          ...prev,
          images: newImages,
        }));
      };

      reader.readAsDataURL(file);
    });
  };

  // Handle Alt Text Change
  const handleAltChange = (id, value) => {
    setFormState((prev) => ({
      ...prev,
      images: prev.images.map((img) =>
        img.id === id ? { ...img, alt: value } : img
      ),
    }));
  };

  // Handle Order Change
  const handleOrderChange = (id, value) => {
    setFormState((prev) => ({
      ...prev,
      images: prev.images.map((img) =>
        img.id === id ? { ...img, order: Number(value) } : img
      ),
    }));
  };

  // Remove Image
  const handleRemoveImage = (id) => {
    setFormState((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }));
  };

  const handleVariantSubmit = async (e, close) => {
    e.preventDefault();
    const type = variantType;
    if (!type.trim()) {
      toast.error("Variant Type Name is required!");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/product/varient-types`,
        { name: type },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        getVariantTypes();

        close();
        toast.success("Variant Type added successfully!");
      }
    } catch (error) {
      // console.error(
      //   "Error adding variant type:",
      //   error.response?.data || error.message
      // );
      toast.error("Failed to add Variant Type.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return false;
    }

    try {
      const token = session?.user?.token;

      if (!token) {
        console.error("Authentication required");
        // LogoutUser();
        return;
      }

      const result = await addProduct(formState, token);
      if (result) {
        toast.success("Product Added Successfully");
      }
    } catch (error) {
      // console.error("Error submitting form:", error);
      toast.error("Unable adding product.");
    }
  };
  

  const handleSave = async (e) => {
    const done = handleSubmit(e);
  };

  const handleSaveAndExit = async (e) => {
    const done = handleSubmit(e);
    if (done) {
      setTimeout(() => {
        Navigate.push("/admin/product/");
      }, 1000);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmitTags = async (e, close) => {
    e.preventDefault();

    // Prepare data

    const response = await addTags(tags, token);
    getTags();
    setTags({
      name: "",
      isCategory: false,
    });

    // Close popup after saving
    close();
  };

  const handleVarientSave = (e) => {
    e.preventDefault();
    setSubmittedVariants((prev) => {
      return [...prev, ...popupFormState.productVariants];
    });

    setPopupFormState(varientState);
  };

  const editVariantData = (e) => {
    e.preventDefault();
    setSubmittedVariants((prev) => {
      const updatedVariants = [...prev];
      updatedVariants[editVariantIndex - 1] = popupFormState.productVariants[0];
      return updatedVariants;
    });
    setEditVariantIndex();
    setPopupFormState(varientState);
  };

  const handleOpenVariantForm = (e, variant, i) => {
    e.preventDefault();
    setIsOpen(true);
    setPopupFormState((prevState) => ({
      ...prevState,
      productVariants: [variant],
    }));
    setEditVariantIndex(i);
  };
  const handleInputTags = (e, tag) => {
    e.preventDefault();
    const { name, value } = e.target;


    setTags((prevTags) => ({
      ...prevTags,
      name: value,
      [name]: name === tag ? true : value,
    }));
  };

  return (
    <>
      <div className="py-5">
        <div className="row g-4 align-items-center">
          <div className="col">
            <h1 className="h3 m-0">Add Product</h1>
          </div>

          <div className="col-auto d-flex">
            <div className="flex gap-2">
            <button onClick={handleSave} className="btn btn-primary">
              Save Product
            </button>
            <button onClick={handleSaveAndExit} className="btn btn-secondary">
              Save and exit
            </button>
            </div>
          </div>
        </div>
      </div>
      <div className="sa-entity-layout sa-entity-layout--size--md">
        <div className="sa-entity-layout__body">
          <div className="sa-entity-layout__main">
            <div className="card">
              <div className="card-body p-5">
                <div className="mb-5">
                  <h2 className="mb-0 fs-exact-18">Basic information</h2>
                </div>
                <div className="mb-4">
                  <label htmlFor="form-category/name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "border-danger" : ""}`}
                    id="form-category/name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="text-danger mt-1">This field is required</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="form-category/slug" className="form-label">
                    Slug
                  </label>
                  <div className="input-group input-group--sa-slug">
                    <span
                      className="input-group-text"
                      id="form-category/slug-addon"
                    >
                      /product/
                    </span>
                    <input
                      type="text"
                      className={`form-control ${errors.slug ? "border-danger" : ""}`}
                      id="form-category/slug"
                      name="slug"
                      value={formState.slug}
                      onChange={handleChange}
                    />
                    {errors.slug && (
                      <div className="text-danger mt-1">This field is required</div>
                    )}
                  </div>
                  <div id="form-category/slug-help" className="form-text">
                    Unique human-readable category identifier. No longer than
                    255 characters.
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="form-category/description"
                    className="form-label"
                  >
                    Description
                  </label>

                  <ReactQuill
                    id="form-category/description"
                    theme="snow"
                    value={formState.description}
                    onChange={(value) =>
                      handleQuillChange("description", value)
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="form-product/short-description"
                    className="form-label"
                  >
                    Short description
                  </label>

                  <ReactQuill
                    id="form-category/shortDescription"
                    theme="snow"
                    value={formState.shortDescription}
                    onChange={(value) =>
                      handleQuillChange("shortDescription", value)
                    }
                  />

                  {/* <ReactQuill id="form-category/description" theme="snow" name="shortDescription" value={formState.shortDescription} onChange={handleChange} /> */}
                </div>
                <div className="row g-4 mb-4">
                  <div className="col">
                    <label htmlFor="form-product/brandName" className="form-label">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.brandName ? "border-danger" : ""}`}
                      id="form-product/brandName"
                      name="brandName"
                      value={formState.brandName}
                      onChange={handleChange}
                    />
                    {errors.brandName && (
                      <div className="text-danger mt-1">This field is required</div>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="form-product/sku" className="form-label">
                      SKU/Code
                    </label>
                    <input
                      type="string"
                      className={`form-control ${errors.sku ? "border-danger" : ""}`}
                      id="form-product/sku"
                      name="sku"
                      value={formState.sku}
                      onChange={handleChange}
                    />
                    {errors.sku && (
                      <div className="text-danger mt-1">This field is required</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory section */}
            <div className="card mt-5">
              <div className="card-body p-5">
                <div
                  className="mb-5 "
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2 className="mb-0 fs-exact-18">Inventory</h2>
                </div>
                <div className="row g-4">
                  <div className="col">
                    <label htmlFor="form-product/price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className={`form-control ${errors.price ? "border-danger" : ""}`}
                      id="form-product/price"
                      name="price"
                      min={1}
                      value={formState.price}
                      onChange={handleChange}
                    />
                    {errors.price && (
                      <div className="text-danger mt-1">Price must be greater than 0</div>
                    )}
                  </div>
                  <div className="col">
                    <label
                      htmlFor="form-product/discounted-price"
                      className="form-label"
                    >
                      Percentage off
                    </label>
                    <input
                      disabled={!formState.price}
                      type="number"
                      className="form-control"
                      id="form-product/discounted-percentage"
                      name="discountedPercentage"
                      value={formState.discountedPercentage}
                      min={1}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <label
                      htmlFor="form-product/discounted-price"
                      className="form-label"
                    >
                      Discounted Price
                    </label>
                    <input
                      type="number"
                      readOnly
                      className="form-control"
                      id="form-product/discounted-price"
                      name="discountedPrice"
                      value={formState.discountedPrice}
                      min={0}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <label
                      htmlFor="form-product/stock"
                      className="form-label"
                    >
                      Stock quantity
                    </label>
                    <input
                      min={0}
                      type="number"
                      className={`form-control ${errors.stock ? "border-danger" : ""}`}
                      id="form-product/stock"
                      name="stock"
                      value={formState.stock}
                      onChange={handleChange}
                    />
                    {errors.stock && (
                      <div className="text-danger mt-1">Stock cannot be 0 or Negative</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* INVENTORY */}
            <div className="card mt-5">
              <div className="card-body p-5">
                <div className="upload-header d-flex justify-content-between">
                  <h2 className="fs-exact-18 mb-0">Bulk Pricing</h2>

                  <button type="button" className="btn btn-dark" onClick={addBulkPrice} >
                    <Plus size={16} className="me-2" />
                    Add Bulk Price
                  </button>
                </div>
              </div>

              <div className="upload-container px-5">
                {formState.bulkPrices && formState.bulkPrices.length > 0 &&
                  <>
                    <div className="row g-3 mb-3">
                      <div className="col">
                        <label
                          htmlFor="form-product/stock"
                          className="form-label"
                        >
                          Min Qty
                        </label>
                      </div>
                      <div className="col">
                        <label
                          htmlFor="form-product/stock"
                          className="form-label"
                        >
                          Max Qty (optional)
                        </label>
                      </div>
                      <div className="col">
                        <label
                          htmlFor="form-product"
                          className="form-label"
                        >
                          Percentage off
                        </label>
                      </div>
                      <div className="col">
                        <label
                          htmlFor="form-product"
                          className="form-label"
                        >
                          Price
                        </label>
                      </div>
                      <div className="col-auto">
                        <button type="button" style={{ opacity: 0 }} >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </div>
                    {formState.bulkPrices.map((bp, i) => (
                      <div className="row g-3 mb-3" key={i}>
                        <div className="col">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Min Qty"
                            value={bp.minQuantity}
                            onChange={(e) =>
                              updateBulkPrice(i, "minQuantity", Number(e.target.value))
                            }
                          />
                        </div>
                        <div className="col">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Max Qty (optional)"
                            value={bp.maxQuantity}
                            onChange={(e) =>
                              updateBulkPrice(i, "maxQuantity", e.target.value)
                            }
                          />
                        </div>
                        <div className="col">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Price percentage"
                            value={bp.percentage}
                            disabled={!formState.price}
                            min={1}
                            onChange={(e) =>
                              updateBulkPrice(i, "percentage", Number(e.target.value))
                            }
                          />
                        </div>
                        <div className="col">
                          <input
                            type="number"
                            readOnly
                            className="form-control"
                            placeholder="Price"
                            value={bp.price}
                          />
                        </div>
                        <div className="col-auto">
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeBulkPrice(i)}
                          >
                            <XCircle size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                }
              </div>

            </div>

            {/* Image section */}
            <div className="card mt-5">
              <div className="card-body p-5">
                <div className="upload-header  d-flex justify-content-between">
                  <h2 className="mb-0 fs-exact-18">Upload Images</h2>

                  <div >
                    <button type="button" className="btn btn-dark" onClick={handleButtonClick} >
                      <Upload size={16} className="me-2" />
                      Upload File
                    </button>
                    {/* <button type="button" className="edit-images-button w-100" onClick={handleButtonClick}>
                    Upload File
                  </button> */}

                    <input type="file" multiple ref={fileInputRef} className="hidden hide" onChange={handleFileChange} />
                  </div>
                </div>
              </div>

              <div className="upload-container px-5">
                {formState.images?.length > 0 && (
                  <div className="table-wrapper">
                    <div className="overflow-auto">
                      <table className="upload-table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Alt Text</th>
                            <th>Order</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {formState.images.map((image) => (
                            <tr key={image.id}>
                              <td>
                                <img width={100} height={100} alt={image.alt} src={convertS3UrlToLocalPath(image.base64)} />
                              </td>
                              <td>
                                <input
                                  className="upload-input"
                                  type="text"
                                  placeholder="Enter alt text"
                                  value={image.alt}
                                  onChange={(e) => handleAltChange(image.id, e.target.value)}
                                />
                              </td>
                              <td>
                                <input
                                  className="upload-input upload-number"
                                  type="number"
                                  value={image.order}
                                  onChange={(e) => handleOrderChange(image.id, e.target.value)}
                                />
                              </td>
                              <td>
                                <button className="remove-btn" onClick={() => handleRemoveImage(image.id)}>
                                  <XCircle size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Parameter Inputs */}
            <div className="card mt-5">
              <div className="card-body p-5">
                <div className="mb-5">
                  <h2 className="mb-0 fs-exact-18">Parameters</h2>
                </div>
                <div className="row g-4 mb-4">
                  <div className="col">
                    <label htmlFor="form-product/ccDistance" className="form-label">
                      color
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="form-product/ccDistance"
                      name="color"
                      value={formState.color}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="form-product/mechanism" className="form-label">
                      length (cm)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      id="form-product/mechanism"
                      name="length"
                      value={formState.length}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col">
                    <label htmlFor="form-product/installationToCabinet" className="form-label">
                      width (cm)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      id="form-product/installationToCabinet"
                      name="width"
                      value={formState.width}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="form-product/diameter" className="form-label">
                      height (cm)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      id="form-product/diameter"
                      name="height"
                      value={formState.height}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col">
                    <label htmlFor="form-product/magnet" className="form-label">
                      weight (grams)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      id="form-product/magnet"
                      name="weight"
                      value={formState.weight}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="form-product/material" className="form-label">
                      capacity (ml)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      id="form-product/material"
                      name="capacity"
                      value={formState.capacity}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col">
                    <label htmlFor="form-product/surfaceFinishing" className="form-label">
                      material
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="form-product/surfaceFinishing"
                      name="material"
                      value={formState.material}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="form-product/boardThickness" className="form-label">
                      handlingType
                    </label>
                    <Select
                      name="handlingType"
                      options={handelingType.map((val) => ({ label: val, value: val }))}
                      value={{ label: formState.handlingType, value: formState.handlingType }}
                      onChange={(e) => handleQuillChange("handlingType", e.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Varient */}
            <div className="card mt-5">
              <div className="card-body p-5">
                <div
                  className="mb-5 "
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2 className="mb-0 fs-exact-18">Varients</h2>
                  {/* Button to Open Popup */}
                  <Popup
                    trigger={
                      <span className="btn btn-light mb-3">
                        <Plus size={16} className="me-2" />
                        Add Variant Type
                      </span>
                    }
                    modal
                    closeOnDocumentClick
                  >
                    {(close) => (
                      <div className="p-5 bg-white rounded ">
                        <h2 className="text-lg font-semibold mb-2">
                          Add Variant
                        </h2>
                        <hr />
                        {/* Your Form or Content */}
                        <form>
                          <label htmlFor="variantType">
                            Variant Type Name:{" "}
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Variant Type"
                            id="variantType"
                            className=" p-2 w-ful l"
                            onChange={(e) => {
                              variantTypeChange(e);
                            }}
                          />
                          <br />
                          <button
                            type="button"
                            className="bg-blue-500 text-black px-4 py-2 rounded mt-3 btn-primary btn"
                            onClick={(e) => handleVariantSubmit(e, close)}
                          >
                            Save & Close
                          </button>
                        </form>
                      </div>
                    )}
                  </Popup>
                </div>
                <div>
                  <Popup
                    open={isOpen}
                    trigger={
                      <span className="btn btn-dark my-4 w-100" >
                        <Plus size={16} className="me-2" />
                        Add Product Variant
                      </span>
                    }
                    modal
                    closeOnDocumentClick
                  >
                    {(close) => (
                      <div
                        className="card p-2"
                        style={{
                          maxHeight: "80vh",
                          width: "60vw",
                          overflow: "auto",
                        }}
                      >
                        <form className="">
                          <div className="">
                            <div className="card-body ">
                              <button type="button" className="btn-close float-end" aria-label="Close" onClick={close} ></button>
                              <h3 className="mb-3">Product Variants</h3>
                              {popupFormState.productVariants.map(
                                (variant, index) => (
                                  <div key={index} className="variant-section" >
                                    <label className="form-label">Variant Type</label>
                                    {variant.attributes.map(
                                      (attr, attrIndex) => (
                                        <div key={attrIndex} className="row g-3">
                                          <div className="col-12 col-md-6">
                                            <Select
                                              name="name"
                                              value={{
                                                value: attr.name,
                                                label: attr.name,
                                              }}
                                              onChange={(selectedOption) => {
                                                if (selectedOption) {
                                                  handleAttributeChange(
                                                    index,
                                                    attrIndex,
                                                    {
                                                      target: {
                                                        name: "name",
                                                        value:
                                                          selectedOption.value,
                                                      },
                                                    }
                                                  );
                                                }
                                              }}
                                              options={
                                                variantTypes?.map(
                                                  (variant) => ({
                                                    value: variant.name,
                                                    label: variant.name,
                                                  })
                                                ) || []
                                              }
                                              placeholder="Select Attribute"
                                            />
                                          </div>
                                          <div className="col-12 col-md-6">
                                            <input
                                              type="text"
                                              name="value"
                                              value={attr.value}
                                              placeholder="Attribute Value"
                                              className="form-control"
                                              onChange={(e) =>
                                                handleAttributeChange(
                                                  index,
                                                  attrIndex,
                                                  e
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                      )
                                    )}

                                    <div className="row g-3 mt-2">
                                      <div className="col-12">
                                        <label className="form-label">
                                          Variant Name
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="variantName"
                                          value={variant.variantName}
                                          onChange={(e) =>
                                            handleVariantChange(
                                              index,
                                              "variantName",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>

                                    <div className="row g-3 mt-2">
                                      <div className="col-12 col-md-4">
                                        <label className="form-label">
                                          Price
                                        </label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          name="price"
                                          value={variant.price}
                                          min={1}
                                          onChange={(e) =>
                                            handleVariantChange(
                                              index,
                                              "price",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="col-12 col-md-4">
                                        <label className="form-label">
                                          Percentage off
                                        </label>
                                        <input
                                          disabled={!variant.price}
                                          type="number"
                                          className="form-control"
                                          name="discountedPercentage"
                                          value={variant.discountedPercentage}
                                          min={1}
                                          onChange={(e) =>
                                            handleVariantChange(
                                              index,
                                              "discountedPercentage",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="col-12 col-md-4">
                                        <label className="form-label">
                                          Discounted Price
                                        </label>
                                        <input
                                          type="number"
                                          readOnly
                                          className="form-control"
                                          name="discountedPrice"
                                          value={variant.discountedPrice}
                                        />
                                      </div>
                                      <div className="col-12 col-md-6">
                                        <label className="form-label">
                                          Stock quantity
                                        </label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          name="stock"
                                          min={1}
                                          value={variant.stock}
                                          onChange={(e) =>
                                            handleVariantChange(
                                              index,
                                              "stock",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="col-12 col-md-6">
                                        <label className="form-label">
                                          SKU/Code
                                        </label>
                                        <input
                                          type="string"
                                          className="form-control"
                                          name="sku"
                                          value={variant.sku}
                                          onChange={(e) =>
                                            handleVariantChange(
                                              index,
                                              "sku",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="mb-3">
                                        <label className="form-label">
                                          Description
                                        </label>
                                        <ReactQuill
                                          value={variant.description}
                                          onChange={(value) =>
                                            handleVariantChange(
                                              index,
                                              "description",
                                              value
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="mb-3">
                                        <label className="form-label">
                                          Short Description
                                        </label>
                                        <ReactQuill
                                          value={variant.shortDescription}
                                          onChange={(value) =>
                                            handleVariantChange(
                                              index,
                                              "shortDescription",
                                              value
                                            )
                                          }
                                        />
                                      </div>
                                    </div>

                                    <button type="button" className="btn btn-dark my-4 w-100" onClick={() => addBulkVariantPrice(index)} >
                                      <Plus size={16} className="me-2" />
                                      Add Bulk Price
                                    </button>

                                    {variant.bulkPrices && variant.bulkPrices.length > 0 &&
                                      <>
                                        <div className="row g-3 mb-3">
                                          <div className="col">
                                            <label
                                              htmlFor="form-product/stock"
                                              className="form-label"
                                            >
                                              Min Qty
                                            </label>
                                          </div>
                                          <div className="col">
                                            <label
                                              htmlFor="form-product/stock"
                                              className="form-label"
                                            >
                                              Max Qty (optional)
                                            </label>
                                          </div>
                                          <div className="col">
                                            <label
                                              htmlFor="form-product"
                                              className="form-label"
                                            >
                                              Percentage off
                                            </label>
                                          </div>
                                          <div className="col">
                                            <label
                                              htmlFor="form-product"
                                              className="form-label"
                                            >
                                              Price
                                            </label>
                                          </div>
                                          <div className="col-auto">
                                            <button type="button" style={{ opacity: 0 }} >
                                              <XCircle size={18} />
                                            </button>
                                          </div>
                                        </div>
                                        {variant.bulkPrices.map((bp, i) => (
                                          <div className="row g-3 mb-4" key={i}>
                                            <div className="col">
                                              <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Min Qty"
                                                value={bp.minQuantity}
                                                onChange={(e) =>
                                                  updateBulkVariantPrice(index, i, "minQuantity", Number(e.target.value))
                                                }
                                              />
                                            </div>
                                            <div className="col">
                                              <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Max Qty (optional)"
                                                value={bp.maxQuantity}
                                                onChange={(e) =>
                                                  updateBulkVariantPrice(index, i, "maxQuantity", e.target.value)
                                                }
                                              />
                                            </div>
                                            <div className="col">
                                              <input
                                                type="number"
                                                disabled={!variant.price}
                                                className="form-control"
                                                placeholder="Percentage"
                                                value={bp.percentage}
                                                min={1}
                                                onChange={(e) =>
                                                  updateBulkVariantPrice(index, i, "percentage", Number(e.target.value))
                                                }
                                              />
                                            </div>
                                            <div className="col">
                                              <input
                                                type="number"
                                                readOnly
                                                className="form-control"
                                                placeholder="Price"
                                                value={bp.price}
                                              />
                                            </div>
                                            <div className="col-auto">
                                              <button
                                                type="button"
                                                className="remove-btn"
                                                onClick={() => removeBulkVariantPrice(index, i)}
                                              >
                                                <XCircle size={18} />
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                      </>
                                    }
                                    <div className="row g-4 mb-4">
                                      <div className="col-12 col-md-6">
                                        <label htmlFor="form-product/ccDistance" className="form-label">
                                          color
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="form-product/ccDistance"
                                          name="color"
                                          value={variant.color}
                                          onChange={(e) =>
                                            handleVariantChange(index, "color", e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="col-12 col-md-6">
                                        <label htmlFor="form-product/mechanism" className="form-label">
                                          length (cm)
                                        </label>
                                        <input
                                          type="number"
                                          step="0.01"
                                          className="form-control"
                                          id="form-product/mechanism"
                                          name="length"
                                          value={variant.length}
                                          onChange={(e) =>
                                            handleVariantChange(index, "length", e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="col-12 col-md-6">
                                        <label htmlFor="form-product/installationToCabinet" className="form-label">
                                          width (cm)
                                        </label>
                                        <input
                                          type="number"
                                          step="0.01"
                                          className="form-control"
                                          id="form-product/installationToCabinet"
                                          name="width"
                                          value={variant.width}
                                          onChange={(e) =>
                                            handleVariantChange(index, "width", e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="col-12 col-md-6">
                                        <label htmlFor="form-product/diameter" className="form-label">
                                          height (cm)
                                        </label>
                                        <input
                                          type="number"
                                          step="0.01"
                                          className="form-control"
                                          id="form-product/diameter"
                                          name="height"
                                          value={variant.height}
                                          onChange={(e) =>
                                            handleVariantChange(index, "height", e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="col-12 col-md-6">
                                        <label htmlFor="form-product/magnet" className="form-label">
                                          weight (grams)
                                        </label>
                                        <input
                                          type="number"
                                          step="0.01"
                                          className="form-control"
                                          id="form-product/magnet"
                                          name="weight"
                                          value={variant.weight}
                                          onChange={(e) =>
                                            handleVariantChange(index, "weight", e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="col-12 col-md-6">
                                        <label htmlFor="form-product/material" className="form-label">
                                          capacity (ml)
                                        </label>
                                        <input
                                          type="number"
                                          step="0.01"
                                          className="form-control"
                                          id="form-product/material"
                                          name="capacity"
                                          value={variant.capacity}
                                          onChange={(e) =>
                                            handleVariantChange(index, "capacity", e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="col-12 col-md-6">
                                        <label htmlFor="form-product/surfaceFinishing" className="form-label">
                                          material
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="form-product/surfaceFinishing"
                                          name="material"
                                          value={variant.material}
                                          onChange={(e) =>
                                            handleVariantChange(index, "material", e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                              <button
                                type="button" className="btn btn-primary mt-3"
                                onClick={(e) => {
                                  close();
                                  editVariantIndex ? editVariantData(e) : handleVarientSave(e);
                                }}
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </Popup>
                </div>
                {submittedVariants.length > 0 && (
                  <table className="table mt-4">
                    <thead>
                      <tr>
                        <th>Variant Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {submittedVariants.map((variant, index) => (
                        <tr key={index}>
                          <td>{variant.variantName}</td>
                          <td>{variant.price}</td>
                          <td>{variant.stock}</td>
                          <td>
                            <div className="d-flex gap-5">
                              <button
                                type="button"
                                onClick={(e) => {
                                  handleOpenVariantForm(e, variant, index + 1);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 1.56 1.56"
                                  space="preserve"
                                >
                                  <path d="m.285 1.002.267.267c.012.012.03.012.042 0L1.26.6a.03.03 0 0 0 0-.042L.996.294a.03.03 0 0 0-.042 0L.285.963c-.012.012-.012.03 0 .039m.798-.831a.03.03 0 0 0 0 .042l.264.264c.012.012.03.012.042 0l.075-.075a.113.113 0 0 0 0-.165L1.323.096a.12.12 0 0 0-.171 0zM.063 1.446a.044.044 0 0 0 .051.051l.327-.078a.1.1 0 0 0 .027-.015l.006-.006c.006-.006.009-.027-.003-.039l-.27-.27C.189 1.077.168 1.08.162 1.086l-.006.006a.1.1 0 0 0-.015.027z" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  setSubmittedVariants((prevVariants) =>
                                    prevVariants.filter((_, i) => i !== index)
                                  );
                                }}
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="-0.015 0 0.57 0.57"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M.148.447c0 .014.021.033.034.033h.206C.402.48.422.461.422.447V.18H.148zM.45.104H.377L.34.06H.23L.193.104H.12v.044h.33z"
                                    fillRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/*  Search engine optimization */}
            <div className="card mt-5">
              <div className="card-body p-5">
                <div className="mb-5">
                  <h2 className="mb-0 fs-exact-18">
                    Search engine optimization
                  </h2>
                  <div className="mt-3 text-muted">
                    Provide information that will help improve the snippet and
                    bring your product to the top of search engines.
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="form-category/seo-title"
                    className="form-label"
                  >
                    Page title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="form-category/seo-title"
                    name="metaTitle"
                    value={formState.metaTitle}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="form-category/seo-description"
                    className="form-label"
                  >
                    Meta description
                  </label>
                  <textarea
                    id="form-category/seo-description"
                    className="form-control"
                    rows={2}
                    name="metaDescription"
                    value={formState.metaDescription}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="sa-entity-layout__sidebar">
            <div className="card w-100">
              <div className="card-body p-5">
                <div className="mb-5">
                  <h2 className="mb-0 fs-exact-18">Visibility</h2>
                </div>
                <div className="mb-4">
                  <label className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="visibility"
                      value="true"
                      onChange={handleChange}
                      // onClick={(e) => {
                      //     e.target.value === "true" || e.target.value === true
                      //   );
                      // }}
                      checked={formState.visibility === true}
                    />
                    <span className="form-check-label">Published</span>
                  </label>
                  <label className="form-check mb-0">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="visibility"
                      value="false"
                      onChange={handleChange}
                      checked={formState.visibility === false}
                    />

                    <span className="form-check-label">Hidden</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="card w-100 mt-5">
              <div className="card-body p-5">
                <div className="mb-5">
                  <h2 className="mb-0 fs-exact-18">Visible On</h2>
                </div>
                <Select
                  name="visible_on"
                  options={visible_on}
                  onChange={(selectedOptions) =>
                    setFormState((prev) => {
                      return { ...prev, visible_on: selectedOptions.value };
                    })
                  }
                />
              </div>
            </div>
            <div className="card w-100 mt-5">
              <div className="card-body p-5">
                <div className="mb-5">
                  <h2 className="mb-0 fs-exact-18">category</h2>
                </div>
                <Select
                  name="categories"
                  isMulti
                  options={categories}
                  // value={formState}
                  onChange={(e) =>
                    handleMultiSelectChange(
                      "categories",
                      e?.map((item) => item.value)
                    )
                  }
                />

                <div className="form-text">
                  Select a category will show this product.
                </div>
              </div>
            </div>
            <div className="card w-100 mt-5">
              <div className="card-body p-5">
                <div className="mb-5">
                  <div className="d-flex justify-content-between align-items-center">
                    <h2 className="mb-0 fs-exact-18">Tags</h2>
                    <Popup
                      trigger={
                        <span className="btn btn-light mb-3">Add Tag</span>
                      }
                      modal
                      closeOnDocumentClick
                    >
                      {(close) => (
                        <form
                          className="p-5 rounded shadow bg-white"
                          onSubmit={(e) => handleSubmitTags(e, close)} // Form Submission
                        >
                          <h2 className="text-lg font-semibold mb-2">
                            Add Tag
                          </h2>
                          <hr className="mb-3" />

                          <table className="w-full border-collapse">
                            <tbody>
                              {/* Tag Input Row */}
                              <tr>
                                <td className="p-2 font-medium">
                                  <label htmlFor="tags">Tags:</label>
                                </td>
                                <td className="p-2">
                                  <input
                                    type="text"
                                    id="tags"
                                    name="name"
                                    placeholder="Enter tag"
                                    className="p-2 w-full border rounded"
                                    value={tags.name}
                                    onChange={(e) => handleInputTags(e, "tag")}
                                    required
                                  />
                                </td>
                              </tr>

                              {/* Submit Button Row */}
                              <tr>
                                <td colSpan="2" className="p-2 text-center">
                                  <button
                                    type="submit"
                                    className="bg-blue-500 btn btn-primary px-4 py-2 rounded mt-3"
                                  >
                                    Save & Close
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </form>
                      )}
                    </Popup>
                  </div>
                </div>
                <Select
                  name="tags"
                  isMulti
                  options={tag.map((t) => {
                    return { value: t.id, label: t.name }
                  })}
                  onChange={(e) =>
                    handleMultiSelectChange(
                      "tags",
                      e?.map((item) => item.value)
                    )
                  }
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
