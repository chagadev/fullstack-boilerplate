import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import fastifyStatic from "fastify-static";
import fastifyHttpProxy from "fastify-http-proxy";
import { config } from "@server/config";

const webPlugin: FastifyPluginCallback = (fastify, _opts, next) => {
  if (config.mode === "development") {
    // Proxy development server
    fastify.register(fastifyHttpProxy, {
      upstream: `http://${config.web.host}:${config.web.port}`,
    });
  } else {
    // Serve frontend static files
    fastify.register(fastifyStatic, { root: `${config.paths.root}/dist/public` });

    // Graceful "Not found" handler
    // TODO: Find a way to handle 404 errors
    fastify.setNotFoundHandler((_request, reply) => {
      reply.sendFile("index.html");
    });
  }

  next();
};

export default fp(webPlugin, { name: "web" });
