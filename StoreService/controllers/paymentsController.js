const Stripe = require("stripe");
const prisma = require("../prismaClient");
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({ error: "orderId is required" });
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(order.actualAmount) * 100,
            currency: "GBP",
            metadata: {
                orderNumber: order.orderNumber,
                orderId: order.id
            }
        });

        // ✅ CREATE PAYMENT HERE
        await prisma.payment.create({
            data: {
                orderId: order.id,
                paymentIntentId: paymentIntent.id,
                amount: order.actualAmount,
                currency: "GBP",
                status: "CREATED"
            }
        });

        res.json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error("Create PaymentIntent error:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createPaymentIntent };