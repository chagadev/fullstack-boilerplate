import env from "env-var";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

export interface Config {
  auth: {
    jwt: {
      cookiePrefix: string;
      secret: string;
    };
  };
  backend: {
    host: string;
    port: number;
  };
  mode: "development" | "production";
  paths: {
    root: string;
  };
  providers: {
    mailer: {
      host: string;
      port: number;
      auth: {
        user: string;
        pass: string;
      };
    };
  };
  seed: {
    adminUser: {
      email: string;
      password: string;
    };
  };
  web: {
    host: string;
    port: number;
  };
}

const mode = process.env.NODE_ENV || "development";
const rootPath = resolve(__dirname, "../..").replace("/dist", "");
dotenvConfig({ path: `${rootPath}/.env` });

export const config = {
  auth: {
    jwt: {
      cookiePrefix: env.get("AUTH_JWT_COOKIE_PREFIX").default("fullstack-boilerplate").asString(),
      secret: env.get("AUTH_JWT_SECRET").default("supersecret").asString(),
    },
  },
  backend: {
    host: env.get("BACKEND_HOST").default("0.0.0.0").asString(),
    port: env.get("BACKEND_PORT").default("4000").asPortNumber(),
  },
  mode,
  paths: {
    root: rootPath,
  },
  providers: {
    mailer: {
      host: env.get("MAILER_SMTP_HOST").default("localhost").asString(),
      port: env.get("MAILER_SMTP_PORT").default("465").asPortNumber(),
      auth: {
        user: env.get("MAILER_SMTP_USER").asString(),
        pass: env.get("MAILER_SMTP_PASSWORD").asString(),
      },
    },
  },
  seed: {
    adminUser: {
      email: env.get("SEED_ADMIN_USER_EMAIL").default("pascal@lewebsimple.ca").asString(),
      password: env.get("SEED_ADMIN_USER_PASSWORD").default("changeme").asString(),
    },
  },
  web: {
    host: env.get("WEB_HOST").default("localhost").asString(),
    port: env.get("WEB_PORT").default("3000").asPortNumber(),
  },
};
