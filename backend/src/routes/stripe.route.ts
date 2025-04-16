import express from "express";
import Stripe from "stripe";
import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const laptopIds = JSON.parse(session.metadata!.laptop_ids) as number[];

        const purchasedLaptops = await prisma.laptop.findMany({
          where: { laptop_id: { in: laptopIds } },
          include: { category: true },
        });

        const transaction = await prisma.transaction.create({
          data: {
            user_id: parseInt(session.metadata!.user_id),
            total_amount: session.amount_total!,
            transaction_item: {
              create: purchasedLaptops.map((laptop) => ({
                laptop_id: laptop.laptop_id,
                laptop_price: laptop.price!,
                laptop_name: laptop.name,
                laptop_category: laptop.category.name,
              })),
            },
          },
          include: {
            transaction_item: true,
          },
        });

        console.log("New transaction saved:", transaction);
      }

      res.status(200).json({ received: true });
    } catch (err: any) {
      console.error("❌ Webhook error:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);

export default router;
