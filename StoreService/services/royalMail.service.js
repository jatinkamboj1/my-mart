const prisma = require("../prismaClient");
const { createRoyalMailOrder, updateOrderStatus } = require("../utils/shipment/royalMail.utils");
const { mapOrderToRoyalMail } = require("../utils/shipment/royalMailOrderMapper");

/**
 * Create Royal Mail shipment from local order
 */
async function createShipmentForOrder(orderId) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      products: true,
      user: true
    }
  });

  if (!order) throw new Error("Order not found");

  // ✅ map Prisma order → Royal Mail payload
  const payload = mapOrderToRoyalMail(order);

  // ✅ call Royal Mail API client
  return await createRoyalMailOrder(payload);
}

/**
 * Mark shipment despatched in Royal Mail
 */
async function despatchShipment(orderNumber) {
  return await updateOrderStatus(
    `ORDER-${orderNumber}`,
    "Despatched"
  );
}

module.exports = {
  createShipmentForOrder,
  despatchShipment
};
