import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { createReview, getReviewByLaptopId } from "../controllers/review.controller";

const router = Router();

router.get("/:id", getReviewByLaptopId);
router.post("/:id", protectRoute, createReview);

export default router;
