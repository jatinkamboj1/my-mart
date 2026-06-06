const { uploadToLocal } = require("../utils/s3Helper");
const prisma = require("../prismaClient");
const { parseDecimal } = require("../utils/healper");

const toNumberOrNull = (val) => {
  if (val === "" || val === undefined || val === null) return null;
  const num = Number(val);
  return isNaN(num) ? null : num;
};

// Get product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { isDeleted: false, id, ...(!req.role === "ADMIN" && {isDisabled: false}) },
      include: {
        images: true,
        Category: {
          include: {
            subCategories: true,
          },
        },
        ProductVariant: { include: { variantAttributes: true, bulkPrices: true, } },
        Tag: true,
        bulkPrices: true,
      },
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get product by Slug
const getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { visibility: true, isDeleted: false, slug, ...(!req.role === "ADMIN" && {isDisabled: false}) },
      include: {
        images: {
          include: true,
          orderBy: {
            order: "asc",
          },
        },
        ProductVariant: {
          include: {
            variantAttributes: true,
            bulkPrices: true,
          },
        },
        Tag: true,
        bulkPrices: true,
      },
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    const averageRating = await prisma.review.aggregate({
      where: {
        productId: product.id,
      },
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    });

    const groupedVariants = new Map();

    product.ProductVariant.forEach((variant) => {
      variant.variantAttributes.forEach((attribute) => {
        if (!groupedVariants.has(attribute.name)) {
          groupedVariants.set(attribute.name, []);
        }
        groupedVariants
          .get(attribute.name)
          .push({ ...variant, value: attribute.value });
      });
    });

    const groupedVariantsObj = Object.fromEntries(groupedVariants);

    res
      .status(200)
      .json({ data: { ...product, groupedVariantsObj, averageRating } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Utility function to upload base64 images to S3
const processImages = async (images) => {
  const imageUrls = [];
  for (const image of images) {
    const { base64, type, order } = image;
    if (base64.includes("data:image")) {
      const url = await uploadToLocal(base64, "products");
      imageUrls.push({
        url,
        type: type || "general",
        order: order || null,
      });
    } else {
      const { base64, order } = image;
      // console.log("Process Images-> images: ", image);
      // console.log("Process Images-> base64: ", base64);
      imageUrls.push({
        url: base64,
        type: type || "general",
        order: order || null,
      });
    }
  }
  return imageUrls;
};

// Get all products
const getProducts = async (req, res) => {
  const {
    offset = 0,
    limit = 10,
    vendor,
    name,
    type,
    attributeSet,
    sku,
    categoryId,
    subCategoryId,
    minPrice,
    maxPrice,
    tags,
    visibility,
    statusDescription,
  } = req.query;

  try {
    const parsedOffset = parseInt(offset, 10) || 0;
    const parsedLimit = parseInt(limit, 10) || 10;
    const filters = {};

    if (vendor) filters.vendor = { contains: vendor, mode: "insensitive" };
    if (name) filters.name = { contains: name, mode: "insensitive" };
    if (type) filters.type = { contains: type, mode: "insensitive" };
    if (sku) filters.sku = { contains: sku, mode: "insensitive" };
    if (categoryId) filters.categoryId = categoryId;
    if (subCategoryId) filters.subCategoryId = subCategoryId;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.gte = parseDecimal(minPrice);
      if (maxPrice) filters.price.lte = parseDecimal(maxPrice);
    }
    if (tags) filters.tags = { hasSome: tags.split(",") };
    if (visibility !== undefined) filters.visibility = visibility === "true";

    const products = await prisma.product.findMany({
      where: { isDeleted: false, ...filters, ...(!req.role === "ADMIN" && {isDisabled: false}) },
      skip: parsedLimit * parsedOffset,
      take: parsedLimit,
      include: {
        images: true,
        Category: {
          include: {
            subCategories: true,
          },
        },
        ProductVariant: {
          include: {
            variantAttributes: true,
            bulkPrices: true,
          },
        },
        bulkPrices: true,
        Tag: true,
      },
    });
    // const products = await prisma.product.findMany({
    //   where: filters,
    //   skip: parsedOffset,
    //   take: parsedLimit,
    //   include: {
    //     images: true,
    //     Category: true,
    //     subCategory: true,
    //     ProductVariant: {
    //       include: { variantAttributes: true },
    //     },
    //   },
    // });

    const total = await prisma.product.count({ where: filters });

    res.status(200).json({
      products,
      pageDetails: {
        total,
        offset: parsedOffset,
        limit: parsedLimit,
        currentPage: Math.floor(parsedOffset / parsedLimit) + 1,
        totalPages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getProductsCard = async (req, res) => {
  try {
    // -----------------------------
    // 1. Extract & normalize query
    // -----------------------------
    const {
      currentPage = 0,
      limit = 10,
      name,
      vendor,
      type,
      slug,
      categoryId,
      minPrice,
      maxPrice,
      tags,
      visibility,
      visible_on,
      sortBy = "name",
      sortOrder = "asc",

      // NEW FILTERS
      brands,
      colors,
      materials,
      capacities,
    } = req.query;

    const parsedCurrentPage = Math.max(parseInt(currentPage, 10) || 0, 0);
    const parsedLimit = Math.min(parseInt(limit, 10) || 10, 100);

    // Helper → normalize arrays
    const toArray = (val) => {
      if (!val) return [];
      return Array.isArray(val) ? val : [val];
    };

    const brandArray = toArray(brands);
    const colorArray = toArray(colors);
    const materialArray = toArray(materials);
    const capacityArray = toArray(capacities);


    // -----------------------------
    // 2. Build filters
    // -----------------------------
    const filters = {
      visibility: visibility !== undefined ? visibility === "true" : true,
      isDeleted: false,
      ...(!req.role === "ADMIN" && {isDisabled: false})
    };

    if (vendor)
      filters.vendor = { contains: vendor, mode: "insensitive" };

    if (name)
      filters.name = { contains: name, mode: "insensitive" };

    if (type)
      filters.type = { contains: type, mode: "insensitive" };

    if (slug)
      filters.slug = { contains: slug, mode: "insensitive" };

    if (visible_on)
      filters.visible_on = {
        contains: visible_on,
        mode: "insensitive",
      };

    // PRICE FILTER
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.gte = parseFloat(minPrice);
      if (maxPrice) filters.price.lte = parseFloat(maxPrice);
    }

    // TAG FILTER
    if (tags) {
      filters.tags = { hasSome: tags.split(",") };
    }

    // -----------------------------
    // 3. NEW FILTERS (CORE)
    // -----------------------------
    if (brandArray.length > 0) {
      filters.brandName = { in: brandArray };
    }

    if (colorArray.length > 0) {
      filters.color = { in: colorArray };
    }

    if (materialArray.length > 0) {
      filters.material = { in: materialArray };
    }

    if (capacityArray.length > 0) {
      filters.capacity = { in: capacityArray };
    }

    // -----------------------------
    // 4. Category Filter
    // -----------------------------
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { slug: categoryId },
        select: {
          slug: true,
          subCategories: {
            where: { isDisabled: false, isDeleted: false },
            select: { slug: true },
          },
        },
      });

      if (category) {
        const allSlugs = [
          category.slug,
          ...category.subCategories.map((s) => s.slug),
        ];

        filters.Category = {
          some: { slug: { in: allSlugs } },
        };
      }
    }

    // -----------------------------
    // 5. Sorting
    // -----------------------------
    const orderBy =
      sortBy === "price"
        ? { price: sortOrder === "asc" ? "asc" : "desc" }
        : { name: sortOrder === "asc" ? "asc" : "desc" };

    // -----------------------------
    // 6. Run queries in parallel ⚡
    // -----------------------------
    const [products, total, priceAgg] = await Promise.all([
      prisma.product.findMany({
        where: filters,
        skip: parsedCurrentPage * parsedLimit,
        take: parsedLimit,
        orderBy,
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          discountedPrice: true,
          stock: true,
          tags: true,
          brandName: true,
          color: true,
          material: true,
          capacity: true,

          images: {
            select: { url: true },
            orderBy: { order: "asc" },
          },

          ProductVariant: {
            select: {
              id: true,
              variantName: true,
              price: true,
              stock: true,
              discountedPrice: true,
              bulkPrices: true,
              variantAttributes: {
                select: { name: true, value: true },
              },
            },
          },

          bulkPrices: true,
        },
      }),

      prisma.product.count({ where: filters }),

      prisma.product.aggregate({
        where: filters,
        _min: { price: true },
        _max: { price: true },
      }),
    ]);

    // -----------------------------
    // 7. Price Range (safe)
    // -----------------------------
    const filterPrice = {
      min: priceAgg?._min?.price
        ? Number(priceAgg._min.price)
        : 0,
      max: priceAgg?._max?.price
        ? Number(priceAgg._max.price)
        : 10000,
    };

    // -----------------------------
    // 8. Group Variants (optional)
    // -----------------------------
    const groupVariantsByAttribute = (variants) => {
      const grouped = {};

      for (const variant of variants) {
        variant.variantAttributes.forEach((attr) => {
          if (!grouped[attr.name]) {
            grouped[attr.name] = [];
          }
          grouped[attr.name].push({
            ...variant,
            attributeValue: attr.value,
          });
        });
      }

      return grouped;
    };

    products.forEach((product) => {
      product.ProductVariant = groupVariantsByAttribute(
        product.ProductVariant
      );
    });

    // -----------------------------
    // 9. Response
    // -----------------------------
    res.status(200).json({
      products,
      pageDetails: {
        total,
        filterPrice,
        currentPage: parsedCurrentPage,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (error) {
    console.error("getProductsCard error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getRelativeProducts = async (req, res) => {
  const {
    offset = 0,
    limit = 10,
    vendor,
    categoryId,
    minPrice,
    maxPrice,
    tags,
    visibility,
    visible_on,
  } = req.query;
  const { slug } = req.params;

  try {
    const parsedOffset = parseInt(offset, 10) || 0;
    const parsedLimit = parseInt(limit, 10) || 10;
    const filters = {...(!req.role === "ADMIN" && {isDisabled: false}), isDeleted: false};

    // if (vendor) filters.vendor = { contains: vendor, mode: "insensitive" };
    // if (name) filters.name = { contains: name, mode: "insensitive" };
    // if (type) filters.type = { contains: type, mode: "insensitive" };
    // if (slug) filters.slug = { contains: slug, mode: "insensitive" };
    if (visible_on)
      filters.visible_on = { contains: visible_on, mode: "insensitive" };
    if (categoryId) filters.categoryId = { some: { id: categoryId } };
    // if (subCategoryId) filters.subCategoryId = subCategoryId;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.gte = parseDecimal(minPrice);
      if (maxPrice) filters.price.lte = parseDecimal(maxPrice);
    }
    if (tags) filters.tags = { hasSome: tags.split(",") };

    const product = await prisma.product.findUnique({
      where: { visibility: true, isDeleted: false, slug },
      select: {
        brandName: true,
        Category: {
          include: {
            subCategories: true,
          },
        },
      },
    });

    if (product) {
      const categoryIds = [];
      product.Category.map((category) => {
        categoryIds.push(category.id);
        category.subCategories.map((sub) => {
          categoryIds.push(sub.id);
        });
      });
      filters.visibility = true;
      filters.Category = { some: { id: { in: categoryIds } } };
    }

    // Fetch products with related images, ProductVariants, and tags
    const products = await prisma.product.findMany({
      where: filters,
      skip: parsedLimit * parsedOffset,
      take: parsedLimit,
      select: {
        name: true,
        slug: true,
        price: true,
        stock: true,
        tags: true,
        brandName: true,
        images: {
          select: {
            url: true,
            type: true,
            description: true,
          },
        },
        ProductVariant: {
          select: {
            id: true,
            variantName: true,
            price: true,
            stock: true,
            bulkPrices: true,
            variantAttributes: {
              select: { name: true, value: true },
            },
          },
        },
        bulkPrices: true,
      },
    });

    // Group ProductVariants by variantAttributes.name
    products.forEach((product) => {
      product.ProductVariant = groupVariantsByAttribute(product.ProductVariant);
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Optimized grouping function
const groupVariantsByAttribute = (variants) => {
  const groupedVariants = {};

  variants.forEach((variant) => {
    variant.variantAttributes.forEach((attribute) => {
      // If the attribute name doesn't exist in the grouped map, create it
      if (!groupedVariants[attribute.name]) {
        groupedVariants[attribute.name] = [];
      }

      // Push the variant with the attribute value
      groupedVariants[attribute.name].push({
        variantId: variant.id,
        variantName: variant.variantName,
        price: variant.price,
        stock: variant.stock,
        value: attribute.value,
      });
    });
  });

  return groupedVariants;
};

// Get product's name by the categories
const getProductNames = async (req, res) => {
  const categories = req.query.categories.val;

  try {
    const products = await prisma.product.findMany({
      where: {
        visibility: true, isDeleted: false,
        ...(!req.role === "ADMIN" && {isDisabled: false}),
        Category: {
          some: {
            id: {
              in: [categories],
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        stock: true,
        images: true,
        discountedPrice: true,
        price: true,
        ProductVariant: true,
        bulkPrices: true,
      },
    });

    res.status(200).json({
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get a product variant
const getProductVariantById = async (req, res) => {
  try {
    const productIds = req.query.productIds;

    const variant = await prisma.productVariant.findMany({
      where: {
        productId: {
          in: productIds, // productIds should be an array of product IDs
        },
      },
      include: {
        bulkPrices: true,
        product: {
          select: {
            images: true,
          },
        },
      },
    });

    res.status(200).json(variant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
const getAllVariantTypes = async (req, res) => {
  const variants = await prisma.variantType.findMany();
  return res.status(200).json({ message: "Variant types retrieved", variants });
};

//home page api
const getFilteredProducts = async (req, res) => {
  try {
    let { visible_on } = req.query;

    const products = await prisma.Product.findMany({
      where: {
        visibility: true, isDeleted: false,
        ...(!req.role === "ADMIN" && {isDisabled: false}),
        visible_on: {
          contains: visible_on,
          mode: "insensitive",
        },
      },

      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error fetching filtered products:", error);
    return res.status(500).json({ message: error.message });
  }
};
const getFeaturedProducts = async (req, res) => {
  try {
    const { type } = req.query;
    const product = await prisma.Product.findMany({
      where: {
        ...(!req.role === "ADMIN" && {isDisabled: false}),
        Tag: {
          some: {
            name: {
              contains: type,
              mode: "insensitive",
            },
          },
        },
        visibility: true, isDeleted: false,
        visible_on: {
          contains: "HOMEPAGE",
          mode: "insensitive",
        },
      },
      include: { Tag: true, images: true },
      take: 10,
    });
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log("Error fetching featured  products:", error);
    return res.status(500).json({ message: error.message });
  }
};

const getProductsByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = {...(!req.role === "ADMIN" && {isDisabled: false}), isDeleted:false};
    if (id) {
      filter.id = id;
      
    }
    // if (slug) {
    //   filter.slug = slug
    // }
    const category = await prisma.Category.findUnique({
      where: filter,
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }
    const products = await prisma.product.findMany({
      where: {
        Category: {
          some: { ...filter },
        },
        ...(!req.role === "ADMIN" && {isDisabled: false}),
        isDeleted: false,
        visibility: true,
        visible_on: {
          contains: "CROSSPAGE",
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        vendor: true,
        price: true,
        visibility: true,
        visible_on: true,
        ProductVariant: {
          select: {
            variantName: true,
            price: true,
            stock: true,
            variantAttributes: {
              select: {
                name: true,
                value: true,
              },
            },
          },
        },
        images: {
          select: {
            id: true,
            url: true,
          },
        },
        Tag: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json({ success: true, products, category });
  } catch (error) {
    console.error("error: ", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Calculate discounted price from price and percentage
 * @param {number|string} price - Original price
 * @param {number|string|null|undefined} percentage - Discount percentage
 * @returns {number|null} Final price after discount (rounded to 2 decimals)
 */
function getDiscountedAmount(price, percentage) {
  const basePrice = Number(price);
  const discount = Number(percentage);

  if (!Number.isFinite(basePrice)) return null;
  if (!Number.isFinite(discount)) return basePrice;

  const finalAmount = basePrice - (basePrice * discount) / 100;
  return Number(finalAmount);
}


// Create a new product
const createProduct = async (req, res) => {
  const {
    vendor,
    name,
    metaTitle,
    metaDescription,
    slug,
    type,
    sku,
    price,
    discountedPrice,
    discountedPercentage,
    stock,
    description,
    shortDescription,
    brandName,

    color,
    length,
    width,
    height,
    weight,
    capacity,
    material,
    handlingType,

    bulkPrices,

    visibility,
    visible_on,

    productVariants,
    images,
    categories,
    tags,
  } = req.body;

  try {
    // Process base64 images
    let imageUrls = [];

    try {
      if (images) {
        const imageArray = Array.isArray(images) ? images : JSON.parse(images);
        imageUrls = await processImages(imageArray);
      }
    } catch (error) {
      console.error("Error parsing images:", error);
    }

    const variantData = Array.isArray(productVariants)
      ? productVariants.flat().map((variant) => {
        const price = Number(variant.price);
        const discount = Number(variant.discountedPercentage);
        const hasDiscount = Number.isFinite(discount) && discount > 0;

        const baseDiscountedPrice = hasDiscount
          ? getDiscountedAmount(price, discount)
          : null;

        const normalizedStock = Number.isFinite(Number(variant.stock))
          ? parseInt(variant.stock, 10)
          : 0;

        return {
          description: variant.description,
          shortDescription: variant.shortDescription,
          variantName: variant.variantName,
          sku: variant.sku,

          price,
          discountedPrice: baseDiscountedPrice,
          discountedPercentage: hasDiscount ? discount : null,

          stock: normalizedStock,

          color: variant.color,
          length: variant.length,
          width: variant.width,
          height: variant.height,
          weight: variant.weight,
          capacity: variant.capacity,
          material: variant.material,

          bulkPrices: {
            create: (variant.bulkPrices || []).map((bp) => {
              const bulkDiscount = Number(bp.percentage);

              return {
                minQuantity: Number(bp.minQuantity),
                maxQuantity: toNumberOrNull(bp.maxQuantity),

                // ✅ explicit stacked-discount logic
                price: hasDiscount
                  ? getDiscountedAmount(baseDiscountedPrice, bulkDiscount)
                  : getDiscountedAmount(price, bulkDiscount),

                percentage: bulkDiscount,
              };
            }),
          },

          variantAttributes: {
            create: (variant.attributes || []).map((attr) => ({
              name: attr.name,
              value: attr.value,
            })),
          },
        };
      })
      : null;


    // ---- numeric normalization ----
    const basePrice = Number(price);
    const discount = Number(discountedPercentage);
    const hasDiscount = Number.isFinite(discount) && discount > 0;

    const finalDiscountedPrice = hasDiscount
      ? getDiscountedAmount(basePrice, discount)
      : null;

    const normalizedStock = Number.isFinite(Number(stock))
      ? parseInt(stock, 10)
      : 0;

    const product = await prisma.product.create({
      data: {
        vendor,
        name,
        metaTitle,
        metaDescription,
        slug,
        type,
        sku,

        visibility,
        visible_on,

        price: basePrice,
        discountedPercentage: hasDiscount ? discount : null,
        discountedPrice: finalDiscountedPrice,
        stock: normalizedStock,

        description,
        shortDescription,
        brandName,

        color,
        length,
        width,
        height,
        weight,
        capacity,
        material,
        handlingType,

        Category: {
          connect: categories.map((id) => ({ id })),
        },

        Tag: {
          connect: tags.map((id) => ({ id })),
        },

        images: {
          create: imageUrls,
        },

        ProductVariant: {
          create: variantData,
        },

          bulkPrices: {
            create: (bulkPrices || []).map((bp) => {
              const bulkDiscount = Number(bp.percentage);

              return {
                minQuantity: Number(bp.minQuantity),
                maxQuantity: toNumberOrNull(bp.maxQuantity),
                price: hasDiscount
                  ? getDiscountedAmount(finalDiscountedPrice, bulkDiscount)
                  : getDiscountedAmount(basePrice, bulkDiscount),

                percentage: bulkDiscount,
              };
            }),
          },
      },
      include: {
        Tag: true,
        Category: true,
        images: true,
        ProductVariant: true,
        bulkPrices: true,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  const {
    vendor,
    name,
    metaTitle,
    metaDescription,
    slug,
    type,
    sku,

    price,
    discountedPercentage,
    stock,

    description,
    shortDescription,
    brandName,

    color,
    length,
    width,
    height,
    weight,
    capacity,
    material,
    handlingType,

    visibility,
    visible_on,

    categories = [],
    tags = [],
    images,
    productVariants = [],
    bulkPrices = [],
  } = req.body;

  try {
    /* -------------------- EXISTENCE CHECK -------------------- */
    const existingProduct = await prisma.product.findUnique({
      where: { id, isDeleted: false },
      include: {
        Category: true,
        Tag: true,
      },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    /* -------------------- NORMALIZE CATEGORY & TAG IDS -------------------- */
    const normalizedCategoryIds = categories
      .map((c) => (typeof c === "string" ? c : c?.id))
      .filter(Boolean);

    const normalizedTagIds = tags
      .map((t) => (typeof t === "string" ? t : t?.id))
      .filter(Boolean);

    /* -------------------- IMAGE PROCESSING -------------------- */
    let imageUrls = [];
    if (images) {
      const imageArray = Array.isArray(images) ? images : JSON.parse(images);
      imageUrls = await processImages(imageArray);
    }

    /* -------------------- PRODUCT PRICE NORMALIZATION -------------------- */
    const basePrice = Number(price);
    const discount = Number(discountedPercentage);
    const hasDiscount = Number.isFinite(discount) && discount > 0;

    const finalDiscountedPrice = hasDiscount
      ? getDiscountedAmount(basePrice, discount)
      : null;

    const normalizedStock = Number.isFinite(Number(stock))
      ? parseInt(stock, 10)
      : 0;

    /* -------------------- VARIANT UPSERT PREP -------------------- */
    const variantUpserts = productVariants.map((variant) => {
      const vPrice = Number(variant.price);
      const vDiscount = Number(variant.discountedPercentage);
      const vHasDiscount = Number.isFinite(vDiscount) && vDiscount > 0;

      const vDiscountedPrice = vHasDiscount
        ? getDiscountedAmount(vPrice, vDiscount)
        : null;

      const vStock = Number.isFinite(Number(variant.stock))
        ? parseInt(variant.stock, 10)
        : 0;

      return {
        where: { id: variant.id || "" },

        update: {
          description: variant.description,
          shortDescription: variant.shortDescription,
          variantName: variant.variantName,
          sku: variant.sku,

          price: vPrice,
          discountedPercentage: vHasDiscount ? vDiscount : null,
          discountedPrice: vDiscountedPrice,
          stock: vStock,

          color: variant.color,
          length: variant.length,
          width: variant.width,
          height: variant.height,
          weight: variant.weight,
          capacity: variant.capacity,
          material: variant.material,

          bulkPrices: {
            deleteMany: {},
            create: (variant.bulkPrices || []).map((bp) => {
              const bulkDiscount = Number(bp.percentage);
              return {
                minQuantity: Number(bp.minQuantity),
                maxQuantity: toNumberOrNull(bp.maxQuantity),
                percentage: bulkDiscount,
                price: vHasDiscount
                  ? getDiscountedAmount(vDiscountedPrice, bulkDiscount)
                  : getDiscountedAmount(vPrice, bulkDiscount),
              };
            }),
          },

          variantAttributes: {
            deleteMany: {},
            create: (variant.attributes || []).map((attr) => ({
              name: attr.name,
              value: attr.value,
            })),
          },
        },

        create: {
          description: variant.description,
          shortDescription: variant.shortDescription,
          variantName: variant.variantName,
          sku: variant.sku,

          price: vPrice,
          discountedPercentage: vHasDiscount ? vDiscount : null,
          discountedPrice: vDiscountedPrice,
          stock: vStock,

          color: variant.color,
          length: variant.length,
          width: variant.width,
          height: variant.height,
          weight: variant.weight,
          capacity: variant.capacity,
          material: variant.material,

          bulkPrices: {
            create: (variant.bulkPrices || []).map((bp) => {
              const bulkDiscount = Number(bp.percentage);
              return {
                minQuantity: Number(bp.minQuantity),
                maxQuantity: toNumberOrNull(bp.maxQuantity),
                percentage: bulkDiscount,
                price: vHasDiscount
                  ? getDiscountedAmount(vDiscountedPrice, bulkDiscount)
                  : getDiscountedAmount(vPrice, bulkDiscount),
              };
            }),
          },

          variantAttributes: {
            create: (variant.attributes || []).map((attr) => ({
              name: attr.name,
              value: attr.value,
            })),
          },
        },
      };
    });

    /* -------------------- TRANSACTION -------------------- */
    const product = await prisma.$transaction(async (tx) => {
      await tx.image.deleteMany({ where: { productId: id } });
      await tx.bulkPrice.deleteMany({
        where: { productId: id, productVariantId: null },
      });

      return tx.product.update({
        where: { id },
        data: {
          vendor,
          name,
          metaTitle,
          metaDescription,
          slug,
          type,
          sku,

          visibility,
          visible_on,

          price: basePrice,
          discountedPercentage: hasDiscount ? discount : null,
          discountedPrice: finalDiscountedPrice,
          stock: normalizedStock,

          description,
          shortDescription,
          brandName,

          color,
          length,
          width,
          height,
          weight,
          capacity,
          material,
          handlingType,

          Category: {
            disconnect: existingProduct.Category.map((c) => ({ id: c.id })),
            connect: normalizedCategoryIds.map((id) => ({ id })),
          },

          Tag: {
            disconnect: existingProduct.Tag.map((t) => ({ id: t.id })),
            connect: normalizedTagIds.map((id) => ({ id })),
          },

          images: {
            create: imageUrls,
          },

          bulkPrices: {
            create: bulkPrices.map((bp) => {
              const bulkDiscount = Number(bp.percentage);
              return {
                minQuantity: Number(bp.minQuantity),
                maxQuantity: toNumberOrNull(bp.maxQuantity),
                percentage: bulkDiscount,
                price: hasDiscount
                  ? getDiscountedAmount(finalDiscountedPrice, bulkDiscount)
                  : getDiscountedAmount(basePrice, bulkDiscount),
              };
            }),
          },

          ProductVariant: {
            upsert: variantUpserts,
          },
        },
        include: {
          images: true,
          Category: true,
          Tag: true,
          ProductVariant: {
            include: {
              bulkPrices: true,
              variantAttributes: true,
            },
          },
          bulkPrices: true,
        },
      });
    });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteAllProductVarients = async (id) => {
  try {
    const productVarients = await prisma.productVariant.deleteMany({
      where: {
        productId: id,
      },
    });
  } catch (error) {
    throw error;
  }
};

const deleteAllImages = async (id) => {
  try {
    const productImages = await prisma.Image.deleteMany({
      where: {
        productId: id,
      },
    });
  } catch (error) {
    throw error;
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.update({
      where: { id },
      data: {
        isDeleted: true
      }
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// Create a product variant
const createProductVariant = async (req, res) => {
  const { productId } = req.params;
  const {
    variantName,
    sku,
    price,
    quantity,
    salableQuantity,
    color,
    size,
    weight,
  } = req.body;

  try {
    const variant = await prisma.productVariant.create({
      data: {
        productId,
        variantName,
        sku,
        price: parseDecimal(price),
        stock: parseInt(quantity),
        salableQuantity: parseInt(salableQuantity),
        color,
        size,
        weight: parseDecimal(weight),
      },
    });

    res.status(201).json(variant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product variant
const updateProductVariant = async (req, res) => {
  const { variantId } = req.params;
  const {
    variantName,
    sku,
    price,
    quantity,
    salableQuantity,
    color,
    size,
    weight,
  } = req.body;

  try {
    const variant = await prisma.productVariant.update({
      where: { id: variantId },
      data: {
        variantName,
        sku,
        price: parseDecimal(price),
        stock: parseInt(quantity),
        salableQuantity: parseInt(salableQuantity),
        color,
        size,
        weight: parseDecimal(weight),
      },
    });

    res.status(200).json(variant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product variant
const deleteProductVariant = async (req, res) => {
  const { variantId } = req.params;

  try {
    await prisma.productVariant.delete({
      where: { id: variantId },
    });

    res.status(200).json({ message: "Product variant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createVariantType = async (req, res) => {
  const data = req.body;
  const variant = await prisma.variantType.create({
    data,
  });
  return res.status(201).json({ message: "Variant type created", variant });
};



// Updated toggleWishlist function
const toggleWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res
      .status(400)
      .json({ error: "userId and productId are required." });
  }

  try {
    // Check if the product already exists in the user's wishlist
    const existingWishlist = await prisma.wishlist.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    if (existingWishlist) {
      // If it exists, remove it from the wishlist
      await prisma.wishlist.delete({
        where: {
          userId_productId: { userId, productId },
        },
      });
      return res
        .status(200)
        .json({ message: "Product removed from the wishlist" });
    }

    // If it does not exist, add it to the wishlist
    const wishlist = await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    });
    return res.status(201).json({
      message: "Product added to the wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Error in toggleWishlist:", error);
    res.status(500).json({ error: error.message });
  }
};

// Updated getWishlist function
const getWishlist = async (req, res) => {
  const { userId } = req.params;
  const { offset, limit } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "userId is required." });
  }

  try {
    const parsedOffset = parseInt(offset, 10) || 0;
    const parsedLimit = parseInt(limit, 10) || 10;

    if (parsedOffset < 0 || parsedLimit <= 0) {
      return res
        .status(400)
        .json({ error: "Offset must be >= 0 and limit must be > 0." });
    }

    const data = await prisma.wishlist.findMany({
      skip: parsedOffset,
      take: parsedLimit,
      where: { userId },
      include: {
        product: true, // Optionally include product details
      },
    });

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error in getWishlist:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getFilteredProducts,
  getProductById,
  getProductNames,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductVariantById,
  createProductVariant,
  updateProductVariant,
  deleteProductVariant,
  toggleWishlist,
  getWishlist,
  createVariantType,
  getAllVariantTypes,
  getFeaturedProducts,
  getProductsByCategoryId,
  getProductsCard,
  getProductBySlug,
  getRelativeProducts,
};
