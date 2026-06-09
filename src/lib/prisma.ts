import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";
import path from "path";

const dbPath = process.env.DATABASE_URL ?? "file:./dev.db";
const url = dbPath.startsWith("file:")
  ? `file:${path.resolve(process.cwd(), dbPath.replace("file:", ""))}`
  : dbPath;

const adapter = new PrismaBetterSqlite3({ url });

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
