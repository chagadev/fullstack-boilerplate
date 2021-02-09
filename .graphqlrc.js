module.exports = {
  schema: ["./server/schema/generated/schema.graphql"],
  extensions: {
    codegen: {
      generates: {
        "./server/schema/generated/types.ts": {
          plugins: ["typescript"],
        },
      },
      hooks: {
        afterAllFileWrite: ["yarn lint"],
      },
    },
  },
};
