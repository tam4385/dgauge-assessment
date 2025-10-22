import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const queryDb = async (sql: string) => {
  return await prisma.$queryRawUnsafe(sql);
};
