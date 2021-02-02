import { PrismaClient } from "@prisma/client";
export * from "@prisma/client";

export class Prisma extends PrismaClient {
  private static instance: Prisma;

  private constructor() {
    super();
  }

  static getInstance(): Prisma {
    if (!Prisma.instance) {
      Prisma.instance = new Prisma();
    }

    return Prisma.instance;
  }
}

export const prisma = Prisma.getInstance();
