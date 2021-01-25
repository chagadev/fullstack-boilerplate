import { createClient, handleSubscriptions, cache, dedup } from "villus";
import { multipart } from "@villus/multipart";
import { batch } from "@villus/batch";
import { SubscriptionClient } from "subscriptions-transport-ws";

const subscriptionClient = new SubscriptionClient(`ws://${window.location.host}/api/graphql`, {
  reconnect: true,
});

export const villus = createClient({
  url: "/api/graphql",
  use: [
    handleSubscriptions((operation) => subscriptionClient.request(operation)),
    multipart(),
    cache(),
    dedup(),
    batch(),
  ],
});
