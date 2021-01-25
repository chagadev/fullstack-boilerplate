import { MercuriusContext } from "mercurius";
import { FastifyRequest } from "fastify";
import { prisma, Prisma } from "@server/prisma";

export interface ExtraContext {
  request: FastifyRequest;
  prisma: Prisma;
}

export interface Context extends MercuriusContext, ExtraContext {}

export const getContextFromRequest = (request: FastifyRequest): ExtraContext => {
  return { request, prisma };
};
