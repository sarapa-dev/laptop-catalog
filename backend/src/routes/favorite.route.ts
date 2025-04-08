import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { addFavorite, removeFavorite, getFavorites } from "../controllers/favorite.controller";

const router = Router();

router.post("/", protectRoute, addFavorite);
router.delete("/:laptop_id", protectRoute, removeFavorite);
router.get("/", protectRoute, getFavorites);

export default router;
