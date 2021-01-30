import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";
import fastifyCookie from "fastify-cookie";
import fastifyJwt, { SignPayloadType } from "fastify-jwt";
import { config } from "@server/config";
import { User } from "@server/schema/generated/types";

declare module "fastify-jwt" {
  interface FastifyJWT {
    payload: User;
  }
}

declare module "fastify" {
  interface FastifyReply {
    /**
     * Set authentication cookie in reply
     *
     * @param jwtPayload Authentication token payload
     */
    setAuthCookie(jwtPayload: SignPayloadType): FastifyReply;
  }
}

const authJwtPlugin: FastifyPluginCallback = (fastify, _opts, next) => {
  // Register fastify-cookie
  fastify.register(fastifyCookie);

  // Register fastify-jwt
  fastify.register(fastifyJwt, {
    secret: config.auth.jwt.secret,
    cookie: {
      cookieName: config.auth.jwt.cookieName,
    },
  });

  // Handle JWT authentication on every request
  fastify.addHook("onRequest", async (request) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      // Ignore missing token
    }
  });

  // Provide reply decorator for setting authentication cookie from user
  fastify.decorateReply("setAuthCookie", function (jwtPayload: SignPayloadType) {
    delete (jwtPayload as any).password; // Make sure password is never stored in cookie
    const token = fastify.jwt.sign(jwtPayload);
    this.setCookie(config.auth.jwt.cookieName, token, {
      httpOnly: true,
      sameSite: true,
    });
    return this;
  });

  next();
};

export default fp(authJwtPlugin, { name: "auth-jwt" });