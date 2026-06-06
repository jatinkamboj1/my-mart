// controllers/orderController.js
const prisma = require("../prismaClient");
const { calculateCharges } = require("../services/charges.service");
const { createRoyalMailShipment, getShippingFeeById } = require("../services/shipment/shipment.service");
const { sendEmail } = require("../utils/brevo");
const { parseDecimal } = require("../utils/healper");
const { invoiceMailTemplate } = require("../utils/mail/templates");

/* =====================================================
   PAGINATION HELPER
===================================================== */
const parsePagination = (query) => ({
  currentPage: parseInt(query.currentPage, 10) || 0,
  offset: parseInt(query.offset, 10) || 0,
  limit: parseInt(query.limit, 10) || 10,
});

/* =====================================================
   GET ALL ORDERS (ADMIN)
===================================================== */
exports.getOrders = async (req, res) => {
  try {
    const {
      name,          // orderNumber
      status,
      isPaid,
      paymentType,
      userId,
      from,
      to,
      minAmount,
      maxAmount,
      email,
      mobile
    } = req.query;

    const { offset, limit } = parsePagination(req.query);

    const filters = {};

    // 🔹 Order number
    if (name) {
      filters.orderNumber = Number(name);
    }

    // 🔹 Order status
    if (status) {
      filters.status = status;
    }

    // 🔹 Paid filter
    if (isPaid) {
      filters.isPaid = isPaid === "true";
    }

    // 🔹 Payment type (COD / ONLINE)
    if (paymentType) {
      filters.paymentType = paymentType;
    }

    // 🔹 User wise
    if (userId) {
      filters.userId = userId;
    }

    // 🔹 Date range
    if (from || to) {
      filters.createdAt = {};
      if (from) filters.createdAt.gte = new Date(from);
      if (to) filters.createdAt.lte = new Date(to);
    }

    // 🔹 Amount range
    if (minAmount || maxAmount) {
      filters.actualAmount = {};
      if (minAmount) filters.actualAmount.gte = Number(minAmount);
      if (maxAmount) filters.actualAmount.lte = Number(maxAmount);
    }

    // 🔹 Filter by user email or mobile
    if (email || mobile) {
      filters.user = {};
      if (email) {
        filters.user.email = {
          contains: email,
          mode: "insensitive",
        };
      }
      if (mobile) {
        filters.user.phone = {
          contains: mobile,
        };
      }
    }

    const orders = await prisma.order.findMany({
      where: filters,
      skip: offset * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        products: true,
      },
    });

    const total = await prisma.order.count({ where: filters });

    res.json({
      orders,
      pageDetails: {
        total,
        offset,
        limit,
        currentPage: offset + 1,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ getOrders:", error);
    res.status(500).json({ error: error.message });
  }
};

/* =====================================================
   GET USER ORDERS BY ID
===================================================== */
exports.getUserOrdersById = async (req, res) => {
  try {
    let { id } = req.params;
    const isUserRequestingOwnOrders = id === "user";
    if (id === "user") id = req.user.id;
    
    const { currentPage, limit } = parsePagination(req.query);
    let orders = null;
    if (isUserRequestingOwnOrders) {
    orders = await prisma.order.findMany({
      where: { userId: id },
      skip: currentPage * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        orderNumber: true,
        summary: true,
        paymentType: true,
        isPaid: true,
        status: true,
        orderDate: true,
        mobileNumber: true,
        customerRemarks: true,
        vendorRemarks: true,
        shippingStreet: true,
        shippingCity: true,
        shippingState: true,
        shippingCountry: true,
        shippingZip: true,
        billingStreet: true,
        billingCity: true,
        billingState: true,
        billingCountry: true,
        billingZip: true,
        cancellationExpiry: true,
        products: {
          select: {
            name: true,
            quantity: true,
            price: true,
          }
        },
        shipmentTracking: {
          select: {
            provider: true,
            service: true,
            status: true,
            trackingNumber: true
          }
        },
      },
    });
    } else {
      orders = await prisma.order.findMany({
        where: { userId: id },
        skip: currentPage * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { products: true },
      });
    }

    const total = await prisma.order.count({ where: { userId: id } });

    res.json({
      orders,
      pageDetails: {
        total,
        limit,
        currentPage,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ getUserOrdersById:", error);
    res.status(500).json({ error: error.message });
  }
};

/* =====================================================
   GET USER ORDERS BY TOKEN
===================================================== */
exports.getUserOrdersByToken = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { products: true },
      orderBy: { createdAt: "desc" },
    });

    res.json({ orders });
  } catch (error) {
    console.error("❌ getUserOrdersByToken:", error);
    res.status(500).json({ error: error.message });
  }
};

/* =====================================================
   CREATE ORDER (BULK SAFE + SNAPSHOT)
===================================================== */
exports.createOrder = async (req, res) => {
  try {
    let {
      userName,
      email,
      mobileNumber,
      shippingStreet,
      shippingCity,
      shippingState,
      shippingCountry,
      shippingZip,
      billingStreet,
      billingCity,
      billingState,
      billingZip,
      billingCountry,
      userId,
      products,
      discountIds,
      customerRemarks,
      paid,
      shippingId
    } = req.body;

    if (!userId) userId = req.user.id;

    if (!products || !products.length) {
      return res.status(400).json({ error: "Products are required" });
    }

    const result = await prisma.$transaction(async (tx) => {

      let productTotal = parseDecimal(0);
      let discountPrice = parseDecimal(0);
      let ShippingAmount = parseDecimal(0);
      const orderProducts = [];
      const discountSummary = [];

      /* ===============================
         1️⃣ VALIDATE STOCK (NO DEDUCTION)
      =============================== */
      for (const item of products) {
        if (item.productVariantId) {
          const variant = await tx.productVariant.findUnique({
            where: { id: item.productVariantId },
          });

          if (!variant)
            throw new Error("Invalid product variant ID");

          if (variant.stock < item.quantity)
            throw new Error(
              `Insufficient stock for variant ${variant.variantName}`
            );

          const price = variant.discountedPrice ?? variant.price;

          productTotal = productTotal.plus(
            parseDecimal(price).mul(item.quantity)
          );

          orderProducts.push({
            productVariantId: variant.id,
            name: variant.variantName,
            quantity: item.quantity,
            price,
            weightInGrams: variant.weight ? Number(variant.weight) : 0,
          });

        } else if (item.productId) {
          const product = await tx.product.findUnique({
            where: { id: item.productId },
          });

          if (!product)
            throw new Error("Invalid product ID");

          if (product.stock < item.quantity)
            throw new Error(
              `Insufficient stock for ${product.name}`
            );

          const price = product.discountedPrice ?? product.price;

          productTotal = productTotal.plus(
            parseDecimal(price).mul(item.quantity)
          );

          orderProducts.push({
            productId: product.id,
            name: product.name,
            quantity: item.quantity,
            price,
            weightInGrams: product.weight ? Number(product.weight) : 0,
          });
        }
      }

      /* ===============================
         2️⃣ APPLY VALID DISCOUNTS
      =============================== */
      if (discountIds?.length) {
        const now = new Date();

        const discounts = await tx.discount.findMany({
          where: {
            id: { in: discountIds },
            status: true,
            OR: [
              { startDate: null },
              { startDate: { lte: now } }
            ],
            AND: [
              {
                OR: [
                  { endDate: null },
                  { endDate: { gte: now } }
                ]
              }
            ]
          },
        });

        for (const discount of discounts) {
          let applied = parseDecimal(0);

          if (discount.type === "PERCENTAGE") {
            applied = productTotal
              .mul(discount.amount)
              .div(100);
          }

          if (discount.type === "FIXED") {
            applied = parseDecimal(discount.amount);
          }

          // if (discount.type === "SHIPPING_FREE") {
          //   ShippingAmount = parseDecimal(0);
          // }

          discountPrice = discountPrice.plus(applied);

          discountSummary.push({
            code: discount.code,
            // type: discount.type,
            amount: applied.toFixed(2),
          });
        }
      }

      /* ===============================
         3️⃣ SHIPPING
      =============================== */
      const subTotal = productTotal.minus(discountPrice);

      const shippingFee = await getShippingFeeById(shippingId);

      if (shippingFee) {
        ShippingAmount = parseDecimal(shippingFee.feeAmount);
      }

      /* ===============================
         4️⃣ CHARGES
      =============================== */
      const totalBeforeCharges = subTotal.plus(ShippingAmount);

      const charges = await calculateCharges({
        orderTotal: totalBeforeCharges,
      });

      const chargesAmount = charges.charges.reduce(
        (total, c) => total.plus(c.amount),
        parseDecimal(0)
      );

      const actualAmount = charges.totalPay;

      /* ===============================
         5️⃣ CREATE ORDER
      =============================== */
      // return null;
      const order = await tx.order.create({
        data: {
          userId,
          total: productTotal,
          discountPrice,
          ShippingAmount,
          chargesAmount,
          actualAmount,

          summary: {
            "Total Items": products.length,
            "Sub Total": productTotal.toFixed(2),
            "Coupons": discountSummary,
            "Delivery Charges": ShippingAmount.toFixed(2),
            "Charges": charges.charges.map((c) => ({
              name: c.name,
              amount: c.amount.toFixed(2),
            })),
            "Total Amount": actualAmount.toFixed(2),
          },

          deliveryCode: shippingFee?.deliveryType?.name,
          customerRemarks,
          paymentType: paid || "COD",
          userName,
          mobileNumber,
          email,
          status: "PENDING",

          shippingStreet,
          shippingCity,
          shippingState,
          shippingCountry,
          shippingZip,

          billingStreet,
          billingCity,
          billingState,
          billingZip,
          billingCountry,

          products: { create: orderProducts },

          cancellationExpiry: new Date(
            Date.now() + 2 * 24 * 60 * 60 * 1000
          ),
        },
      });

      return order;
    });

    // return res.status(401).json({
    //   // order: result,
    //   message: "Order created successfully",
    // });
    return res.status(201).json({
      order: result,
      message: "Order created successfully",
    });

  } catch (error) {
    console.error("❌ Create Order Error:", error);
    return res.status(400).json({ error: error.message });
  }
};
/* =====================================================
   UPDATE ORDER
===================================================== */
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // ❌ Block updates after shipment lifecycle starts
    if (["IN_TRANSIT", "DELIVERED", "CANCELLED"].includes(order.status)) {
      return res.status(400).json({
        error: `Order cannot be updated once status is ${order.status}`
      });
    }

    // ✅ Allowed fields
    const {
      shippingCity,
      shippingCountry,
      shippingState,
      shippingStreet,
      shippingZip,
      billingCity,
      billingCountry,
      billingState,
      billingStreet,
      billingZip,
      vendorRemarks,
      status
    } = req.body;

    const updateData = {};

    if (shippingCity !== undefined) updateData.shippingCity = shippingCity;
    if (shippingCountry !== undefined) updateData.shippingCountry = shippingCountry;
    if (shippingState !== undefined) updateData.shippingState = shippingState;
    if (shippingStreet !== undefined) updateData.shippingStreet = shippingStreet;
    if (shippingZip !== undefined) updateData.shippingZip = shippingZip;

    if (billingCity !== undefined) updateData.billingCity = billingCity;
    if (billingCountry !== undefined) updateData.billingCountry = billingCountry;
    if (billingState !== undefined) updateData.billingState = billingState;
    if (billingStreet !== undefined) updateData.billingStreet = billingStreet;
    if (billingZip !== undefined) updateData.billingZip = billingZip;

    if (vendorRemarks !== undefined) updateData.vendorRemarks = vendorRemarks;

    // ✅ Status transition validation
    let isShippedNow = false;

    if (status !== undefined) {
      const allowedStatusTransitions = {
        CREATED: ["PENDING", "CONFIRMED", "CANCELLED"],
        PENDING: ["CONFIRMED", "CANCELLED"],
        CONFIRMED: ["IN_TRANSIT", "CANCELLED"],
        IN_TRANSIT: ["DELIVERED"],
        DELIVERED: [],
        CANCELLED: []
      };

      if (!allowedStatusTransitions[order.status]?.includes(status)) {
        return res.status(400).json({
          error: `Invalid status transition from ${order.status} to ${status}`
        });
      }

      updateData.status = status;

      // 🚚 Detect IN_TRANSIT transition
      if (order.status === "CONFIRMED" && status === "IN_TRANSIT") {
        isShippedNow = true;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    // ✅ Update order FIRST (business truth)
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updateData
    });

    // 🚚 Create ShipmentTracking AFTER successful order update
    if (isShippedNow) {
      try {
        await createRoyalMailShipment(id);
      } catch (shipmentError) {
        // ❗ Never rollback order
        console.error("⚠️ Shipment creation failed:", shipmentError);
      }
    }

    return res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder
    });

  } catch (error) {
    console.error("❌ updateOrder:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* =====================================================
   GET ORDER BY ORDER NUMBER
===================================================== */
exports.getOrderHistoryById = async (req, res) => {
  try {
    const order = await prisma.order.findFirst({
      where: { orderNumber: parseInt(req.params.id, 10) },
      select: {
        id: true,
        orderNumber: true,
        summary: true,
        paymentType: true,
        isPaid: true,
        status: true,
        orderDate: true,
        mobileNumber: true,
        customerRemarks: true,
        vendorRemarks: true,
        shippingStreet: true,
        shippingCity: true,
        shippingState: true,
        shippingCountry: true,
        shippingZip: true,
        billingStreet: true,
        billingCity: true,
        billingState: true,
        billingCountry: true,
        billingZip: true,
        cancellationExpiry: true,
        products: {
          select: {
            name: true,
            quantity: true,
            price: true,
          }
        },
        createdAt: true,
      },
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("❌ getOrderById:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* =====================================================
   GET ORDER BY ORDER NUMBER
===================================================== */
exports.getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findFirst({
      where: { orderNumber: parseInt(req.params.id, 10) },
      include: {
        user: true,
        products: true,
        payments: true, 
        shipmentTracking: true
      },
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("❌ getOrderById:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getOrderByOrderNumber = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        orderNumber: parseInt(orderNumber, 10),
      },
      include: {
        user: true,
        products: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("❌ getOrderByOrderNumber:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, vendorRemarks } = req.body;

    if (!status && vendorRemarks === undefined) {
      return res.status(400).json({
        error: "Nothing to update",
      });
    }

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    // ❌ Protect final states
    if (["DELIVERED", "CANCELLED"].includes(order.status)) {
      return res.status(400).json({
        error: `Order already ${order.status}, cannot be updated`,
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(vendorRemarks !== undefined && { vendorRemarks }),
      },
    });

    return res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("❌ updateOrderStatus error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};