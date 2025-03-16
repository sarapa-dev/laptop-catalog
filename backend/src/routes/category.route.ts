import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { laptop: true },
        },
      },
    });

    const formattedCategories = categories.map((category) => ({
      category_id: category.category_id,
      name: category.name,
      laptopCount: category._count.laptop,
    }));

    res.json(formattedCategories);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
