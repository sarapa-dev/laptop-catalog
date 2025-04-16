import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { user } from "@prisma/client";

export const getUserTransactions = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user as user;

    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: currentUser.user_id,
      },
      include: {
        transaction_item: {
          select: {
            transaction_item_id: true,
            laptop_id: true,
            laptop_price: true,
            laptop_name: true,
            laptop_category: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    res.json({
      status: "success",
      data: transactions.map((transaction) => ({
        transaction_id: transaction.transaction_id,
        total_amount: transaction.total_amount,
        created_at: transaction.created_at,
        items: transaction.transaction_item.map((item) => ({
          id: item.transaction_item_id,
          laptop_id: item.laptop_id,
          price: item.laptop_price,
          name: item.laptop_name,
          category: item.laptop_category,
        })),
      })),
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve transactions",
    });
  }
};
