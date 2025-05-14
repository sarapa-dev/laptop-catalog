import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function setup() {
  await prisma.$connect();

  await prisma.$executeRaw`PRAGMA foreign_keys = ON`;

  await prisma.$executeRaw`DROP TABLE IF EXISTS _prisma_migrations`;
  await prisma.$executeRaw`DROP TABLE IF EXISTS Review`;
  await prisma.$executeRaw`DROP TABLE IF EXISTS Transaction`;

  await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS _prisma_migrations (/*...*/)`;
}

setup()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
