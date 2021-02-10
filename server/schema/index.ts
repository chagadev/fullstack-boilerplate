import { resolve } from "path";
import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import { nexusShield, allow } from "nexus-shield";
import { config } from "@providers/config";
import * as types from "./types";

const shouldGenerateArtifacts = process.argv.includes("--nexus-generate") || config.mode === "development";

export const schema = makeSchema({
  contextType: {
    module: "@server/backend/context",
    export: "Context",
  },
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      outputs: {
        typegen: resolve(__dirname, "generated/nexus-prisma-types.ts"),
      },
      shouldGenerateArtifacts,
    }),
    nexusShield({
      defaultRule: allow,
    }),
  ],
  prettierConfig: resolve(__dirname, "../../.prettierrc.js"),
  outputs: {
    schema: resolve(__dirname, "generated/schema.graphql"),
    typegen: resolve(__dirname, "generated/nexus-types.ts"),
  },
  shouldGenerateArtifacts,
  types,
});
