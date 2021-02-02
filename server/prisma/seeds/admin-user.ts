import { PrismaClient, Role } from "@prisma/client";
import { SeedResult } from "@server/prisma/seed";
import { config } from "@server/config";
import { encryptPassword } from "@server/backend/plugins/auth-local";

export async function seedAdminUser(prisma: PrismaClient): Promise<SeedResult> {
  config.seed.adminUser.password = encryptPassword(config.seed.adminUser.password);
  const adminUser = await prisma.user.upsert({
    where: { email: config.seed.adminUser.email },
    create: { ...config.seed.adminUser, role: Role.ADMIN },
    update: { ...config.seed.adminUser, role: Role.ADMIN },
  });
  return { message: `Upserted admin user (${config.seed.adminUser.email})` };
}
