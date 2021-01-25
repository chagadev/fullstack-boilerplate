import { extendType, nonNull, subscriptionField } from "nexus";

export const HelloQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("hello", {
      type: nonNull("String"),
      resolve: () => `Hello World`,
    });
  },
});

export const PingMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("ping", {
      type: "String",
      resolve: (_root, _args, { pubsub }) => {
        pubsub.publish({
          topic: "ping",
          payload: "pong",
        });
        return "pong";
      },
    });
  },
});

export const PingSubscription = subscriptionField("ping", {
  type: "String",
  subscribe: async (_root, _args, { pubsub }) => await pubsub.subscribe("ping"),
  resolve: (payload) => payload as string,
});
