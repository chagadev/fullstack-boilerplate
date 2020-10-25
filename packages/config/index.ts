import env from "env-var";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

export interface Config {
  logger: {
    level: string;
  };
  mode: "development" | "production";
  paths: {
    root: string;
  };
  server: {
    host: string;
    port: number;
  };
}

const mode = process.env.NODE_ENV || "development";
const rootPath = resolve(__dirname, "../..").replace("/dist", "");
dotenvConfig({ path: `${rootPath}/.env` });
dotenvConfig({ path: `${rootPath}/packages/prisma/.env` });

export const config = {
  mode,
  logger: {
    level: env.get("LOGGER_LEVEL").default("info").asString(),
  },
  paths: {
    root: rootPath,
  },
  server: {
    host: env.get("SERVER_HOST").default("localhost").asString(),
    port: env.get("SERVER_PORT").default("4000").asPortNumber(),
  },
};
