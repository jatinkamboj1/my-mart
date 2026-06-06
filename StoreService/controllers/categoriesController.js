const { uploadToLocal } = require("../utils/s3Helper");
const prisma = require("../prismaClient");

// Helper to handle filtering
const buildFilterQuery = (filters) => {
  const query = {};
  for (const key in filters) {
    if (filters[key]) {
      query[key] = { contains: filters[key], mode: "insensitive" };
    }
  }
  return query;
};

// Helper to validate UUID
const isValidUUID = (id) =>
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    id
  );

// Get all categories with filtering
const getCategories = async (req, res) => {
  const { offset = 0, limit = 10, images, isHighlighted, ...filters } = req.query;

  try {
    const parsedOffset = Math.max(parseInt(offset, 10) || 0, 0);
    const parsedLimit = Math.min(parseInt(limit, 10) || 10, 100);

    const where = {
      isDeleted: false,
      ...buildFilterQuery(filters),
      ...(images === "true" && { images: { some: {} } }),
      ...(isHighlighted === "true" && { isHighlighted: true }),
      ...(!req.role === "ADMIN" && {isDisabled: false})
    };

    const categories = await prisma.category.findMany({
      where,
      skip: parsedOffset,
      take: parsedLimit,
      include: {
        _count: {
          select: {
            products: true, // gives count of products
          },
        },
        images: true,
        subCategories: {
          include: {
            images: true,
            _count: {
              select: {
                products: true, // count for subcategories too
              },
            },
          },
        },
        parent: {
          select: {
            categoryName: true,
          },
        },
      },
  orderBy: [
    {
      isDisabled: 'asc',
    },
    {
      createdAt: 'desc',
    },
  ],
    });

    const total = await prisma.category.count({ where });

    res.status(200).json({
      categories,
      pageDetails: {
        total,
        offset: parsedOffset,
        limit: parsedLimit,
        currentPage: Math.floor(parsedOffset / parsedLimit) + 1,
        totalPages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (error) {
    console.error(`Error in getCategories: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getCategoriesName = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: {isDisabled: false, isDeleted: false},
      select: {
        id: true,
        categoryName: true,
        slug: true,
      },
    });

    const total = await prisma.category.count();

    res.status(200).json({
      categories,
      total,
    });
  } catch (error) {
    console.error(`Error in getCategories: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  if (!isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid category ID format" });
  }

  try {
    const category = await prisma.category.findUnique({
      where: { isDeleted: false, id },
      include: {
        products: true,
        images: true,
        subCategories: { include: { images: true, products: true } },
        Tag: true,
      },
    });
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    console.error(`Error in getCategoryById: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getSubCategoriesName = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isDeleted: false,
        subCategories: {
          none: {},
        },
      },
      select: {
        id: true,
        categoryName: true,
        slug: true,
        subCategories: true,
      },
    });
    const total = await prisma.category.count();

    res.status(200).json({
      categories,
      total,
    });
  } catch (error) {
    console.error(`Error in getsubCategories: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// Recursive function to fetch nested subcategories
const fetchSubcategories = async (parentId) => {
  try {
    const subCategories = await prisma.category.findMany({
      where: { isDeleted: false, parentId: parentId },
      include: {
        subCategories: true,
      },
    });
  
    // Fetch subcategories recursively for each subcategory
    for (const sub of subCategories) {
      sub.subCategories = await fetchSubcategories(sub.id);
    }
    return subCategories;
  } catch (error) {
    throw error;
  }
};

//home page api
const getNavCategory = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isDisabled: false,
        isDeleted: false,
        parentId: null,
      },
      orderBy: { order: "asc" },
      include: {
        images: {
          where: { type: "menu" }, // 👈 IMPORTANT
          select: { url: true },
        },
        subCategories: {
          where: { isDisabled: false, isDeleted: false },
          orderBy: { order: "asc" },
          include: {
            images: {
              where: { type: "menu" },
              select: { url: true },
            },
            subCategories: {
              where: { isDisabled: false, isDeleted: false },
              orderBy: { order: "asc" },
              select: {
                id: true,
                categoryName: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryBanner = async (req, res) => {
  try {
    const { limit = 10, visible_on, all = "false" } = req.query; // Default limit is 10 if not provided

    const filter = { isDisabled: false };
    if (visible_on) {
      filter["visible_on"] = visible_on;
    }
    const pagination =
      all === "true"
        ? {}
        : {
            take: parseInt(limit) || 10,
          };

    const categories = await prisma.category.findMany({
      where: {
        isDisabled: false, isDeleted: false,
        ...filter,
      },
      select: {
        categoryName: true, // Category name
        slug: true, // Category link
        images: { select: { url: true } }, // Fetch image URLs
      },
      orderBy: { createdAt: "desc" },
      ...pagination,
    });

    return res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching homepage categories:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Get category by Slug
const getCategoryBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    // 1. Fetch category
    const category = await prisma.category.findFirst({
      where: {
        slug,
        isDisabled: false,
        isDeleted: false,
      },
      select: {
        categoryName: true,
        metaTitle: true,
        description: true,
        metaDescription: true,
        slug: true,
        images: { select: { url: true } },
        subCategories: {
          where: { isDisabled: false, isDeleted: false },
          orderBy: { order: "asc" },
          select: {
            slug: true,
            categoryName: true,
            Tag: { select: { name: true } },
          },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // 2. Group subcategories
    const groupedSubCategories = {};
    for (const sub of category.subCategories) {
      for (const tag of sub.Tag) {
        if (!groupedSubCategories[tag.name]) {
          groupedSubCategories[tag.name] = [];
        }
        groupedSubCategories[tag.name].push({
          categoryName: sub.categoryName,
          slug: sub.slug,
        });
      }
    }

    // 3. Collect all slugs
    const allSlugs = [
      category.slug,
      ...category.subCategories.map((s) => s.slug),
    ];

    // 4. Fetch products (ONLY required fields)
    const products = await prisma.product.findMany({
      where: {
        Category: { some: { slug: { in: allSlugs } } },
        isDeleted: false,
        visibility: true,
      },
      select: {
        price: true,
        brandName: true,
        color: true,
        material: true,
        capacity: true,
      },
    });

    // 5. Compute price range safely
    const prices = products.map(p => Number(p.price) || 0);

    const filterPrice = {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 10000,
    };

    // 6. Extract unique filters (FAST)
    const unique = (arr) =>
      [...new Set(arr.filter(Boolean))];

    const filters = {
      brands: unique(products.map(p => p.brandName)),
      colors: unique(products.map(p => p.color)),
      materials: unique(products.map(p => p.material)),
      capacities: unique(products.map(p => p.capacity)),
    };

    // 7. Fetch category tags
    const tags = await prisma.tag.findMany({
      where: { isCategory: true },
      select: {
        name: true,
        isMetal: true,
        isPolish: true,
        isStone: true,
        isOccasion: true,
        isCollection: true,
      },
    });

    const groupedTags = {
      isMetal: tags.filter(t => t.isMetal),
      isPolish: tags.filter(t => t.isPolish),
      isStone: tags.filter(t => t.isStone),
      isOccasion: tags.filter(t => t.isOccasion),
      isCollection: tags.filter(t => t.isCollection),
    };

    // 8. Final response
    res.status(200).json({
      category: {
        categoryName: category.categoryName,
        slug: category.slug,
        images: category.images,
        metaTitle: category.metaTitle,
        description: category.description,
        metaDescription: category.metaDescription,
        subCategories: category.subCategories,
        groupedSubCategories,
        filterPrice,
        filters, // ✅ NEW
      },
      groupedTags,
    });

  } catch (error) {
    console.error("Error in getCategoryBySlug:", error);
    res.status(500).json({ error: error.message });
  }
};


// Create a new category
const createCategory = async (req, res) => {
  try {
    const {
      categoryName,
      slug,
      subCategories = [],
      tags = [],
      images = [],
      visible_on,
      menuType,
      order,
      isHighlighted,
      ...rest
    } = req.body;

    // ❗ VALIDATIONS
    if (!categoryName || categoryName.trim() === "") {
      return res.status(400).json({ error: "Category name is required" });
    }

    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    // Upload images
    const imageUrls = await Promise.all(
      images.map(async (img) => {
        const url = await uploadToLocal(img.base64, "categories");
        return {
          url,
          order: img.order || null,
          type: img.type || null,
        };
      })
    );

    const category = await prisma.category.create({
      data: {
        categoryName,
        slug,
        visible_on,
        menuType,
        order: order ? parseInt(order) : 0,
        isHighlighted: isHighlighted || false,
        ...rest,

        Tag: {
          connect: tags.map((id) => ({ id })),
        },

        images: {
          create: imageUrls,
        },

        subCategories: {
          connect: subCategories.map((id) => ({ id })),
        },
      },
      include: { images: true, subCategories: true },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  const { id } = req.params;

  if (!isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid category ID" });
  }

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { id },
      include: { images: true, subCategories: true, Tag: true },
    });

    if (!existingCategory || existingCategory.isDeleted) {
      return res.status(404).json({ error: "Category not found" });
    }

    const {
      categoryName,
      subCategories = [],
      tags = [],
      images = [],
      visible_on,
      menuType,
      order,
      isHighlighted,
      ...rest
    } = req.body;

    // ❗ VALIDATION
    if (!categoryName || categoryName.trim() === "") {
      return res.status(400).json({ error: "Category name cannot be empty" });
    }

    // ❗ SLUG PROTECTION
    if (req.body.slug && req.body.slug !== existingCategory.slug) {
      return res.status(400).json({ error: "Slug cannot be updated" });
    }

    // ❗ DELETE OLD IMAGES
    await prisma.image.deleteMany({
      where: {
        Category: {
          some: { id },
        },
      },
    });

    // Upload / retain images
    const imageUrls = await Promise.all(
      images.map(async (img) => {
        if (img.base64) {
          const url = await uploadToLocal(img.base64, "categories");
          return {
            url,
            order: img.order || null,
            type: img.type || null,
          };
        }
        return {
          url: img.url,
          order: img.order || null,
          type: img.type || null,
        };
      })
    );

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        categoryName,
        visible_on,
        menuType,
        order: order ? parseInt(order) : existingCategory.order,
        isHighlighted: isHighlighted || false,
        ...rest,

        // TAGS
        Tag: {
          set: tags.map((id) => ({ id })),
        },

        // IMAGES
        images: {
          create: imageUrls,
        },

        // SUBCATEGORIES
        subCategories: {
          set: subCategories.map((id) => ({ id })),
        },
      },
      include: { images: true, subCategories: true },
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteImages = async (id) => {
  try {
    const deleteAllImages = await prisma.image.deleteMany({
      where: {
        Category: {
          some: { id: id }, // ✅ Filters images linked to the given category
        },
      },
    });
  } catch (error) {
    console.error("Error deleting images:", error);
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid category ID format" });
  }

  try {
    // await prisma.category.update(
    //   {
    //     where: { id },
    //   },
    //   {data:{ isDisabled: true }}
    // );

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (category.isDisabled === true) {
      await prisma.category.delete({ where: { id } });
      return res.status(200).json({ message: "Category deleted successfully" });
    }

    await prisma.category.update({
      where: { id }, // Ensure id is a valid unique identifier
      data: { isDisabled: true },
    });

    return res.status(200).json({ message: "Category disabled successfully" });
  } catch (error) {
    console.error(`Error in deleteCategory: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCategoriesName,
  getCategories,
  getCategoryById,
  getSubCategoriesName,
  getNavCategory,
  getCategoryBanner,
  getCategoryBySlug,

  createCategory,
  updateCategory,
  deleteCategory,
};
