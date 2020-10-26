import { logger } from "@packages/logger";
import { prisma } from "@packages/prisma";

(async () => {
  // TODO: Seed database
  logger.info("Seeding database...");
})()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((error) => {
    prisma.$disconnect();
    console.error(error);
  });
