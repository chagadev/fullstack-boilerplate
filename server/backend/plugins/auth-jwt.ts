import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";
import fastifyCookie from "fastify-cookie";
import fastifyJwt, { SignPayloadType } from "fastify-jwt";
import { config } from "@providers/config";
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
    verify: {
      extractToken: (request) => {
        if (request.headers && request.headers.authorization) {
          // Bearer token in authorization header
          const parts = request.headers.authorization.split("Bearer ");
          if (parts.length === 2) return parts[1];
        } else if (
          request.cookies[`${config.auth.jwt.cookiePrefix}-payload`] &&
          request.cookies[`${config.auth.jwt.cookiePrefix}-signature`]
        ) {
          // JWT from payload / signature cookies
          return (
            request.cookies[`${config.auth.jwt.cookiePrefix}-payload`] +
            "." +
            request.cookies[`${config.auth.jwt.cookiePrefix}-signature`]
          );
        }
        return null;
      },
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
  fastify.decorateReply("setAuthCookie", function (jwtPayload: SignPayloadType | null) {
    // TODO: Detect SSL and set secure / sameSite accordingly
    const cookieOptions = {
      path: "/",
      sameSite: "Lax",
    };
    if (jwtPayload) {
      delete (jwtPayload as any).password; // Make sure password is never stored in cookie
      const [header, payload, signature] = fastify.jwt.sign(jwtPayload).split(".");
      this.setCookie(`${config.auth.jwt.cookiePrefix}-payload`, `${header}.${payload}`, cookieOptions);
      this.setCookie(
        `${config.auth.jwt.cookiePrefix}-signature`,
        signature,
        Object.assign(cookieOptions, { httpOnly: true }),
      );
    } else {
      this.clearCookie(`${config.auth.jwt.cookiePrefix}-payload`, cookieOptions);
      this.clearCookie(`${config.auth.jwt.cookiePrefix}-signature`, Object.assign(cookieOptions, { httpOnly: true }));
    }

    return this.send({ user: jwtPayload });
  });

  // Logout
  fastify.get("/api/auth/logout", {}, async (request, reply) => {
    return reply.setAuthCookie(null);
  });

  next();
};

export default fp(authJwtPlugin, { name: "auth-jwt" });
