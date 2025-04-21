import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

export const getReviewByLaptopId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const reviews = await prisma.review.findMany({
      where: { laptop_id: parseInt(id) },
      include: {
        user: true,
      },
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

export const createReview = async (
  req: Request<{ id: string }, {}, Prisma.reviewCreateInput>,
  res: Response
) => {
  const { id: laptopId } = req.params;
  const { rating, comment } = req.body;

  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const purchase = await prisma.transaction_item.findFirst({
      where: {
        laptop_id: parseInt(laptopId),
        transaction: {
          user_id: user.user_id,
        },
      },
    });

    if (!purchase) {
      res.status(400).json({
        message: "You must purchase this laptop before reviewing it",
      });
      return;
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        user_id: user.user_id,
        laptop_id: parseInt(laptopId),
      },
    });

    if (existingReview) {
      res.status(400).json({ message: "You've already reviewed this laptop" });
      return;
    }

    const newReview = await prisma.review.create({
      data: {
        rating,
        comment,
        user: { connect: { user_id: user.user_id } },
        laptop: { connect: { laptop_id: parseInt(laptopId) } },
      },
      include: {
        user: true,
        laptop: true,
      },
    });

    res.status(201).json({
      message: "Review created successfully",
      review: {
        id: newReview.review_id,
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: newReview.created_at,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create review" });
  }
};
