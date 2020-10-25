import { resolve } from "path";

module.exports = {
  outDir: "../../dist/public",
  alias: {
    "/@/": resolve(__dirname, "./src"),
  },
};
