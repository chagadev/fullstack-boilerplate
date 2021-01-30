import { createClient, handleSubscriptions, cache, dedup } from "villus";
import { multipart } from "@villus/multipart";
import { batch } from "@villus/batch";
import { SubscriptionClient } from "graphql-subscriptions-client";

const ws = window.location.protocol.replace("http", "ws");
const subscriptionClient = new SubscriptionClient(`${ws}//${window.location.host}/api/graphql`, {
  reconnect: true,
});

export const villus = createClient({
  url: "/api/graphql",
  use: [
    // @ts-expect-error: Villus has more complex operation types than graphql-subscriptions-client
    handleSubscriptions((operation) => subscriptionClient.request(operation)),
    multipart(),
    cache(),
    dedup(),
    batch(),
  ],
});
