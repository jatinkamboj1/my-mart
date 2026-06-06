"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import axios from "axios";
import { useParams } from "next/navigation";
import { fetchProductById, getDiscountedAmount, updateProduct } from "@/app/api/products";
import { useSession } from "next-auth/react";
import { Plus, Upload, XCircle } from "lucide-react";
import Popup from "reactjs-popup";
import { useRouter } from "next/navigation";
import { fetchTags, addTags } from "@/app/api/tags";
import toast from "react-hot-toast";
import Image from "next/image";
import { convertS3UrlToLocalPath } from "@/utils/util";

const Page = () => {
  const ref = useRef();

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

  const handelingType = [
    "NORMAL",
    "FRAGILE",
    "PERISHABLE",
  ]

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

  const Navigate = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [variantTypes, setVariantTypes] = useState([]);
  const [editVariantIndex, setEditVariantIndex] = useState();
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const { data: session, status } = useSession();
  const token = session?.user?.token;

  const [formState, setFormState] = useState(productState);
  const [popupFormState, setPopupFormState] = useState(varientState);

  const [tag, setTag] = useState({
    name: "",
    isCategory: false,
  });

  const [tags, setTags] = useState([]);
  
    const [errors, setErrors] = useState({
      name: false,
      slug: false,
      sku: false,
      brandName: false,
      price: false,
      stock: false
    });

  const [submittedPopUpFormState, setSubmittedPopUpFormState] = useState([]);


  useEffect(() => {
    if (id && token) {
      loadProduct(id, token);
    }
    fetchCategories();
    getTags();
  }, [id, token]);


  const loadProduct = async (productId) => {
    try {
      if (!token) {
        console.warn("Token is not available yet, skipping fetch.");
        return;
      }

      const productData = await fetchProductById(productId, token);
      if (!productData) {
        // console.error("No data received from API");
        toast.error("Product data not found");
        return;
      }

      setProductData(productData.data || productData);

      setSubmittedPopUpFormState((prev) => ({
        ...prev,
        productVariants: productData.ProductVariant.map((variant) => ({
          ...variant,
          attributes: variant.variantAttributes
            ? variant.variantAttributes.map((attr) => ({
              name: attr.name || "",
              value: attr.value || "",
            }))
            : [{ name: "", value: "" }],
        })),
      }));
    } catch (error) {
      // console.error("Error loading product:", error);
    }
  };

  const [tagState, setTagState] = useState([]);

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

  useEffect(() => {
    setTagState(formState.Tag);
  }, [formState.Tag]);

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      ["tags"]: tagState,
    }));
  }, [tagState]);

  const setProductData = (productData) => {
    const productVariants =
      productData.ProductVariant && productData.ProductVariant.length > 0
        ? productData.ProductVariant.map((variant) => ({
          ...formState.productVariants,
          ...variant,
          attributes: Array.isArray(variant.variantAttributes)
            ? variant.variantAttributes
            : [],
        }))
        : [];

    setFormState({ ...productData, categories: productData.Category, productVariants });
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}/category/names`);
      const formattedCategories = response.data.categories.map((category) => ({
        value: category.id,
        label: category.categoryName,
      }));
      setCategories(formattedCategories);
    } catch (error) {
      // console.error("Error fetching categories:", error);
    }
  };

  const getTags = async () => {
    try {
      const response = await fetchTags(token);
      // const formattedTags = response
      //   .filter((tag) => tag.isCategory === false)
      //   .map((tag) => {
      //     return {
      //       label: tag.name,
      //       value: tag.id,
      //     };
      //   });
      if (response?.length) {
        const filteredTags = response.filter(
          (item) =>
            !item.isCategory &&
            !item.isMetal &&
            !item.isPolish &&
            !item.isStone &&
            !item.isOccasion &&
            !item.isCollection
        );

        setTags(filteredTags);
      }
      // setTags(formattedTags);
    } catch (error) { }
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
      let disP = "";
      if (field === "percentage") {
        disP = getDiscountedAmount(formState.discountedPrice ? formState.discountedPrice : formState.price, value);
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

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "slug") {
      const regex = /^[a-z0-9\-]*$/;
      if (!regex.test(value)) {
        toast.error("Invalid slug.");
        return;
      }
    }
    if (name === "price" && formState.discountedPercentage) {
      if (Number(value) > 0) {
        setFormState((prevState) => ({
          ...prevState,
          discountedPrice: getDiscountedAmount(value, prevState.discountedPercentage)
        }));
      } else {
        setFormState((prevState) => ({
          ...prevState,
          discountedPrice: ""
        }));
      }
    }
    if (name === "discountedPercentage") {
      if (Number(value) > 0) {
        setFormState((prevState) => ({
          ...prevState,
          discountedPrice: getDiscountedAmount(prevState.price, value)
        }));
      } else {
        setFormState((prevState) => ({
          ...prevState,
          discountedPrice: ""
        }));
      }
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

  const handleEditorChange = (name) => (value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (name, selectedOptions) => {
    if (name === "categories") {
      setFormState((prevState) => {
        const updatedState = {
          ...prevState,
          [name]: selectedOptions.map((option) => ({
            id: option.value, // Convert back to original format
            categoryName: option.label, // Keep label consistent
          })), // Ensures state is always an array
        };
        return updatedState;
      });
    } else {
      if (name === "tags")
        setFormState((prevState) => ({
          ...prevState,
          ["Tag"]: selectedOptions.map((option) => option.value), // Store only values
        }));
      // setFormState((prevState) => {
      //   const updatedState = {
      //     ...prevState,
      //     [name]: selectedOptions.map((option) => ({
      //       id: option.value, // Convert back to original format
      //       name: option.label, // Keep label consistent
      //     })), // Ensures state is always an array
      //   };
      //   return updatedState;
      // });
      if (!Array.isArray(selectedOptions)) {
        selectedOptions = [];
      }

      setFormState((prevState) => ({
        ...prevState,
        [name]: selectedOptions.map((option) => option.value), // Store only values
      }));

    }
  };

  const handleVariantChange = (index, field, value) => {
      setPopupFormState((prevState) => {
        const updatedVariants = [...prevState.productVariants];
        let disP = "";
        if (field === "price" && updatedVariants[index].discountedPercentage) {
          if (Number(value) > 0) {
            disP = getDiscountedAmount(value, updatedVariants[index].discountedPercentage);
          }
          updatedVariants[index] = { ...updatedVariants[index], discountedPrice: disP };
        }
        if (field === "discountedPercentage") {
          if (Number(value) > 0) {
            disP = getDiscountedAmount(updatedVariants[index].price, value);
          }
          updatedVariants[index] = { ...updatedVariants[index], discountedPrice: disP };
        }
        updatedVariants[index] = { ...updatedVariants[index], [field]: value };
        return { ...prevState, productVariants: updatedVariants };
      });
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
          base64: e.target.result,
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

  const handleAltChange = (id, value) => {
    setFormState((prev) => ({
      ...prev,
      images: prev.images.map((img) =>
        img.id === id ? { ...img, alt: value } : img
      ),
    }));
  };

  const handleOrderChange = (id, value) => {
    setFormState((prev) => ({
      ...prev,
      images: prev.images.map((img) =>
        img.id === id ? { ...img, order: Number(value) } : img
      ),
    }));
  };

  const handleVarientSave = (e) => {
    e.preventDefault();
    const data = submittedPopUpFormState;
    const abc = data["productVariants"];
    abc.push(popupFormState.productVariants[0]);
    data["productVariants"] = abc;

    // setSubmittedPopUpFormState((prev) => ({
    //   ...prev,
    //   productVariants: [
    //     ...prev.productVariants,
    //     popupFormState.productVariants[0],
    //   ],
    // }));
    setSubmittedPopUpFormState(data);

    setPopupFormState(varientState);
  };

  useEffect(() => {
    if (submittedPopUpFormState) savePopupData();
  }, [submittedPopUpFormState]);

  const savePopupData = () => {
    const productVariants = Array.isArray(submittedPopUpFormState)
      ? [...submittedPopUpFormState]
      : submittedPopUpFormState?.productVariants || [];
    const data = formState;
    data["productVariants"] = productVariants;

    setFormState(data);
  };

  const editVariantData = (e) => {
    e.preventDefault();
    const data = submittedPopUpFormState;
    const abc = data["productVariants"][editVariantIndex - 1];
    // abc.push(popupFormState.productVariants[0]);
    data["productVariants"][editVariantIndex - 1] =
      popupFormState.productVariants[0];

    setSubmittedPopUpFormState({ productVariants: data["productVariants"] });
    setEditVariantIndex();

    setPopupFormState(varientState);
  };

  const handleRemoveImage = (id) => {
    setFormState((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }));
  };

  const fetchVariantTypes = async () => {
    try {
      const response = await axios.get(
        `${process.env.SERVER_URL}/product/varient-types`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVariantTypes(response.data.variants);
    } catch (error) {
      // console.error(
      //   "Error fetching variant types:",
      //   error.response?.data || error.message
      // );
    }
  };

  useEffect(() => {
    if (token) {

      fetchVariantTypes();
    }
  }, [token]);

  const handleVariantSubmit = async (e, close) => {
    e.preventDefault();
    const type = variantType;
    if (!type.trim()) {
      toast.warning("Variant Type Name is required!");
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
        fetchVariantTypes();

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

  // Clean and validate data before submission
  const prepareFormData = (state) => {
    const cleaned = { ...state };
    console.log('cleaned', cleaned);
    
    // Ensure all numbers are properly formatted
    cleaned.price = Number(cleaned.price) || 0;
    cleaned.stock = Number(cleaned.stock) || 0;
    cleaned.discountedPrice = cleaned.discountedPrice
      ? Number(cleaned.discountedPrice)
      : null;

    // Clean product variants
    cleaned.productVariants = cleaned.productVariants.map((variant) => ({
      ...variant,
      price: Number(variant.price) || 0,
      stock: Number(variant.stock) || 0,
      salableQuantity: Number(variant.salableQuantity) || 0,
    }));

    // Remove any non-serializable properties if needed
    cleaned.images = cleaned.images.map((img) => ({
      id: img.id,
      alt: img.alt,
      order: img.order,
      base64: img.base64 || img.url,
    }));

    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return false;
    }
    try {
      // Prepare and clean the data
      const cleanedData = prepareFormData(formState);

      // Validate JSON formatting
      let productData;
      try {
        productData = JSON.stringify(cleanedData);
        JSON.parse(productData);
      } catch (jsonError) {
        // console.error("JSON Stringification Error:", jsonError);
        // toast.error("Invalid format in form data");
        return;
      }

      // Call the updateProduct function
      const response = await updateProduct(id, productData, token);

      if (response) {
        toast.success("Product updated successfully!");
        // Redirect to the product list page
      } else {
        toast.error("Failed to update product. No response received.");
      }
    } catch (error) {
      // console.error("Submission Error:", {
      //   message: error.message,
      //   stack: error.stack,
      //   response: error.response?.data,
      //   formState: formState,
      // });

      toast.error(
        "Something went wrong: " +
        (error.response?.data?.message || error.message)
      );
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

  const [variantType, setvariantType] = useState("");

  const variantTypeChange = (e) => {
    e.preventDefault();
    setvariantType(e.target.value);

  };

  // Handle changes in variant attributes

  // const updateVariantField = (variantIndex, field, value) => {
  //   const updatedVariants = [...formState.productVariants];
  //   updatedVariants[variantIndex][field] = value;
  //   setFormState({ ...formState, productVariants: updatedVariants });
  // };

  // const updateAttributeField = (variantIndex, attrIndex, field, value) => {
  //   const updatedVariants = [...formState.productVariants];
  //   updatedVariants[variantIndex].attributes[attrIndex][field] = value;
  //   setFormState({ ...formState, productVariants: updatedVariants });
  // };

  // Add New Tag
  const handleSubmitTags = async (e, close) => {
    e.preventDefault();

    // Prepare data
    // const tagData = {
    //   name: tag,
    //   isCategory: isCategory,
    // };

    const response = await addTags(tag, token);
    getTags();


    // Reset form fields after submission
    // setTag(tagData);

    // Close popup after saving
    close();
  };

  const handleOpenVariantForm = (e, variant, i) => {
    e.preventDefault();
    setIsOpen(true);
    setPopupFormState((prevState) => ({
      ...prevState,
      productVariants: [variant],
    }));
    setEditVariantIndex(i);
    ref.current.open();
  };

  const handleAction = (e) => {
    handleClose();
    if (editVariantIndex) {
      editVariantData(e);
    } else {
      handleVarientSave(e);
    }
    // editVariantIndex ? editVariantData(e) : handleVarientSave(e);
  };

  const handleClose = () => {
    setIsOpen(false);
    ref.current.close();
    setPopupFormState(varientState);
    close();
  };
  const handleInputTags = (e, tag) => {
    e.preventDefault();
    const { name, value } = e.target;

    setTag((prevTags) => ({
      ...prevTags,
      name: value,
      [name]: name === tag ? true : value,
    }));
  };
console.log('formState', formState);

  return (
    <>
      <div className="py-5">
        <div className="row g-4 align-items-center">
          <div className="col">
            <h1 className="h3 m-0">Edit Product</h1>
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
                    onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                    onChange={handleEditorChange("description")}
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
                    onChange={handleEditorChange("shortDescription")}
                  />

                  {/* <ReactQuill id="form-category/description" theme="snow" name="shortDescription" value={formState.shortDescription} onChange={handleInputChange} /> */}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                            min={0}
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
            <div className="card">
              <div className="card-body p-5">
                <div className="upload-header  d-flex justify-content-between">
                  <h2 className="mb-0 fs-exact-18">Upload Images</h2>

                  <div >
                    <button type="button" className="btn btn-dark" onClick={() => document.getElementById("fileInput").click()} >
                      <Upload size={16} className="me-2" />
                      Upload File
                    </button>
                    <input
                      id="fileInput"
                      type="file"
                      multiple
                      className="hidden-input"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
              <div className="upload-container px-5">
                {formState.images.length > 0 && (
                  <div className="table-container">
                    <table className="responsive-table">
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
                          <tr key={image.id} className="border-t">
                            <td>
                              <img width={100} height={100}
                                alt={image.alt}
                                src={convertS3UrlToLocalPath(image.url || image.base64)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                placeholder="Enter alt text"
                                value={image.alt}
                                onChange={(e) => handleAltChange(image.id, e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={image.order}
                                onChange={(e) => handleOrderChange(image.id, e.target.value)}
                              />
                            </td>
                            <td className="text-center">
                              <button className="remove-button" onClick={() => handleRemoveImage(image.id)}>
                                <XCircle className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                    onChange={handleEditorChange("handlingType")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Variant */}
            <div className="card mt-5">
              <div className="card-body p-5">
                <div className="d-flex justify-content-between">
                  <h5 className="mt-3">Variant</h5>
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

                {/* Varient Type PopUp */}
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
                                      <div className="col-12 col-md-6">
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

                {/* product varient */}
                {submittedPopUpFormState?.productVariants?.length > 0 && (
                  <table className="table mt-4">
                    <thead>
                      <tr>
                        <th>Variant Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {submittedPopUpFormState.productVariants.map(
                        (variant, index) => (
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
                                    setSubmittedPopUpFormState((prevState) => ({
                                      ...prevState, // Spread existing state
                                      productVariants:
                                        prevState.productVariants.filter(
                                          (_, i) => i !== index
                                        ), // Remove the specific variant
                                    }));
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
                        )
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                      checked={formState.visibility === true}
                      onChange={handleInputChange}
                    />
                    <span className="form-check-label">Published</span>
                  </label>
                  <label className="form-check mb-0">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="visibility"
                      value="false"
                      checked={formState.visibility === false}
                      onChange={handleInputChange}
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
                  value={visible_on.find(
                    (option) => option.value === formState.visible_on
                  )}
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
                  <h2 className="mb-0 fs-exact-18">Categories</h2>
                </div>
                <Select
                  name="categories"
                  isMulti
                  options={categories}
                  // value={formState.categories.map((val) => ({
                  //   value: val.id,
                  //   label: val.categoryName || val.label,
                  // }))}
                  // value={formState.categories}
                  value={formState.categories.map((cat) => ({
                    value: cat.id,
                    label: cat.categoryName,
                  }))}
                  onChange={(selected) => {
                    handleMultiSelectChange("categories", selected);
                  }}
                />
                <div className="form-text">
                  Select categories where this product will appear.
                </div>
              </div>
            </div>

            <div className="card w-100 mt-5">
              <div className="card-body p-5">
                <div className="mb-5 d-flex justify-content-between align-items-center">
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
                        className="p-5 bg-white rounded shadow"
                        onSubmit={(e) => handleSubmitTags(e, close)} // Form Submission
                        style={{ backgroundColor: "#F5F7FA" }}
                      >
                        <div className="bg-red">
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
                                    placeholder="Enter tag"
                                    className="p-2 w-full border rounded"
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
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
                        </div>
                      </form>
                    )}
                  </Popup>
                </div>
                <Select
                  name="tags"
                  isMulti
                  options={
                    tags.map((tag) => {
                      return {
                        value: tag.id,
                        label: tag.name,
                      }
                    })
                  }
                  value={

                    tags
                      .filter((tag) => formState.Tag.some((selectedTag) => (selectedTag.id || selectedTag) === tag.id)) // Correct check
                      .map((tag) => ({
                        value: tag.id,
                        label: tag.name,
                      }))

                  }
                  onChange={(selected) => {
                    handleMultiSelectChange("tags", selected);
                  }}
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
