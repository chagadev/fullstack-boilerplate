import fastify from "fastify";
import authJwtPlugin from "./plugins/auth-jwt";
import authLocalPlugin from "./plugins/auth-local";
import mercuriusPlugin from "./plugins/mercurius";
import nuxtPlugin from "./plugins/nuxt";

export const app = fastify({});

app.register(authJwtPlugin);
app.register(authLocalPlugin);
app.register(mercuriusPlugin);
app.register(nuxtPlugin);
