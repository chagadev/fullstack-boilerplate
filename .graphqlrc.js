module.exports = {
  schema: ["./server/schema/generated/schema.graphql"],
  documents: "./client/web/src/graphql/**/*.gql",
  extensions: {
    codegen: {
      generates: {
        "./server/schema/generated/types.ts": {
          plugins: ["typescript"],
        },
        "./client/web/src/generated/graphql-operations.ts": {
          plugins: ["typescript","typescript-operations","typed-document-node"],
        }
      },
      hooks: {
        afterAllFileWrite: ["yarn lint"],
      },
    },
  },
};
