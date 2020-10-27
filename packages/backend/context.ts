import { FastifyRequest } from "fastify";
import { MercuriusContext } from "mercurius";
import { prisma, Prisma } from "@packages/prisma";
import { getUserFromToken } from "@packages/auth";
import { User } from "@packages/schema/generated/types";

export interface ExtraContext {
  prisma: Prisma;
  user: User;
}

export interface Context extends MercuriusContext, ExtraContext {}

export const getContextFromRequest = (
  request: FastifyRequest,
): ExtraContext => {
  const user = getUserFromToken(request.headers.authorization);
  return { prisma, user };
};
