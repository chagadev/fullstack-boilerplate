import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";
import mercurius from "mercurius";
import mercuriusUpload from "mercurius-upload";
import { config } from "@providers/config";
import { schema } from "@server/schema";
import { getContextFromRequest } from "../context";

const mercuriusPlugin: FastifyPluginCallback = (fastify, _opts, next) => {
  fastify.register(mercuriusUpload);
  fastify.register(mercurius, {
    context: (request) => getContextFromRequest(request),
    graphiql: config.mode === "development" && "playground",
    prefix: "api",
    schema,
    subscription: true,
    allowBatchedQueries: true,
  });
  next();
};

export default fp(mercuriusPlugin, { name: "mercurius" });
