import { Request, Response } from "express";
import Stripe from "stripe";
import prisma from "../lib/prisma";
import { user } from "@prisma/client";

interface CartItem {
  laptop_id: number;
  quantity: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const checkoutStripe = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user as user;
    const items = req.body.items as CartItem[];

    if (!items?.length) throw new Error("Cart is empty");

    const laptops = await prisma.laptop.findMany({
      where: {
        laptop_id: { in: items.map((i) => i.laptop_id) },
      },
      select: {
        laptop_id: true,
        name: true,
        price: true,
        manufacturer: true,
        category: true,
      },
    });

    const lineItems = laptops.map((laptop) => {
      const quantity = items.find((i) => i.laptop_id === laptop.laptop_id)?.quantity || 1;
      return {
        price_data: {
          currency: process.env.STRIPE_CURRENCY!,
          product_data: {
            name: laptop.name,
            metadata: {
              laptop_id: laptop.laptop_id.toString(),
              category: laptop.category.name,
            },
          },
          unit_amount: laptop.price!,
        },
        quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}?payment_success=true`,
      cancel_url: process.env.FRONTEND_URL,
      metadata: {
        user_id: currentUser.user_id.toString(),
        laptop_ids: JSON.stringify(laptops.map((l) => l.laptop_id)),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(400).json({ error: "Checkout failed" });
  }
};
