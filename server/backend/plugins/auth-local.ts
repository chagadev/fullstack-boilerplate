import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";
import { prisma } from "@server/prisma";
import { compareSync, hashSync } from "bcryptjs";
import { SignPayloadType } from "fastify-jwt";
import { config } from "@server/config";

export function verifyPassword(password: string, hash: string): boolean {
  return compareSync(password, hash);
}

export function encryptPassword(password: string): string {
  return hashSync(password);
}

const authLocalPlugin: FastifyPluginCallback = (fastify, _opts, next) => {
  // Local login
  fastify.post<{
    Body: {
      email: string;
      password: string;
    };
  }>("/api/auth/login", {}, async ({ body: { email, password } }, reply) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (verifyPassword(password, user.password)) {
        delete user.password;
        return reply.setAuthCookie(user as SignPayloadType).send({ user });
      }
    } catch (error) {}
    return reply.code(401);
  });

  next();
};

export default fp(authLocalPlugin, { name: "auth-local", dependencies: ["auth-jwt"] });
