import jwt from "jsonwebtoken";
import { Response } from "express";
import { user } from "@prisma/client";

export const generateTokenAndSetCookie = (user: user, res: Response) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.cookie("e-catalog", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
};
