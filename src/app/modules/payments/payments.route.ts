import { Router, Request, Response } from "express";
import { createPayment } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import Stripe from "stripe";
import config from "../../config";
const router = Router();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("Missing STRIPE_WEBHOOK_SECRET");
}

const stripe = new Stripe(config.stripe.secret_key as string);

// ✅ Payment redirect
router.get("/pay", createPayment);

// ✅ Success
router.get("/success", (req: Request, res: Response) => {
  res.send("✅ Payment successful (but confirmed via webhook)");
});

// ✅ Cancel
router.get("/cancel", (req: Request, res: Response) => {
  res.send("❌ Payment cancelled");
});

// ✅ Webhook (CRITICAL)
router.post(
  "/webhook",
  (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        config.stripe.webhook_secret as string
      );
    } catch (err) {
      console.error("Webhook signature error");
      return res.sendStatus(400);
    }

    // 👉 Pass to service
    PaymentsService.handleWebhook(event);

    res.sendStatus(200);
  }
);

export default router;