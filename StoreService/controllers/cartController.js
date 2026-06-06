const prisma = require("../prismaClient");

/* =====================================================
   BULK PRICE RESOLVER
===================================================== */
const resolveBulkPrice = (bulkPrices = [], qty) => {
    if (!Array.isArray(bulkPrices)) return null;

    return (
        bulkPrices.find((bp) => {
            if (bp.maxQuantity === null) return qty >= bp.minQuantity;
            return qty >= bp.minQuantity && qty <= bp.maxQuantity;
        }) || null
    );
};

/* =====================================================
   GET BASE PRICE (IMPORTANT FIX)
===================================================== */
const resolveBasePrice = (product, variant) => {
    if (variant) {
        return {
            price: variant.price,
            discountedPrice: variant.discountedPrice ?? null,
        };
    }

    return {
        price: product.price,
        discountedPrice: product.discountedPrice ?? null,
    };
};

/* =====================================================
   GET ALL CART PRODUCTS
===================================================== */
const getAllCartProducts = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await prisma.cart.findUnique({
            where: { userId },
            select: {
                id: true,
                products: {
                    orderBy: { id: "asc" },
                    select: {
                        id: true,
                        quantity: true,
                        unitPrice: true,
                        discountedPrice: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                                brandName: true,
                                stock: true,
                                images: { select: { url: true } },
                            },
                        },
                        productVariant: {
                            select: {
                                id: true,
                                variantName: true,
                                stock: true,
                                variantAttributes: {
                                    select: { name: true, value: true },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!cart) return res.status(200).json([]);
        return res.status(200).json(cart.products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/* =====================================================
   ADD TO CART (FIXED)
===================================================== */
const addToCart = async (req, res) => {
    const { productId, productVariantId, quantity } = req.body;
    const userId = req.user.id;

    try {
        if (!productId || quantity <= 0)
            return res.status(400).json({ error: "Invalid request data" });

        let cart = await prisma.cart.findFirst({ where: { userId } });
        if (!cart) cart = await prisma.cart.create({ data: { userId } });

        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                bulkPrices: true,
                ProductVariant: { include: { bulkPrices: true } },
            },
        });

        if (!product)
            return res.status(404).json({ error: "Product not found" });

        const variant = productVariantId
            ? product.ProductVariant.find((v) => v.id === productVariantId)
            : null;

        const base = resolveBasePrice(product, variant);

        let unitPrice = base.price;
        let discountedPrice = base.discountedPrice;

        const slab =
            variant?.bulkPrices?.length
                ? resolveBulkPrice(variant.bulkPrices, quantity)
                : resolveBulkPrice(product.bulkPrices, quantity);

        if (slab) {
            unitPrice = slab.price;
            discountedPrice = slab.discountedPrice ?? null;
        }

        const existing = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId,
                productVariantId: productVariantId || null,
            },
        });

        if (existing) {
            const newQty = existing.quantity + quantity;

            const baseUpdated = resolveBasePrice(product, variant);

            let finalUnitPrice = baseUpdated.price;
            let finalDiscountedPrice = baseUpdated.discountedPrice;

            const updatedSlab =
                variant?.bulkPrices?.length
                    ? resolveBulkPrice(variant.bulkPrices, newQty)
                    : resolveBulkPrice(product.bulkPrices, newQty);

            if (updatedSlab) {
                finalUnitPrice = updatedSlab.price;
                finalDiscountedPrice =
                    updatedSlab.discountedPrice ?? null;
            }

            await prisma.cartItem.update({
                where: { id: existing.id },
                data: {
                    quantity: newQty,
                    unitPrice: finalUnitPrice,
                    discountedPrice: finalDiscountedPrice,
                },
            });

            return res
                .status(200)
                .json({ message: "Product quantity updated" });
        }

        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                productVariantId: productVariantId || null,
                quantity,
                unitPrice,
                discountedPrice,
            },
        });

        return res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
        console.error("AddToCart Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/* =====================================================
   UPDATE CART ITEM QUANTITY (FIXED)
===================================================== */
const updateCartItemQuantity = async (req, res) => {
    const { id, action } = req.body;
    const userId = req.user.id;

    try {
        const cartItem = await prisma.cartItem.findUnique({
            where: { id },
            include: {
                cart: true,
                product: { include: { bulkPrices: true } },
                productVariant: { include: { bulkPrices: true } },
            },
        });

        if (!cartItem || cartItem.cart.userId !== userId)
            return res.status(403).json({ error: "Unauthorized" });

        let newQty =
            action === "increment"
                ? cartItem.quantity + 1
                : cartItem.quantity - 1;

        if (newQty < 1)
            return res
                .status(400)
                .json({ error: "Quantity cannot be less than 1" });

        const base = resolveBasePrice(
            cartItem.product,
            cartItem.productVariant
        );

        let unitPrice = base.price;
        let discountedPrice = base.discountedPrice;

        const slab =
            cartItem.productVariant?.bulkPrices?.length
                ? resolveBulkPrice(
                      cartItem.productVariant.bulkPrices,
                      newQty
                  )
                : resolveBulkPrice(cartItem.product.bulkPrices, newQty);

        if (slab) {
            unitPrice = slab.price;
            discountedPrice = slab.discountedPrice ?? null;
        }

        await prisma.cartItem.update({
            where: { id },
            data: {
                quantity: newQty,
                unitPrice,
                discountedPrice,
            },
        });

        return res.status(200).json({
            message: `Quantity ${action}ed successfully`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/* =====================================================
   DELETE / COUNT / GET SINGLE
===================================================== */
const deleteAllCartProducts = async (req, res) => {
    const userId = req.user.id;
    await prisma.cart.update({
        where: { userId },
        data: { products: { deleteMany: {} } },
    });
    res.status(200).json({ message: "All cart products deleted successfully" });
};

const getAllCartProductsCount = async (req, res) => {
    const cart = await prisma.cart.findUnique({
        where: { userId: req.user.id },
        select: { products: { select: { id: true } } },
    });
    res.status(200).json({ count: cart?.products.length || 0 });
};

const getCartProduct = async (req, res) => {
    const cartItem = await prisma.cartItem.findFirst({
        where: { id: req.params.id, cart: { userId: req.user.id } },
    });
    if (!cartItem)
        return res.status(404).json({ error: "Product not found in cart" });
    res.status(200).json(cartItem);
};

const deleteCartProduct = async (req, res) => {
    await prisma.cartItem.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: "Product deleted from cart successfully" });
};

module.exports = {
    updateCartItemQuantity,
    addToCart,
    getAllCartProducts,
    deleteAllCartProducts,
    getAllCartProductsCount,
    getCartProduct,
    deleteCartProduct,
};
