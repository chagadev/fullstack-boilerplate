import "../../paths";
import { PrismaClient } from "@prisma/client";
import * as seeds from "./seeds";

export interface SeedResult {
  message: string;
  warnings?: string[];
}

const prisma = new PrismaClient();

async function main() {
  for (const key of Object.keys(seeds)) {
    const { message, warnings } = await seeds[key](prisma);
    console.log(message);
    if (warnings.length) {
      console.log(warnings);
    }
  }
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
