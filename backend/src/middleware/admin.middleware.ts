import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user

        if (!user) {
            res.status(401).json({ message: "Unauthorized - No user found" });
            return
        }

        const dbUser = await prisma.user.findUnique({
            where: { user_id: user.user_id },
            select: { status: true },
        });

        if (!dbUser || dbUser.status !== "ADMIN") {
            res.status(403).json({ message: "Forbidden - Admin access required" });
            return
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}