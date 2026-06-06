import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, currency, payment_method_id } = await req.json();

    // Create a PaymentIntent with the payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: payment_method_id,
      confirmation_method: 'manual',
      confirm: false,
      automatic_payment_methods: { enabled: false }, // Disable automatic payment methods
      capture_method: 'automatic', // Change to automatic instead of automatic_async
    });

    return new Response(JSON.stringify({ 
      clientSecret: paymentIntent.client_secret 
    }));
  } catch (err) {
    console.error('Error creating payment intent:', err);
    return new Response(JSON.stringify({ 
      error: { message: err.message } 
    }), { status: 500 });
  }
} 