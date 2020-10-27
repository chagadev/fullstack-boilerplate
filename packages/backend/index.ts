import fastify from "fastify";
import fastifyStatic from "fastify-static";
import mercurius from "mercurius";
import { schema } from "@packages/schema";
import { config } from "@packages/config";
import { getContextFromRequest } from "./context";

// Create Fastify application
export const app = fastify();

// Mercurius GraphQL server
app.register(mercurius, {
  schema,
  context: (request) => getContextFromRequest(request),
  subscription: {
    context: (_connection, request) => getContextFromRequest(request),
  },
  graphiql: config.mode === "development" && "playground",
});

// Serve frontend static files in production
if (config.mode === "production") {
  app.register(fastifyStatic, { root: `${config.paths.root}/dist/public` });
}

// Graceful "Not found" handler
app.setNotFoundHandler((_request, reply) => {
  reply.status(404).sendFile("index.html");
});
