import { makeSchema } from "@nexus/schema";
import { nexusPrisma } from "nexus-plugin-prisma";
import { resolve } from "path";
import { config } from "@packages/config";
import * as types from "./types";

const shouldGenerateArtifacts = process.argv.includes("--nexus-generate") || config.mode === "development";

export const schema = makeSchema({
  types,
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      outputs: {
        typegen: resolve(__dirname, "generated/nexus-prisma-types.ts"),
      },
      shouldGenerateArtifacts,
    }),
  ],
  outputs: {
    schema: resolve(__dirname, "generated/nexus-schema.graphql"),
    typegen: resolve(__dirname, "generated/nexus-types.ts"),
  },
  shouldGenerateArtifacts,
  typegenAutoConfig: {
    sources: [
      {
        source: "@packages/backend/context",
        alias: "context",
      },
    ],
    contextType: "context.Context",
  },
  prettierConfig: resolve(__dirname, "../../.prettierrc.js"),
});
