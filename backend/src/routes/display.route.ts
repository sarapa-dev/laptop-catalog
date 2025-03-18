import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const display = await prisma.display.findMany({
    select: {
      display_id: true,
      name: true,
    },
  });
  res.json(display);
});

export default router;
