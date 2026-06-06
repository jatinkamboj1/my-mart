const prisma = require("../prismaClient");

exports.getAllTestimonials = async (req, res) => {
  try {
    const { offset, limit, name } = req.query;
    const parsedOffset = parseInt(offset) || 0;
    const parsedLimit = parseInt(limit) || 0;
    const userFilters = name
      ? { name: { contains: name, mode: "insensitive" } }
      : undefined;

    const testimonials = await prisma.Testimonial.findMany({
      where: {
        ...userFilters,
      },
      skip: parsedOffset * parsedLimit,
      take: parsedLimit,
      orderBy: {
        rating: "desc"
      },
    });
    const total = await prisma.Testimonial.count({
      where: {
        ...userFilters,
      },
    });
    return res.status(200).json({
      testimonials,
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

exports.createTestimonial = async (req, res) => {
  try {
    const { name, review, rating, link } = req.body;
    const testimonial = await prisma.Testimonial.create({
      data: {
        name,
        link,
        review,
        rating: parseInt(rating),
      },
    });
    return res
      .status(201)
      .json({ message: "Successfully added testimonial", testimonial });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const existingTestimonial = await prisma.Testimonial.findUnique({
      where: { id },
    });
    const { review, rating, name, link } = req.body;
    const updatedTestimonial = await prisma.Testimonial.update({
      where: {
        id,
      },
      data: {
        review: review || existingTestimonial.review,
        rating: parseInt(rating) || existingTestimonial.rating,
        name: name || existingTestimonial.name,
        link: link || existingTestimonial.link,
      },
    });
    return res.status(200).json({
      message: "Successfully updated testimonial",
      updatedTestimonial,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.Testimonial.delete({ where: { id } });
    return res
      .status(200)
      .json({ message: "Successfully deleted testimonial" });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error.` });
  }
};
