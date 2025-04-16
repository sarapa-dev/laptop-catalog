import { Router } from "express";
import { getUserTransactions } from "../controllers/transaction.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = Router();

router.get("/", protectRoute, getUserTransactions);

export default router;
