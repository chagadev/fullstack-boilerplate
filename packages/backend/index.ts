import Fastify from "fastify";
import fastifyStatic from "fastify-static";
import mercurius from "mercurius";
import { config } from "@packages/config";

export const app = Fastify();

const schema = `
type Query {
  hello: String!
}
`;

const resolvers = {
  Query: {
    hello: () => `Hello World !`,
  },
};

// Mercurius GraphQL server
app.register(mercurius, {
  schema,
  resolvers,
  graphiql: config.mode === "development" && "playground",
});

// Serve frontend static files in production
if (config.mode === "production") {
  app.register(fastifyStatic, { root: `${config.paths.root}/dist/public` });
}
