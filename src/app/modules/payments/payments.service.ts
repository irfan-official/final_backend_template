import { prisma } from "../../prisma/prisma";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentSession = async (userId?: string) => {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Test Product",
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],

    success_url: "http://localhost:8111/api/v1/payments/success",
    cancel_url: "http://localhost:8111/api/v1/payments/cancel",

    metadata: {
      userId: userId || "anonymous",
    },
  });

  // ✅ Save as PENDING
  await prisma.payment.create({
    data: {
      userId: userId || null,
      stripeSessionId: session.id,
      amount: 1000,
      currency: "usd",
      status: "PENDING",
    },
  });

  return session;
};

const handleWebhook = async (event: Stripe.Event) => {
  switch (event.type) {
    case "checkout.session.completed": {
      console.log("webhook received: checkout.session.completed");
      const session = event.data.object as Stripe.Checkout.Session;

      await prisma.payment.update({
        where: { stripeSessionId: session.id },
        data: {
          status: "SUCCESS",
          stripePaymentId: session.payment_intent as string,
        },
      });

      console.log("✅ Payment SUCCESS:", session.id);
      break;
    }

    case "payment_intent.payment_failed": {
      console.log("webhook received: payment_intent.payment_failed");
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      await prisma.payment.updateMany({
        where: { stripePaymentId: paymentIntent.id },
        data: { status: "FAILED" },
      });

      console.log("❌ Payment FAILED:", paymentIntent.id);
      break;
    }

    default:
      console.log(`Unhandled event: ${event.type}`);
  }
};

export const PaymentsService = {
  createPaymentSession,
  handleWebhook,
};