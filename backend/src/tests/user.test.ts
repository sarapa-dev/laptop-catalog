import { describe, expect, test, vi, beforeEach, type Mock } from "vitest";
import request from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { app } from "../server";

// Mock-ovi eksternih zavisnosti
vi.mock("../lib/prisma", () => ({
  default: {
    user: {
      create: vi.fn(),
      findFirst: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

vi.mock("bcrypt", () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}));

vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn(),
    verify: vi.fn(),
  },
}));

vi.mock("stripe", () => ({
  default: vi.fn(() => ({})),
}));

const mockUser = {
  user_id: 1,
  username: "testuser",
  email: "test@example.com",
  password: "hashedpassword",
  status: "CUSTOMER",
};

describe("User Routes", () => {
  beforeEach(() => {
    // Resetovanje svih mock funkcija pre svakog testa
    vi.clearAllMocks();
  });

  // Definisanje testa za registraciju
  describe("POST /api/user/register", () => {
    test("should register a new user", async () => {
      // neophodni stabovi za uspešnu realizaciju testa
      (prisma.user.create as Mock).mockResolvedValue(mockUser);
      (bcrypt.hash as Mock).mockResolvedValue("hashedpassword");

      const response = await request(app).post("/api/user/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: "User registered successfully" });
    });

    test("should handle short password", async () => {
      const response = await request(app).post("/api/user/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "pass123",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Password must contain at least 8 characters",
      });

      expect(prisma.user.create).not.toHaveBeenCalled();
    });
  });

  describe("POST /api/user/login", () => {
    test("should login with valid credentials", async () => {
      (prisma.user.findFirst as Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as Mock).mockResolvedValue(true);
      (jwt.sign as Mock).mockReturnValue("fake-token");

      const response = await request(app).post("/api/user/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Logged in successfully" });
    });
  });
});
