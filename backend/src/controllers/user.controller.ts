import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie";

type LoginBody = Pick<Prisma.userCreateInput, "email" | "password">;

export const register = async (req: Request<{}, {}, Prisma.userCreateInput>, res: Response) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      res.status(400).json({ message: "You must fill all fields" });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ message: "Password must contain at least 8 characters" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        status: "CUSTOMER",
      },
    });

    generateTokenAndSetCookie(user, res);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "You must fill all fields" });
      return;
    }

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    generateTokenAndSetCookie(user, res);

    res.json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("e-catalog");
  res.json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
