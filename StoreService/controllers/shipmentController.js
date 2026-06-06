const prisma = require("../prismaClient");

// Create Shipment
exports.createShipmentTracking = async (data) => {
  return await prisma.shipmentTracking.create({
    data: {
      orderId: data.orderId,
      provider: data.provider,
      service: data.service,
      status: data.status || "CREATED",
      trackingNumber: data.trackingNumber || null,
      labelUrl: data.labelUrl || null,
      orderReference: data.orderReference || null,
      orderIdentifier: data.orderIdentifier || null,
      packageDetails: data.packageDetails || null,
      rawResponse: data.rawResponse || null
    }
  });
}

// Read Shipment by ID
exports.getShipmentTrackingById = async (id) => {
  return await prisma.shipmentTracking.findUnique({
    where: { id },
    include: {
      order: true
    }
  });
}

// Read Shipment by Order ID
exports.getShipmentTrackingByOrderId = async (orderId) => {
  return await prisma.shipmentTracking.findUnique({
    where: { orderId },
    include: {
      order: true
    }
  });
}

// Read Shipment by Order Reference
exports.getShipmentTrackingByOrderReference = async (orderReference) => {
  return await prisma.shipmentTracking.findUnique({
    where: { orderReference },
    include: {
      order: true
    }
  });
}

// Read All Shipments
exports.getAllShipmentTracking = async () => {
  return await prisma.shipmentTracking.findMany({
    include: {
      order: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}

// Read All Shipments (Paginated – recommended)
exports.getShipmentTrackingList = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.shipmentTracking.findMany({
      skip,
      take: limit,
      include: { order: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.shipmentTracking.count()
  ]);

  return {
    items,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
}

// Update Shipment
exports.updateShipmentTracking = async (id, data) => {
  return await prisma.shipmentTracking.update({
    where: { id },
    data
  });
}

// Update Shipment by Order Reference
exports.updateShipmentByOrderReference = async (orderReference, data) => {
  return await prisma.shipmentTracking.update({
    where: { orderReference },
    data
  });
}

// Delete Shipment
exports.deleteShipmentTracking = async (id) => {
  return await prisma.shipmentTracking.delete({
    where: { id }
  });
}

// Check Shipment Exists for Order
exports.shipmentExists = async (orderId) => {
  const shipment = await prisma.shipmentTracking.findUnique({
    where: { orderId }
  });

  return !!shipment;
}