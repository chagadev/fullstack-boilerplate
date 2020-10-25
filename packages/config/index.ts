import env from "env-var";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

const rootPath = resolve(__dirname, "../..").replace("/dist", "");
dotenvConfig({ path: `${rootPath}/.env` });
dotenvConfig({ path: `${rootPath}/packages/prisma/.env` });

export interface Config {
  env: "development" | "production";
  paths: {
    root: string;
  };
  server: {
    host: string;
    port: number;
  };
}

export const config = {
  env: process.env.NODE_ENV === "production" ? "production" : "development",
  paths: {
    root: rootPath,
  },
  server: {
    host: env.get("SERVER_HOST").default("localhost").asString(),
    port: env.get("SERVER_PORT").default("4000").asPortNumber(),
  },
};
