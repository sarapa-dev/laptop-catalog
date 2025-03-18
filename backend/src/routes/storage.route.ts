import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const storage = await prisma.storage.findMany({
    select: {
      storage_id: true,
      name: true,
    },
  });
  res.json(storage);
});

export default router;
