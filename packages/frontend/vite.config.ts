import { resolve } from "path";
import { config } from "../config";

module.exports = {
  outDir: "../../dist/public",
  alias: {
    "/@/": resolve(__dirname, "./src"),
  },
  proxy: {
    "/graphql": {
      target: `http://${config.server.host}:${config.server.port}`,
    },
  },
};
