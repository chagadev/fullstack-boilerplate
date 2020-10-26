import { extendType } from "@nexus/schema";

export const HelloQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("hello", {
      type: "String",
      description: "Display a greeting message",
      resolve: () => `Hello World`,
    });
  },
});
