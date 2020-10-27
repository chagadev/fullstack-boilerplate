import { config } from "@packages/config";
import { logger } from "@packages/logger";
import { prisma } from "@packages/prisma";

(async () => {
  // Upsert admin user
  logger.info(`Seeding admin user (${config.seed.admin.email})`);
  await prisma.user.upsert({
    where: { email: config.seed.admin.email },
    create: config.seed.admin,
    update: config.seed.admin,
  });
})()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((error) => {
    prisma.$disconnect();
    console.error(error);
  });
