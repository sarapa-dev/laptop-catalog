import { Router } from "express";
import { register, login, logout, getCurrentUser } from "../controllers/user.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protectRoute, getCurrentUser);

export default router;