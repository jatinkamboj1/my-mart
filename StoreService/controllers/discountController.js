const prisma = require("../prismaClient");
const { parseDecimal } = require("../utils/healper");

const buildFilterQuery = (filters) => {
  const query = {};
  for (const key in filters) {
    if (filters[key]) {
      query[key] = { contains: filters[key], mode: "insensitive" };
    }
  }
  return query;
};

const getAllDiscountCoupons = async (req, res) => {
  const { offset = 0, limit = 10, ...filters } = req.query;
  try {
    const parsedOffset = Math.max(parseInt(offset, 10) || 0);
    const parsedLimit = Math.min(parseInt(limit, 10) || 10);

    const where = buildFilterQuery(filters);

    const discounts = await prisma.discount.findMany({
      where,
      skip: parsedLimit * parsedOffset,
      take: parsedLimit,
      include: {
        user: true,
      },
    });
    const total = await prisma.discount.count({ where });

    return res.status(200).json({
      discounts,
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
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const createDiscountCoupon = async (req, res) => {
  try {
    delete req.body.status;
    const data = req.body;
    const amount = parseDecimal(req.body.amount);
    const usageLimit = req.body.usageLimit ? parseInt(req.body.usageLimit) : null;
    const discount = await prisma.discount.create({
      data: {
        ...data,
        amount,
        usageLimit,
      },
    });
    return res
      .status(201)
      .json({ message: "Successfully created a coupon", discount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getDiscountCouponById = async (req, res) => {
  const id = req.params.id;
  try {
    const discount = await prisma.discount.findUnique({ where: { id } });
    if (!discount)
      return res.status(404).json({ message: "Discount coupon not found" });
    return res.status(200).json(discount);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const updateDiscountCoupon = async (req, res) => {
  const id = req.params.id;
  try {
    const discount = await prisma.discount.findUnique({ where: { id } });
    if (!discount)
      return res.status(404).json({ message: "Discount coupon not found" });
    const {
      code,
      type,
      amount,
      usageLimit,
      cartAmount,
      status,
      endDate,
      startDate,
    } = req.body;

    const convertToISO = (dateStr) => {
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day).toISOString(); // Convert to ISO format
    };

    const formattedStartDate = startDate ? convertToISO(startDate) : null; // "26/03/2025"
    const formattedEndDate = endDate ? convertToISO(endDate) : null;   // "26/04/2025"

    const newStatus = status === "true";
    const updatedDiscount = await prisma.discount.update({
      where: { id },
      data: {
        status: newStatus ?? discount.status,
        code: code || discount.code,
        type: type || discount.type,
        amount: parseDecimal(amount) || discount.amount,
        usageLimit: parseInt(usageLimit) || discount.usageLimit,
        cartAmount: cartAmount || discount.cartAmount,
        endDate: formattedEndDate || discount.endDate,
        startDate: formattedStartDate || discount.startDate,
      },
    });
    return res.status(200).json({
      message: "Successfully updated a discount coupon",
      updatedDiscount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const deleteDiscountCoupon = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.discount.delete({ where: { id } });
    return res
      .status(200)
      .json({ message: "Successfully deleted discount coupon" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const applyDiscountCoupon = async (req, res) => {
  try {
    const { amount, code } = req.query;

    const discount = await prisma.discount.findFirst({
      where: {
        code: {
          equals: code,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        code: true,
        amount: true,
        type: true,
        startDate: true,
        endDate: true,
        cartAmount: true,
      }
    });

    // Coupon must exist
    if (!discount) {
      return res.status(404).json({ message: "Invalid Coupon Code" });
    }

    const now = new Date();

    // Check start date (if defined)
    if (discount.startDate && now < discount.startDate) {
      return res.status(200).json({
        message: "This coupon is currently not available",
      });
    }

    // Check end date (if defined)
    if (discount.endDate && now > discount.endDate) {
      return res.status(200).json({
        message: "This coupon is currently not available",
      });
    }

    const cartAmount = Number(amount);
    const orderTotal = Number(discount.amount);
    const minAmount = Number(discount.cartAmount.min);
    const maxAmount = Number(discount.cartAmount.max);
    let discountAmount = 0;

    // Validate cart amount
    if (Number.isNaN(cartAmount)) {
      return res.status(400).json({ message: "Invalid cart amount" });
    }

    if (cartAmount < minAmount) {
      return res.status(200).json({
        message: `Minimum Cart Amount Should be ${minAmount}`,
      });
    }

    if (cartAmount > maxAmount) {
      return res.status(200).json({
        message: `Maximum Cart Amount Should be ${maxAmount}`,
      });
    }

    if (discount.type === "PERCENTAGE") {
      discountAmount = (cartAmount * orderTotal) / 100;
    } else if (discount.type === "FIXED") {
      discountAmount = orderTotal;
    }

    return res.status(200).json({
      message: "Coupon applied successfully",
      discount:{ id: discount.id, code: discount.code, amount: discountAmount.toFixed(2)},
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = {
  getAllDiscountCoupons,
  createDiscountCoupon,
  getDiscountCouponById,
  updateDiscountCoupon,
  deleteDiscountCoupon,
  applyDiscountCoupon,
};
