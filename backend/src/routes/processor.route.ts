import { Request, Response, Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const processor = await prisma.processor.findMany({
    select: {
      processor_id: true,
      name: true,
    },
  });
  res.json(processor);
});

export default router;
