const prisma = require("../../prismaClient");
const { createRoyalMailOrder } = require("../../utils/shipment/royalMail.utils");
const { mapOrderToRoyalMail } = require("../../utils/shipment/royalMailOrderMapper");

async function createShipment(orderId) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { products: true, user: true }
  });

  if (!order) throw new Error("Order not found");

  // 🛑 prevent duplicate shipment
  const existing = await prisma.shipmentTracking.findUnique({
    where: { orderId }
  });
  if (existing) return existing;

  // 1️⃣ create tracking record
  const shipment = await prisma.shipmentTracking.create({
    data: {
      orderId,
      provider: "ROYAL_MAIL",
      service: "Standard",
      status: "CREATED"
    }
  });

  // 2️⃣ call Royal Mail
  const payload = mapOrderToRoyalMail(order);
  
  const response = await createRoyalMailOrder(payload);
  const rm = response?.orders?.[0];

  // 3️⃣ update tracking
  return await prisma.shipmentTracking.update({
    where: { id: shipment.id },
    data: {
      status: "DESPATCHED",
      synced: true,
      shipmentRef: `ORDER-${order.orderNumber}`,
      trackingNumber: rm?.trackingNumber,
      labelUrl: rm?.label?.url,
      rawResponse: response
    }
  });
}

async function createRoyalMailShipment(orderId) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      products: true,
      user: true
    }
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // prevent duplicate shipments
  const existingShipment = await prisma.shipmentTracking.findUnique({
    where: { orderId }
  });

  if (existingShipment) {
    return existingShipment;
  }

  // create initial shipment record
  const shipment = await prisma.shipmentTracking.create({
    data: {
      orderId,
      provider: "ROYAL_MAIL",
      service: order.deliveryCode || "Standard",
      status: "CREATED"
    }
  });

  const payload = mapOrderToRoyalMail(order);

  let response;

  try {
    response = await createRoyalMailOrder(payload);
  } catch (error) {
    await prisma.shipmentTracking.update({
      where: { id: shipment.id },
      data: {
        status: "FAILED",
        rawResponse: {
          error: error.message
        }
      }
    });

    throw error;
  }

  const created = response?.createdOrders?.[0];
  const failed = response?.failedOrders?.[0];

  // handle failed shipment
  if (!created) {
    return await prisma.shipmentTracking.update({
      where: { id: shipment.id },
      data: {
        status: "FAILED",
        rawResponse: response,
        lastEvent: failed?.errors?.[0]?.errorMessage || "Shipment creation failed"
      }
    });
  }

  const trackingNumber = created.trackingNumber || null;
  const packagesTrackingNumber = created?.packages?.map(pkg => pkg.trackingNumber) || [];

  const labelUrl = created.label || null;

  return await prisma.shipmentTracking.update({
    where: { id: shipment.id },
    data: {
      status: created.trackingNumber ? "DESPATCHED" : "CREATED",
      synced: true,
      orderReference: created.orderReference,
      orderIdentifier: created.orderIdentifier?.toString(),
      trackingNumber,
      labelUrl,
      packageDetails: created.packages || null,
      lastEvent: "Shipment created",
      lastEventAt: new Date(created.createdOn),
      rawResponse: response
    }
  });
}

/**
 * Find applicable shipping fee based on zone and order amount
 *
 * @param {Object} params
 * @param {string} params.zone
 * @param {number} params.amount
 * @returns {Promise<Object|null>}
 */
async function findApplicableShippingFee({ zone, amt }) {
  const amount = Number(amt);

  if (!zone || isNaN(amount)) {
    throw new Error("zone and numeric amount are required");
  }

  const baseWhere = {
    isActive: true,
    AND: [
      {
        OR: [
          { minOrderValue: null },
          { minOrderValue: { lte: amount } },
        ],
      },
      {
        OR: [
          { maxOrderValue: null },
          { maxOrderValue: { gte: amount } },
        ],
      },
    ],
  };

  // 1️⃣ Try matching zone
  let shippingFees = await prisma.shippingFee.findMany({
    where: {
      ...baseWhere,
      zone: { equals: zone, mode: "insensitive" },
    },
    select: {
      id: true,
      zone: true,
      feeAmount: true,
      deliveryType: {
        select: {
          name: true,
          description: true,
        },
      },
    },
    orderBy: { feeAmount: "asc" },
  });

  // 2️⃣ Fallback to default zone
  if (!shippingFees.length) {
    shippingFees = await prisma.shippingFee.findMany({
      where: {
        ...baseWhere,
        zone: { contains: "default", mode: "insensitive" },
      },
      select: {
        id: true,
        zone: true,
        feeAmount: true,
        deliveryType: {
          select: {
            name: true,
            description: true,
          },
        },
      },
      orderBy: { feeAmount: "asc" },
    });
  }

  return shippingFees;
}

async function getShippingFeeById(shippingFeeId) {
  if (shippingFeeId === null || shippingFeeId === undefined) {
    throw new Error("shippingFeeId is required");
  }
  // 1️⃣ Try finding by id
  let shippingFee = await prisma.shippingFee.findUnique({
    where: { id: shippingFeeId },
    include: { deliveryType: true },
  });

  if (!shippingFee) {
    throw new Error("Shipping fee not found");
  }

  return shippingFee || null;
}

module.exports = { createShipment, createRoyalMailShipment, findApplicableShippingFee, getShippingFeeById };
