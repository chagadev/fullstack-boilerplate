import "../../paths";
import { PrismaClient, Role } from "@prisma/client";
import { config } from "@server/config";
import { encryptPassword } from "@server/backend/plugins/auth-local";

const prisma = new PrismaClient();

async function main() {
  // Upsert admin user
  config.seed.adminUser.password = encryptPassword(config.seed.adminUser.password);
  const adminUser = await prisma.user.upsert({
    where: { email: config.seed.adminUser.email },
    create: { ...config.seed.adminUser, role: Role.ADMIN },
    update: { ...config.seed.adminUser, role: Role.ADMIN },
  });
  console.log(`Upserted admin user ${adminUser.email}`);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
