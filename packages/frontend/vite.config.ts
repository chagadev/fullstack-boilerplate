import { resolve } from "path";
import { config } from "../config";

const target = `http://${config.server.host}:${config.server.port}`;

module.exports = {
  outDir: "../../dist/public",
  alias: {
    "/@/": resolve(__dirname, "./src"),
  },
  define: {
    wsEndpoint: `ws://${config.server.host}:${config.server.port}/graphql`,
  },
  proxy: {
    "/graphql": { target },
    "/playground": { target },
  },
};
