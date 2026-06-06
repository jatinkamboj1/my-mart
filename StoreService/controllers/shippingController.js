const prisma = require("../prismaClient");
const { findApplicableShippingFee } = require("../services/shipment/shipment.service");
const { parseDecimal } = require("../utils/healper");


/* =============================
   DELIVERY TYPE CONTROLLERS
============================= */

// Create Delivery Type
const createDeliveryType = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    const existing = await prisma.deliveryType.findFirst({ where: { name } });
    if (existing) {
      return res.status(400).json({ message: "Delivery type already exists" });
    }

    const deliveryType = await prisma.deliveryType.create({
      data: { name, description, isActive },
    });

    return res
      .status(201)
      .json({ message: "Delivery type created successfully", deliveryType });
  } catch (error) {
    console.error("Error creating delivery type:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Delivery Types (with pagination + filters)
const getDeliveryTypes = async (req, res) => {
  try {
    const { offset = 0, limit = 10, name, isActive } = req.query;

    const parsedOffset = parseInt(offset, 10) || 0;
    const parsedLimit = parseInt(limit, 10) || 10;

    const filters = {};
    if (name)
      filters.name = { contains: name, mode: "insensitive" };
    if (isActive !== undefined)
      filters.isActive = isActive === "true";

    const types = await prisma.deliveryType.findMany({
      where: filters,
      skip: parsedOffset,
      take: parsedLimit,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.deliveryType.count({ where: filters });

    return res.status(200).json({
      types,
      pageDetails: {
        total,
        offset: parsedOffset,
        limit: parsedLimit,
        currentPage: Math.floor(parsedOffset / parsedLimit) + 1,
        totalPages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (error) {
    console.error("Error fetching delivery types:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//  GET SINGLE DELIVERY TYPE
const getDeliveryTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const type = await prisma.deliveryType.findUnique({
      where: { id },
    });

    if (!type)
      return res.status(404).json({ message: "Delivery type not found" });

    return res.status(200).json(type);
  } catch (error) {
    console.error("Error fetching delivery type:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Delivery Type
const updateDeliveryType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    const type = await prisma.deliveryType.findUnique({ where: { id } });
    if (!type)
      return res.status(404).json({ message: "Delivery type not found" });

    const updatedType = await prisma.deliveryType.update({
      where: { id },
      data: {
        name: name || type.name,
        description: description || type.description,
        isActive: isActive ?? type.isActive,
      },
    });

    return res
      .status(200)
      .json({ message: "Delivery type updated successfully", updatedType });
  } catch (error) {
    console.error("Error updating delivery type:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Delivery Type
const deleteDeliveryType = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.deliveryType.delete({ where: { id } });
    return res
      .status(200)
      .json({ message: "Delivery type deleted successfully" });
  } catch (error) {
    console.error("Error deleting delivery type:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/* =============================
   SHIPPING FEE CONTROLLERS
============================= */

// Create Shipping Fee
const createShippingFee = async (req, res) => {
  try {
    const {
      zone,
      deliveryTypeId,
      feeAmount,
      minOrderValue,
      maxOrderValue,
      isActive,
    } = req.body;

    const fee = await prisma.shippingFee.create({
      data: {
        zone,
        deliveryTypeId,
        feeAmount: parseDecimal(feeAmount),
        minOrderValue: parseDecimal(minOrderValue),
        maxOrderValue: parseDecimal(maxOrderValue),
        isActive,
      },
    });

    return res
      .status(201)
      .json({ message: "Shipping fee created successfully", fee });
  } catch (error) {
    console.error("Error creating shipping fee:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Shipping Fees (with pagination + filters)
const getShippingFees = async (req, res) => {
  try {
    const {
      offset = 0,
      limit = 10,
      zone,
      deliveryTypeId,
      isActive,
      minFee,
      maxFee,
    } = req.query;

    const parsedOffset = parseInt(offset, 10) || 0;
    const parsedLimit = parseInt(limit, 10) || 10;

    const filters = {};
    if (zone) filters.zone = { contains: zone, mode: "insensitive" };
    if (deliveryTypeId) filters.deliveryTypeId = deliveryTypeId;
    if (isActive !== undefined) filters.isActive = isActive === "true";
    if (minFee || maxFee) {
      filters.feeAmount = {};
      if (minFee) filters.feeAmount.gte = parseDecimal(minFee);
      if (maxFee) filters.feeAmount.lte = parseDecimal(maxFee);
    }

    const fees = await prisma.shippingFee.findMany({
      where: filters,
      include: { deliveryType: true },
      skip: parsedOffset,
      take: parsedLimit,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.shippingFee.count({ where: filters });

    return res.status(200).json({
      fees,
      pageDetails: {
        total,
        offset: parsedOffset,
        limit: parsedLimit,
        currentPage: Math.floor(parsedOffset / parsedLimit) + 1,
        totalPages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (error) {
    console.error("Error fetching shipping fees:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//  GET SINGLE SHIPPING FEE
const getShippingFeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const fee = await prisma.shippingFee.findUnique({
      where: { id },
      include: { deliveryType: true },
    });

    if (!fee)
      return res.status(404).json({ message: "Shipping fee not found" });

    return res.status(200).json(fee);
  } catch (error) {
    console.error("Error fetching shipping fee:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Shipping Fee
const updateShippingFee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      zone,
      deliveryTypeId,
      feeAmount,
      minOrderValue,
      maxOrderValue,
      isActive,
    } = req.body;

    const fee = await prisma.shippingFee.findUnique({ where: { id } });
    if (!fee)
      return res.status(404).json({ message: "Shipping fee not found" });

    const updatedFee = await prisma.shippingFee.update({
      where: { id },
      data: {
        zone: zone || fee.zone,
        deliveryTypeId: deliveryTypeId || fee.deliveryTypeId,
        feeAmount: feeAmount ? parseDecimal(feeAmount) : fee.feeAmount,
        minOrderValue: minOrderValue ? parseDecimal(minOrderValue) : fee.minOrderValue,
        maxOrderValue: maxOrderValue ? parseDecimal(maxOrderValue) : fee.maxOrderValue,
        isActive: isActive ?? fee.isActive,
      },
    });

    return res
      .status(200)
      .json({ message: "Shipping fee updated successfully", updatedFee });
  } catch (error) {
    console.error("Error updating shipping fee:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Shipping Fee
const deleteShippingFee = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.shippingFee.delete({ where: { id } });
    return res
      .status(200)
      .json({ message: "Shipping fee deleted successfully" });
  } catch (error) {
    console.error("Error deleting shipping fee:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getApplicableShippingFee = async (req, res) => {
  try {
    const { zone, amount } = req.query;

    if (!zone || !amount) {
      return res.status(400).json({
        message: "Zone and amount are required parameters",
      });
    }

    const shippingFee = await findApplicableShippingFee({
      zone,
      amt: Number(amount),
    });

    if (!shippingFee) {
      return res.status(404).json({
        message: "No applicable shipping fee found for this zone and amount",
      });
    }

    return res.status(200).json({
      message: "Applicable shipping fee found",
      shippingFee,
    });
  } catch (error) {
    console.error("Error fetching applicable shipping fee:", error);

    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};


module.exports = {
  createDeliveryType,
  getDeliveryTypes,
  getDeliveryTypeById,
  updateDeliveryType,
  deleteDeliveryType,
  createShippingFee,
  getShippingFees,
  getShippingFeeById,
  updateShippingFee,
  deleteShippingFee,
  getApplicableShippingFee
};
