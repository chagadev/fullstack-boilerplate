import { makeSchema } from "@nexus/schema";
import { resolve } from "path";
import { config } from "@packages/config";
import * as types from "./types";

const shouldGenerateArtifacts =
  process.argv.includes("--nexus-generate") || config.mode === "development";

export const schema = makeSchema({
  types,
  outputs: {
    schema: resolve(__dirname, "generated/nexus-schema.graphql"),
    typegen: resolve(__dirname, "generated/nexus-types.ts"),
  },
  shouldGenerateArtifacts,
  prettierConfig: resolve(__dirname, "../../.prettierrc.js"),
});
