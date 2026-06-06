// webhooks/royalMail.js
const prisma = require("../prismaClient");
const { sendDispatchEmail } = require("../utils/mail/sender");

/**
 * Royal Mail Click & Drop Webhook
 * NOTE: Click & Drop does NOT sign payloads
 * Add token protection.
 */
const royalMailWebhook = async (req, res) => {
  try {
    // 🔐 Basic security (important)
    if (req.query.token !== process.env.RM_WEBHOOK_SECRET) {
      return res.status(401).json({ error: "Unauthorized webhook" });
    }

    const {
      orderReference,
      eventCode,
      eventName,
      eventDate
    } = req.body;

    if (!orderReference) {
      return res.status(400).json({ error: "Missing orderReference" });
    }

    // 🔎 Find shipment
    const shipment = await prisma.shipmentTracking.findUnique({
      where: { shipmentRef: orderReference },
      include: { order: true }
    });

    if (!shipment) {
      // Acknowledge so Royal Mail does not retry
      return res.status(200).json({ message: "Shipment not found" });
    }

    const mappedStatus = mapRoyalMailEvent(eventCode, eventName);

    // 🧠 Status priority system (prevents regression)
    const statusPriority = {
      CREATED: 1,
      IN_TRANSIT: 2,
      OUT_FOR_DELIVERY: 3,
      DELIVERED: 4
    };

    if (
      statusPriority[mappedStatus] <= statusPriority[shipment.status]
    ) {
      return res.status(200).json({ message: "No status upgrade" });
    }

    const eventTimestamp = eventDate
      ? new Date(eventDate)
      : new Date();

    await prisma.$transaction(async (tx) => {

      // Update shipment tracking
      await tx.shipmentTracking.update({
        where: { id: shipment.id },
        data: {
          status: mappedStatus,
          lastEvent: eventName || eventCode,
          lastEventAt: eventTimestamp,
          rawResponse: req.body,
          synced: true
        }
      });

      // 🚚 Update order lifecycle
      if (
        mappedStatus === "IN_TRANSIT" ||
        mappedStatus === "OUT_FOR_DELIVERY"
      ) {
        if (shipment.order.status !== "IN_TRANSIT") {
          await tx.order.update({
            where: { id: shipment.orderId },
            data: { status: "IN_TRANSIT" }
          });
          setImmediate(() => {
            sendDispatchEmail(
              shipment.order.user.email,
              shipment.order,
              shipment.trackingNumber
            );
          });
        }
      }

      if (mappedStatus === "DELIVERED") {
        await tx.order.update({
          where: { id: shipment.orderId },
          data: { status: "DELIVERED" }
        });
        setImmediate(() => {
          sendDeliveredEmail(
            shipment.order.user.email,
            shipment.order
          );
        });
      }

    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("❌ Royal Mail webhook error:", error);
    return res.status(500).json({ error: "Webhook failed" });
  }
};

/**
 * Royal Mail → Internal Status Mapping
 */
function mapRoyalMailEvent(eventCode, eventName) {
  const code = eventCode?.toUpperCase() || "";
  const name = eventName?.toUpperCase() || "";

  if (code.includes("DELIVERED") || name.includes("DELIVERED")) {
    return "DELIVERED";
  }

  if (code.includes("OUT_FOR_DELIVERY")) {
    return "OUT_FOR_DELIVERY";
  }

  if (
    code.includes("IN_TRANSIT") ||
    code.includes("DESPATCHED")
  ) {
    return "IN_TRANSIT";
  }

  return "IN_TRANSIT";
}

module.exports = { royalMailWebhook };