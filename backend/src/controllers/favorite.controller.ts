import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { user } from "@prisma/client";

interface AuthRequest extends Request {
  user?: user;
}

export const addFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const { laptop_id } = req.body;

    if (user.status !== "NORMAL") {
      res.status(403).json({ error: "Only normal users can add favorites" });
      return;
    }

    const laptop = await prisma.laptop.findUnique({
      where: { laptop_id: Number(laptop_id) },
    });

    if (!laptop) {
      res.status(404).json({ error: "Laptop not found" });
      return;
    }

    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        user_id: user.user_id,
        laptop_id: Number(laptop_id),
      },
    });

    if (existingFavorite) {
      res.status(400).json({ error: "Laptop already in favorites" });
      return;
    }

    const favorite = await prisma.favorite.create({
      data: {
        user_id: user.user_id,
        laptop_id: Number(laptop_id),
      },
      include: { laptop: true },
    });

    res.json(favorite);
  } catch (error) {
    res.status(500).json({ error: "Failed to add favorite" });
  }
};

export const removeFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    const { laptop_id } = req.params;

    if (user.status !== "NORMAL") {
      res.status(403).json({ error: "Only normal users can remove favorites" });
      return;
    }

    const favorite = await prisma.favorite.deleteMany({
      where: {
        user_id: user.user_id,
        laptop_id: Number(laptop_id),
      },
    });

    if (favorite.count === 0) {
      res.status(404).json({ error: "Favorite not found" });
      return;
    }

    res.json({ message: "Favorite removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove favorite" });
  }
};

export const getFavorites = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;

    const favorites = await prisma.favorite.findMany({
      where: { user_id: user.user_id },
      include: {
        laptop: {
          include: {
            category: true,
            display: true,
            gpu: true,
            manufacturer: true,
            processor: true,
            storage: true,
          },
          omit: {
            manufacturer_id: true,
            storage_id: true,
            processor_id: true,
            gpu_id: true,
            display_id: true,
            category_id: true,
          },
        },
      },
    });

    const transformed = favorites.map((fav) => ({
      ...fav.laptop,
      isFavorite: true,
      favorite_id: fav.favorite_id,
    }));

    res.json(transformed);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};
