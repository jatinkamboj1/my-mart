import React from "react";
import Image from "next/image";
import Script from "next/script";
import Link from 'next/link';
import WishlistButton from "../WishlistButton/WishlistButton";
import { useSession } from "next-auth/react";
import { addItemToCart } from "@/app/api/cart";
import { toast } from "react-hot-toast";
import useCartStore from "@/store/cartStore";
import { convertS3UrlToLocalPath } from "@/utils/util";

const ProductCard = ({ product }) => {
    const { data: session, status } = useSession();
    const token = session?.user?.token;

    const { addToCart } = useCartStore();

    const handleAddToCart = async () => {
        if (status === "authenticated" && token) {
            try {
                let response;
                // Check if the product has variants and add the first variant to the cart
                if (product?.ProductVariant?.length > 0) {
                    response = await addToCart(token, product.id, product.ProductVariant[0].id, 1);
                } else {
                    // If no variant, add the product to the cart without variant
                    response = await addToCart(token, product.id, null, 1);
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
  return (
    <div key={`${product.name}-${product.id}`} className="product-item">
        <figure className="product-thumb">
            <Link href={`/product/${product.slug}`}>
                <img className="pri-img" src={product?.images?.length > 0 ? convertS3UrlToLocalPath(product.images[0].url) : `${process.env.PLACEHOLDER_IMAGE}`} alt="product" />
                <img className="sec-img" src={product?.images?.length > 1 ? convertS3UrlToLocalPath(product.images[1].url) : product?.images?.length > 0 ? convertS3UrlToLocalPath(product.images[0].url) : `${process.env.PLACEHOLDER_IMAGE}`} alt="product" />
            </Link>
            {product.tags && product.tags.length > 0 && (<div className="product-badge">
                {product.tags.map((tag,i)=>(
                    <div key={`tags-${i}`} className="product-label new">
                        <span>{tag.name}</span>
                    </div>
                ))}
            </div>)}
            <div className="button-group">
                <WishlistButton id={product.id} token={token} />
            </div>
        </figure>
        <Link className="product-caption text-center" href={`/product/${product.slug}`}>
            <div className="product-identity">
                <p className="manufacturer-name">
                    <span style={{color:"#555555"}}>{product?.brandName ?? '.'}</span>
                </p>
            </div>
            <h6 className="product-name">
                <a href={`/product/${product.slug}`}>{product.name}</a>
            </h6>
            <div className="price-box">
                <span className="price-regular">₹{product.discountedPrice || product.price} <span className="price-regular-vat">(Ex. VAT)</span></span>
                {product.discountedPrice && (
                    <span className="price-old">
                        <del>₹{product.price} <span className="price-old-vat">(Ex. VAT)</span></del>
                    </span>
                )}
            </div>
        </Link>
        <div className="">
            <button onClick={handleAddToCart} className="btn btn-cart">Add to Basket</button>
        </div>
    </div>
  );
};

export default ProductCard;
