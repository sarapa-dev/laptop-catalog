import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const manufacturer = await prisma.manufacturer.findMany({
    select: {
      manufacturer_id: true,
      name: true,
    },
  });
  res.json(manufacturer);
});

export default router;
