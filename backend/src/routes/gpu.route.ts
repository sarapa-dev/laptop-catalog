import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const gpu = await prisma.gpu.findMany({
    select: {
      gpu_id: true,
      name: true,
    },
  });
  res.json(gpu);
});

export default router;
