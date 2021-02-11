import { extendType, nonNull, stringArg, subscriptionField } from "nexus";

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
      args: {
        message: stringArg({ default: "Pong!" }),
      },
      resolve: (_root, { message }, { pubsub }) => {
        pubsub.publish({
          topic: "ping",
          payload: message,
        });
        return message;
      },
    });
  },
});

export const PingSubscription = subscriptionField("ping", {
  type: "String",
  subscribe: async (_root, _args, { pubsub }) => await pubsub.subscribe("ping"),
  resolve: (payload) => payload as string,
});
