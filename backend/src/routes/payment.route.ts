import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { checkoutStripe } from "../controllers/payment.controller";

const router = Router();

router.post("/create-checkout-session", protectRoute, checkoutStripe);

export default router;
