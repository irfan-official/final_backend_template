import { Request, Response } from "express";
import { PaymentsService } from "./payments.service";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const userId = "demo-user"; // replace with auth user later

    const session = await PaymentsService.createPaymentSession(userId);

    if (!session.url) {
      throw new Error("No session URL");
    }

    res.redirect(303, session.url);
  } catch (error) {
    console.error(error);
    res.status(500).send("Payment error");
  }
};