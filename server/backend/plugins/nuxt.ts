import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";
import fastifyNuxtJS from "fastify-nuxtjs";

const nuxtPlugin: FastifyPluginCallback = (fastify, _opts, next) => {
  fastify.register(fastifyNuxtJS).after(() => {
    fastify.nuxt("*");
  });
  next();
};

export default fp(nuxtPlugin, { name: "nuxt" });
