import { describe, beforeAll, beforeEach, afterEach, test, expect, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import request from "supertest";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { app } from "../server";

const prisma = new PrismaClient();

const generateToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1d" });
};

describe("Review Integration Tests", () => {
  let testUser: any;
  let testLaptop: any;
  let validJwtToken: string;

  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    // Brisanje prethodnih podataka (Cleanup)
    await prisma.$transaction([
      prisma.review.deleteMany(),
      prisma.transaction_item.deleteMany(),
      prisma.transaction.deleteMany(),
      prisma.favorite.deleteMany(),
      prisma.laptop.deleteMany(),

      prisma.storage.deleteMany(),
      prisma.processor.deleteMany(),
      prisma.gpu.deleteMany(),
      prisma.display.deleteMany(),

      prisma.category.deleteMany(),
      prisma.manufacturer.deleteMany(),

      prisma.user.deleteMany(),
    ]);

    // Kreiranje test korisnika
    testUser = await prisma.user.create({
      data: {
        username: "testuser",
        email: "test@example.com",
        password: await bcrypt.hash("password123", 10),
      },
    });

    validJwtToken = generateToken(testUser.user_id);

    // Kreiranje test laptopa
    testLaptop = await prisma.laptop.create({
      data: {
        name: "Test Laptop",
        price: 1000,
        image_url: "test.jpg",
        category: { create: { name: "Test Category" } },
        manufacturer: { create: { name: "Test Manufacturer" } },
        storage: {
          create: {
            name: "Test Storage",
            type: "M2_SSD",
            manufacturer: { create: { name: "Storage Manufacturer" } },
          },
        },
        processor: {
          create: {
            name: "Test Processor",
            core_count: 4,
            tdp: 35,
            manufacturer: { create: { name: "CPU Manufacturer" } },
          },
        },
        gpu: {
          create: {
            name: "Test GPU",
            vram: 8,
            tdp: 120,
            type: "DEDICATED",
            manufacturer: { create: { name: "GPU Manufacturer" } },
          },
        },
        display: {
          create: {
            name: "Test Display",
            size: 15,
            width: 1920,
            height: 1080,
            type: "IPS",
            manufacturer: { create: { name: "Display Manufacturer" } },
          },
        },
      },
      include: {
        category: true,
        manufacturer: true,
      },
    });
  });

  afterEach(async () => {});

  test("POST /api/review/:id - should create review after purchase", async () => {
    // Simululacija kupovine laptopa
    await prisma.transaction.create({
      data: {
        user_id: testUser.user_id,
        total_amount: 1000,
        created_at: new Date(),
        transaction_item: {
          create: {
            laptop_id: testLaptop.laptop_id,
            laptop_price: testLaptop.price!,
            laptop_name: testLaptop.name,
            laptop_category: testLaptop.category.name,
          },
        },
      },
    });

    // Kreiranje recenzije
    const response = await request(app)
      .post(`/api/review/${testLaptop.laptop_id}`)
      .set("Cookie", [`e-catalog=${validJwtToken}`])
      .send({
        rating: 5,
        comment: "Excellent laptop!",
      });

    // Verifikacija odgovora
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      message: "Review created successfully",
      review: {
        rating: 5,
        comment: "Excellent laptop!",
      },
    });

    const review = await prisma.review.findFirst({
      where: {
        user_id: testUser.user_id,
        laptop_id: testLaptop.laptop_id,
      },
    });

    expect(review).toBeTruthy();
    expect(review?.rating).toBe(5);
  });

  test("POST /api/review/:id - blocks duplicate reviews", async () => {
    await prisma.transaction.create({
      data: {
        user_id: testUser.user_id,
        total_amount: 1000,
        created_at: new Date(),
        transaction_item: {
          create: {
            laptop_id: testLaptop.laptop_id,
            laptop_price: testLaptop.price!,
            laptop_name: testLaptop.name,
            laptop_category: testLaptop.category.name,
          },
        },
      },
    });

    await request(app)
      .post(`/api/review/${testLaptop.laptop_id}`)
      .set("Cookie", [`e-catalog=${validJwtToken}`])
      .send({ rating: 5, comment: "First review" });

    // Dupla recenzija
    const response = await request(app)
      .post(`/api/review/${testLaptop.laptop_id}`)
      .set("Cookie", [`e-catalog=${validJwtToken}`])
      .send({ rating: 4, comment: "Duplicate review" });

    // Verifikacija odgovora
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "You've already reviewed this laptop",
    });

    const reviews = await prisma.review.findMany({
      where: {
        user_id: testUser.user_id,
        laptop_id: testLaptop.laptop_id,
      },
    });
    expect(reviews.length).toBe(1);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
