import { Request, Response } from "express";
import Stripe from "stripe";
import prisma from "../lib/prisma";
import { user } from "@prisma/client";

interface CartItem {
  laptop_id: number;
  quantity: number;
}

interface StripeItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      metadata: { laptop_id: string };
    };
    unit_amount: number;
  };
  quantity: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const checkoutStripe = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user as user;
    const items = req.body.items as CartItem[];

    if (!items?.length) throw new Error("Cart is empty");

    const lineItems: StripeItem[] = [];

    for (const item of items) {
      const laptop = await prisma.laptop.findUnique({
        where: { laptop_id: item.laptop_id },
        select: { price: true, name: true },
      });

      if (!laptop?.price) throw new Error(`Invalid laptop ID: ${item.laptop_id}`);
      if (item.quantity < 1) throw new Error(`Invalid quantity for laptop ${item.laptop_id}`);

      lineItems.push({
        price_data: {
          currency: process.env.STRIPE_CURRENCY!,
          product_data: {
            name: laptop.name,
            metadata: { laptop_id: item.laptop_id.toString() },
          },
          unit_amount: laptop.price,
        },
        quantity: item.quantity,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}?payment_success=true`,
      cancel_url: process.env.FRONTEND_URL,
      metadata: {
        user_id: currentUser.user_id.toString(),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(400).json({ error: "Checkout failed" });
  }
};
