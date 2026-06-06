const prisma = require("../prismaClient");

exports.getAllReviews = async (req, res) => {
  try {
    const { offset, limit, name, ...otherFilters } = req.query;
    const parsedOffset = parseInt(offset) || 0;
    const parsedLimit = parseInt(limit) || 0;

    const userFilters = name
      ? { name: { contains: name, mode: "insensitive" } }
      : undefined;

    const reviews = await prisma.Review.findMany({
      where: {
        user: userFilters,
      },
      skip: parsedOffset * parsedLimit,
      take: parsedLimit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        product: true,
      },
    });
    const total = await prisma.Review.count({
      where: {
        ...otherFilters,
        user: userFilters,
      },
    });
    return res.status(200).json({
      reviews,
      pageDetails: {
        total,
        offset,
        limit,
        currentPage: Math.floor(offset / limit) + 1,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getReviewByProductId = async (req, res) => {
  try {
    const { slug } = req.params;
    const { offset, limit } = req.query;
    const parsedOffset = Math.max(parseInt(offset, 10) || 0, 0);
    const parsedLimit = Math.min(parseInt(limit, 5) || 5, 100);

    const product = await prisma.Product.findUnique({ where: { slug } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const reviews = await prisma.review.findMany({
      where: {
        productId: product.id,
      },
      select: {
        id: true,
        userId: true,
        rating: true,
        review: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      skip: parsedOffset,
      take: parsedLimit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.Review.count({
      where: { productId: product.id },
    });

    return res.status(200).json({
      reviews,
      pageDetails: {
        total,
        offset:parsedOffset,
        limit:parsedLimit,
        currentPage: Math.floor(parsedOffset / parsedLimit) + 1,
        totalPages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createReview = async (req, res) => {
  try {
    const user = req.user;
    const { slug, review, rating } = req.body;
    const product = await prisma.Product.findUnique({ where: { slug } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviews = await prisma.Review.create({
      data: {
        userId: user.id,
        productId: product.id,
        review,
        rating: parseInt(rating),
      },
      include: {
        user: true,
        product: true,
      },
    });
    return res
      .status(201)
      .json({ message: "Successfully added review", reviews });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const existingReview = await prisma.review.findUnique({ where: { id } });
    const { review, rating, isValid, isVisible } = req.body;
    const updatedReview = await prisma.Review.update({
      where: {
        id,
      },
      data: {
        review: review || existingReview.review,
        rating: parseInt(rating) || existingReview.rating,
        isValid: isValid ?? existingReview.isValid,
        isVisible: isVisible ?? existingReview.isVisible,
      },
    });
    return res
      .status(200)
      .json({ message: "Successfully updated review", updatedReview });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.Review.delete({ where: { id } });
    return res.status(200).json({ message: "Successfully deleted review" });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  }
};
