module.exports = {
  schema: ["./server/schema/generated/schema.graphql"],
  documents: "./client/nuxt/graphql/**/*.gql",
  extensions: {
    codegen: {
      generates: {
        "./server/schema/generated/types.ts": {
          plugins: ["typescript"],
        },
        "./client/nuxt/generated/graphql-operations.ts": {
          plugins: ["typescript","typescript-operations","typed-document-node"],
        }
      },
      hooks: {
        afterAllFileWrite: ["yarn lint"],
      },
    },
  },
};
