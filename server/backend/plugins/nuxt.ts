import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";
import fastifyHttpProxy from "fastify-http-proxy";
import fastifyNuxtJS from "fastify-nuxtjs";
import { config } from "@providers/config";

const nuxtPlugin: FastifyPluginCallback = (fastify, _opts, next) => {
  if (config.mode === "production") {
    fastify.register(fastifyNuxtJS).after(() => {
      fastify.nuxt("*");
    });
  } else {
    fastify.register(fastifyHttpProxy, {
      upstream: `http://${config.web.host}:${config.web.port}`,
    });
  }
  next();
};

export default fp(nuxtPlugin, { name: "nuxt" });
