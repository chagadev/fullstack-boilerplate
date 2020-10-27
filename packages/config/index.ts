import env from "env-var";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

export interface Config {
  auth: {
    tokenSecret: string;
  };
  backend: {
    host: string;
    port: number;
  };
  logger: {
    level: string;
  };
  mode: "development" | "production";
  paths: {
    root: string;
  };
}

const mode = process.env.NODE_ENV || "development";
const rootPath = resolve(__dirname, "../..").replace("/dist", "");
dotenvConfig({ path: `${rootPath}/.env` });
dotenvConfig({ path: `${rootPath}/packages/prisma/.env` });

export const config = {
  auth: {
    tokenSecret: env.get("TOKEN_SECRET").default("supertokensecret").asString(),
  },
  backend: {
    host: env.get("BACKEND_HOST").default("localhost").asString(),
    port: env.get("BACKEND_PORT").default("4000").asPortNumber(),
  },
  logger: {
    level: env.get("LOGGER_LEVEL").default("info").asString(),
  },
  mode,
  paths: {
    root: rootPath,
  },
};
