"use client";
import { fetchProductBySlug, fetchRelativeProducts } from "@/app/api/products";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ProductCard from "@/components/ProductCard/productCard";
import Slider from "@/components/Slider/slider";
import WishlistButton from "@/components/WishlistButton/WishlistButton";
import "@/styles/productCard.scss";
import "@/styles/products.scss";
import "@/styles/pagination.scss";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useCartStore from "@/store/cartStore";
import { convertS3UrlToLocalPath } from "@/utils/util";
import { AlertCircle, CheckCircle2, Minus, Plus } from "lucide-react";
import Script from "next/script";


/* ===========================
   BULK PRICE HELPERS
=========================== */
const resolveBulkPrice = (bulkPrices = [], qty) => {
    if (!Array.isArray(bulkPrices)) return null;

    const slab = bulkPrices.find((bp) => {
        if (bp.maxQuantity === null) return qty >= bp.minQuantity;
        return qty >= bp.minQuantity && qty <= bp.maxQuantity;
    });

    if (!slab) return null;

    return {
        price: slab.price,
        discountedPrice: slab.discountedPrice ?? null,
    };
};

const resolveFinalPrice = ({ product, variant, qty }) => {

    // 1️⃣ Variant bulk price
    if (variant?.bulkPrices?.length) {
        const bulk = resolveBulkPrice(variant.bulkPrices, qty);
        if (bulk) return bulk;
    }

    // 2️⃣ Product bulk price
    if (product?.bulkPrices?.length) {
        const bulk = resolveBulkPrice(product.bulkPrices, qty);
        if (bulk) return bulk;
    }

    // 3️⃣ Variant normal price
    if (variant) {
        return {
            price: variant.price ?? 0,
            discountedPrice: variant.discountedPrice ?? null,
        };
    }

    // 4️⃣ Product normal price
    return {
        price: product?.price ?? 0,
        discountedPrice: product?.discountedPrice ?? null,
    };
};

const getActiveBulkPrices = (product, variant) => {
    if (variant?.bulkPrices?.length) return variant.bulkPrices;
    if (product?.bulkPrices?.length) return product.bulkPrices;
    return [];
};

export default function Product() {
    const { id } = useParams();
    const { addToCart } = useCartStore();
    const [product, setProduct] = useState({});
    const [productField, setProductField] = useState({
        name: null,
        description: null,
        shortDescription: null,
        discountedPrice: null,
        price: null,
        stock: null,
        sku: null,
        images: []
    });
    const [orderField, setOrderField] = useState({
        productId: null,
        productVarientId: null,
        stock: 1
    });
    const [products, setProducts] = useState([]);
    const { data: session, status } = useSession();
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [bulkSlabs, setBulkSlabs] = useState([]);

    // ✅ finalPrice is now an OBJECT
    const [finalPrice, setFinalPrice] = useState({
        price: 0,
        discountedPrice: null,
    });
    const token = session?.user?.token;

    const handleAddToCart = async () => {
        if (status === "authenticated" && token) {
            try {
                let response;
                // Check if the product has variants and add the first variant to the cart
                if (product?.ProductVariant?.length > 0) {
                    response = await addToCart(token, orderField.productId, orderField.productVarientId, orderField.stock);
                } else {
                    // If no variant, add the product to the cart without variant
                    response = await addToCart(token, orderField.productId, null, orderField.stock);
                }

                // Assuming the response from addToCart contains a message or status
                if (response?.message) {
                    toast.success(response.message);
                } else {
                    toast.success("Product added to Basket successfully");
                }
            } catch (error) {
                toast.error("Failed to add product to Basket");
                console.error("Add to Basket error: ", error);
            }
        } else {
            toast.error('Please login to buy products');
        }
    };

    useEffect(() => {
        if (id) {
            fetchProductData();
            fetchProducts();
        }
    }, [id]);

    const handleQty = (type) => {
        let stock = orderField.stock;
        if (type === "inc") {
            stock += 1;
        } else {
            stock -= 1;
        }
        if (stock > 0 && stock <= productField.stock) {
            setOrderField((prev) => ({ ...prev, stock }));
            setFinalPrice(
                resolveFinalPrice({
                    product,
                    variant: selectedVariant,
                    qty: stock,
                })
            );
        }
    }

    const handleVarient = (item) => {
        setSelectedVariant(item);
        setBulkSlabs(getActiveBulkPrices(product, item));
        if (!item?.id) {
            setProductField((prev) => ({ ...prev, ...product }));
            // setProductField(product);
            setOrderField((prev) => ({ ...prev, productVarientId: null }));
            setFinalPrice(
                resolveFinalPrice({ product: product, variant: null, qty: product.stock })
            );
            if (product.stock > 1 && orderField.stock > product.stock) {
                setOrderField((prev) => ({ ...prev, stock: product.stock }));
            }
            return
        }
        const data = {};
        const data2 = {};

        if (item.variantName) {
            data.name = item.variantName;
        }
        if (item.discountedPrice) {
            data.discountedPrice = item.discountedPrice;
        } else {
            data.discountedPrice = null;
        }
        if (item.price) {
            data.price = item.price;
        }
        if (item.id) {
            data.productVarientId = item.id;
            setOrderField((prev) => ({ ...prev, productVarientId: item.id }));
            setFinalPrice(
                resolveFinalPrice({ product: product, variant: item, qty: orderField.stock })
            );
        }

        if (item.brandName) {
            data2.brandName = item.brandName;
        }
        if (item.color) {
            data2.color = item.color;
        }
        if (item.length) {
            data2.length = item.length;
        } if (item.width) {
            data2.width = item.width;
        }
        if (item.height) {
            data2.height = item.height;
        }
        if (item.weight) {
            data2.weight = item.weight;
        }
        if (item.capacity) {
            data2.capacity = item.capacity;
        }
        if (item.material) {
            data2.material = item.material;
        }
        setProductField((prev) => ({ ...prev, ...data, ...data2 }));

        if (item.stock > 1 && orderField.stock > item.stock) {
            setOrderField((prev) => ({ ...prev, stock: item.stock }));
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetchRelativeProducts(0, 10, id);
            const product = response?.data?.products;
            if (product) setProducts(product);
        } catch (error) { }
    };

    const fetchProductData = async () => {
        try {
            const response = await fetchProductBySlug(id);
            if (response?.data) {
                const product = response.data;
                setProduct(product);
                const { id, images, name, description, shortDescription, discountedPrice, price, stock, sku, ProductVariant, brandName, color, length, width, height, weight, capacity, material } = product;
                setProductField({ id, images, name, description, shortDescription, discountedPrice, price, stock, sku, brandName, color, length, width, height, weight, capacity, material });
                setOrderField({ productId: id, stock: 1 });

                const initialVariant = null;
                // const initialVariant = ProductVariant?.[0] || null;
                handleVarient(initialVariant);
                setBulkSlabs(getActiveBulkPrices(product, initialVariant));
                setFinalPrice(
                    resolveFinalPrice({ product: product, variant: initialVariant, qty: 1 })
                );
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    if (!(product?.name)) {
        return <LoadingScreen />
    }

    return (
        <>
            <div className="shop-main-wrapper section-padding pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 order-1 order-lg-2">
                            <div className="product-details-inner">
                                <div className="row">
                                    <div className="col-lg-5 col-xl-6">
                                        <Slider arrows={true}>
                                            {productField.images.map((image, index) => (
                                                <div key={`product_slide-${index}`} className="pro-large-img img-zoom">
                                                    <img src={convertS3UrlToLocalPath(image.url)} alt={`${image?.description ?? product.name}`} />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                    <div className="col-lg-7 col-xl-6">
                                        <div className="product-details-des">
                                            <div className="manufacturer-name">
                                                <span>{product.brandName}</span>
                                                <div className="useful-links">
                                                    <WishlistButton id={product.id} token={token} />
                                                </div>
                                            </div>
                                            <h1 className="product-name">{productField.name}</h1>
                                            <span>Product Code: {productField.sku}</span>
                                            <div className="price-box">
                                                {finalPrice.discountedPrice ? (
                                                    <>
                                                        <span className="price-regular">
                                                            £{finalPrice.discountedPrice} <span className="price-regular-vat">(Ex. VAT)</span>
                                                        </span>
                                                        <span className="price-old">
                                                            <del>£{finalPrice.price} <span className="price-old-vat">(Ex. VAT)</span></del>
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="price-regular">
                                                        £{finalPrice.price} <span className="price-regular-vat">(Ex. VAT)</span>
                                                    </span>
                                                )}
                                            </div>
                                            {/* {product?.shortDescription && (
                                                <p className="pro-desc" dangerouslySetInnerHTML={{ __html: productField.shortDescription }} />
                                            )} */}

                                            <div className="row mt-3">
                                                <div className="col-md-5 px-0">
                                                    <div className="availability">
                                                        {productField.stock > 0 ? (
                                                            <div className="availability-div">
                                                                <CheckCircle2 fill="#41b658" stroke="white" />
                                                                <span className="availability-text" style={{ color: "#41b658" }}>Item in stock</span>
                                                            </div>
                                                        ) : (
                                                            <div className="availability-div">
                                                                <AlertCircle fill="red" stroke="white" />
                                                                <span className="availability-text" style={{ color: "red" }}>Item out of stock</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="quantity-cart-box d-flex align-items-center">
                                                        <h6 className="option-title">qty:</h6>
                                                        <div className="quantity">
                                                            <div className="pro-qty d-flex">
                                                                <button className="qtybtn" onClick={() => handleQty('dec')}>-</button>
                                                                <span >{orderField.stock}</span>
                                                                <button className="qtybtn" onClick={() => handleQty('inc')}>+</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-7">
                                                    {(bulkSlabs?.length) && (
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Quantity</th>
                                                                    <th className="text-end">Price</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {bulkSlabs.map((bp, i) => {
                                                                    const active =
                                                                        orderField.stock >= bp.minQuantity &&
                                                                        (!bp.maxQuantity ||
                                                                            orderField.stock <= bp.maxQuantity);

                                                                    return (
                                                                        <tr key={i} className={active ? "table-success" : ""}>
                                                                            <td>
                                                                                {bp.maxQuantity
                                                                                    ? `${bp.minQuantity}-${bp.maxQuantity}`
                                                                                    : `${bp.minQuantity}+`}
                                                                            </td>
                                                                            <td className="text-end">
                                                                                £{(bp.discountedPrice ?? bp.price)}
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <button className="btn btn-cart2 w-100" onClick={handleAddToCart}>Add to Basket</button>
                                                </div>

                                                <div className="col-md-6">
                                                    <WishlistButton className="w-100" id={product.id} token={token} type="btn" />
                                                </div>
                                            </div>
                                            {product.groupedVariantsObj && product.ProductVariant.length > 0 && (
                                                <div className="dropdown-wrapper open">
                                                    <div className="dropdown-head">
                                                        <span className="offer-text"><strong>Product Variants</strong></span>
                                                        <span className="minus-icon"><Minus /></span>
                                                        <span className="plus-icon"><Plus /></span>
                                                    </div>
                                                    <div className="dropdown-content">
                                                        <div>
                                                            {Object.entries(product.groupedVariantsObj).map(([section, items]) => (
                                                                <div key={section} className="pro-size">
                                                                    <h6 className="option-title">{section}:</h6>
                                                                    <div>
                                                                        <select className="nice-select" onChange={(e) => handleVarient(product.ProductVariant[e.target.value])}>
                                                                            <option selected={null === orderField.productVarientId} value={null}>Default</option>
                                                                            {items.map((item, i) => (
                                                                                <option key={item.variantName} selected={item.id === orderField.productVarientId} value={i}>{item.value}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {product?.shortDescription && (<div className="dropdown-wrapper open">
                                                <div className="dropdown-head">
                                                    <span className="offer-text"><strong>Product Details</strong></span>
                                                    <span className="minus-icon"><Minus /></span>
                                                    <span className="plus-icon"><Plus /></span>
                                                </div>
                                                <div className="dropdown-content">
                                                    <div className="tab-one" dangerouslySetInnerHTML={{ __html: productField.shortDescription }} />
                                                </div>
                                            </div>
                                            )}
                                            <div className="dropdown-wrapper open">
                                                <div className="dropdown-head">
                                                    <span className="offer-text"><strong>Product Description</strong></span>
                                                    <span className="minus-icon"><Minus /></span>
                                                    <span className="plus-icon"><Plus /></span>
                                                </div>
                                                <div className="dropdown-content">
                                                    <div className="tab-one" dangerouslySetInnerHTML={{ __html: productField.description }} />
                                                    {/* <table className="table table-bordered product-desc-table">
                                                        <tbody>
                                                            {product.brandName && (<tr><td><b>Brand Name</b></td><td>{product.brandName}</td></tr>)}
                                                            {product.collection && (<tr><td><b>Collection</b></td><td>{product.collection}</td></tr>)}
                                                            {product.rectification && (<tr><td><b>Rectification</b></td><td>{product.rectification}</td></tr>)}

                                                            {productField.color && (<tr><td><b>Color</b></td><td>{productField.color}</td></tr>)}
                                                            {productField.material && (<tr><td><b>Material</b></td><td>{productField.material}</td></tr>)}
                                                            {productField.capacity && (<tr><td><b>Capacity</b></td><td>{productField.capacity}</td></tr>)}
                                                            {productField.weight && (<tr><td><b>Weight</b></td><td>{productField.weight}</td></tr>)}
                                                            {productField.length && (<tr><td><b>Length</b></td><td>{productField.length}</td></tr>)}
                                                            {productField.width && (<tr><td><b>Width</b></td><td>{productField.width}</td></tr>)}
                                                            {productField.height && (<tr><td><b>Height</b></td><td>{productField.height}</td></tr>)}
                                                        </tbody>
                                                    </table> */}

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
            {products.length > 0 && (
                <section className="related-products section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-title text-center">
                                    <h2 className="title">Related Products</h2>
                                    <p className="sub-title">Add related products to weekly lineup</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Slider slides="product-carousel-5" arrows={true}>
                                    {products && products.map((product, index) => (
                                        <ProductCard product={product} key={`pro-${index}`} />
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <Script id="dropdown-toggle-script" strategy="afterInteractive">
                {`
                    // document.addEventListener("DOMContentLoaded", function () {
                        document.querySelectorAll(".dropdown-head").forEach((head) => {
                            head.addEventListener("click", function () {
                                const wrapper = this.closest(".dropdown-wrapper");
                            if (wrapper) {
                            wrapper.classList.toggle("open");
                            }
                        });
                        });
                    // });`}
            </Script>
        </>
    );
}
