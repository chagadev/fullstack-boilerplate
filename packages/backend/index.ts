import Fastify from "fastify";
import FastifyStatic from "fastify-static";
import { config } from "@packages/config";

export const app = Fastify();

// Serve frontend static files in production
if (config.mode === "production") {
  app.register(FastifyStatic, { root: `${config.paths.root}/dist/public` });
}
