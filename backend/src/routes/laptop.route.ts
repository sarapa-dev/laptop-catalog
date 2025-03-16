import { Router } from "express";
import {
  getAllLaptops,
  getLaptopById,
  getFeaturedLaptops,
  createLaptop,
} from "../controllers/laptop.controller";
import { protectRoute } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";

const router = Router();

router.get("/", getAllLaptops);
router.get("/featured", getFeaturedLaptops);
router.get("/:id", getLaptopById);

router.post("/", protectRoute, isAdmin, createLaptop);

export default router;
