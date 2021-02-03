import { createClient, handleSubscriptions, dedup } from "villus";
import { multipart } from "@villus/multipart";
import { batch } from "@villus/batch";
import { SubscriptionClient } from "graphql-subscriptions-client";

// WebSocket subscriptions handler
const ws = window.location.protocol.replace("http", "ws");
const subscriptionClient = new SubscriptionClient(`${ws}//${window.location.host}/api/graphql`, {
  reconnect: true,
});

// Persistent cache in localStorage
function localStorageCache({ afterQuery, useResult, operation }) {
  if (operation.type !== "query" || operation.cachePolicy === "network-only") {
    return;
  }
  afterQuery((result) => {
    if (!result.error) {
      window.localStorage.setItem(operation.key, JSON.stringify(result));
    }
  });
  const cachedResult = window.localStorage.getItem(operation.key);
  if (cachedResult) {
    return useResult(JSON.parse(cachedResult), true);
  }
}

// Villus client
export const villus = createClient({
  url: "/api/graphql",
  use: [
    // @ts-expect-error: Villus has more complex operation types than graphql-subscriptions-client
    handleSubscriptions((operation) => subscriptionClient.request(operation)),
    multipart(),
    localStorageCache,
    dedup(),
    batch(),
  ],
});
