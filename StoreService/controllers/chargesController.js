const prisma = require("../prismaClient");
const { calculateCharges } = require("../services/charges.service");
const { parseDecimal } = require("../utils/healper");

exports.applyCharges = async (req, res) => {
  try {
    const { orderTotal } = req.query;

    const result = await calculateCharges({
      orderTotal: Number(orderTotal),
    });

    res.json({
      totalPay: result.totalPay.toFixed(2),
      charges: result.charges.map((c) => ({
        name: c.name,
        amount: c.amount.toFixed(2),
      })),
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal server error" });
  }
};
/* =====================================================
   CREATE CHARGE
===================================================== */
exports.createCharge = async (req, res) => {
  try {
    const {
      name,
      helpText,
      order,
      percentage,
      flatRate,
      operation = "ADD",
      isActive = true
    } = req.body;

    if (!name || order === undefined) {
      return res.status(400).json({
        error: "name and order are required"
      });
    }

    if (percentage == null && flatRate == null) {
      return res.status(400).json({
        error: "Either percentage or flatRate must be provided"
      });
    }

    const charge = await prisma.charges.create({
      data: {
        name,
        helpText,
        order: order? parseInt(order): null,
        percentage: percentage? parseDecimal(percentage): null,
        flatRate: flatRate? parseDecimal(flatRate): null,
        operation,
        isActive: isActive === "true"
      }
    });

    return res.status(201).json({
      message: "Charge created successfully",
      charge
    });
  } catch (error) {
    console.error("❌ createCharge:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Charge with this name already exists"
      });
    }

    return res.status(500).json({ error: error.message });
  }
};

/* =====================================================
   GET ALL CHARGES (ADMIN)
===================================================== */
exports.getCharges = async (req, res) => {
  try {
    const { isActive, includeDeleted } = req.query;

    const where = {
      ...(includeDeleted !== "true" && { isDeleted: false }),
      ...(isActive !== undefined && { isActive: isActive === "true" })
    };

    const charges = await prisma.charges.findMany({
      where,
      orderBy: { order: "asc" }
    });

    return res.json({ charges });
  } catch (error) {
    console.error("❌ getCharges:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =====================================================
   GET CHARGE BY ID
===================================================== */
exports.getChargeById = async (req, res) => {
  try {
    const { id } = req.params;

    const charge = await prisma.charges.findUnique({
      where: { id }
    });

    if (!charge || charge.isDeleted) {
      return res.status(404).json({ error: "Charge not found" });
    }

    return res.json({ charge });
  } catch (error) {
    console.error("❌ getChargeById:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =====================================================
   UPDATE CHARGE
===================================================== */
exports.updateCharge = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.charges.findUnique({
      where: { id }
    });

    if (!existing || existing.isDeleted) {
      return res.status(404).json({ error: "Charge not found" });
    }

    const {
      name,
      helpText,
      order,
      percentage,
      flatRate,
      operation,
      isActive
    } = req.body;

    // const updateData = {};

    // if (name !== undefined) updateData.name = name;
    // if (helpText !== undefined) updateData.helpText = helpText;
    // if (order !== undefined) updateData.order = order;
    // if (percentage !== undefined) updateData.percentage = percentage;
    // if (flatRate !== undefined) updateData.flatRate = flatRate;
    // if (operation !== undefined) updateData.operation = operation;
    // if (isActive !== undefined) updateData.isActive = isActive;

    // if (Object.keys(updateData).length === 0) {
    //   return res.status(400).json({ error: "Nothing to update" });
    // }

    const charge = await prisma.charges.update({
      where: { id },
      data: {
        name,
        helpText,
        order: order? parseInt(order): null,
        percentage: percentage? parseDecimal(percentage): null,
        flatRate: flatRate? parseDecimal(flatRate): null,
        operation,
        isActive: isActive === "true"
      }
    });

    return res.json({
      message: "Charge updated successfully",
      charge
    });
  } catch (error) {
    console.error("❌ updateCharge:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Charge name must be unique"
      });
    }

    return res.status(500).json({ error: error.message });
  }
};

/* =====================================================
   SOFT DELETE CHARGE
===================================================== */
exports.deleteCharge = async (req, res) => {
  try {
    const { id } = req.params;

    const charge = await prisma.charges.findUnique({
      where: { id }
    });

    if (!charge || charge.isDeleted) {
      return res.status(404).json({ error: "Charge not found" });
    }

    await prisma.charges.update({
      where: { id },
      data: { isDeleted: true }
    });

    return res.json({ message: "Charge deleted successfully" });
  } catch (error) {
    console.error("❌ deleteCharge:", error);
    return res.status(500).json({ error: error.message });
  }
};
