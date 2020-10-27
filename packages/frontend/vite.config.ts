import { resolve } from "path";
import { config } from "../config";

const backend = `${config.backend.host}:${config.backend.port}`;

module.exports = {
  outDir: "../../dist/public",
  alias: {
    "/@/": resolve(__dirname, "./src"),
  },
  define: {
    wsEndpoint: `ws://${backend}/graphql`,
  },
  proxy: {
    "/graphql": { target: `http://${backend}` },
    "/playground": { target: `http://${backend}` },
  },
};
