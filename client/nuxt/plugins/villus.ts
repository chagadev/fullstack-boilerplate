import { onGlobalSetup } from "@nuxtjs/composition-api";
import { useClient, cache, dedup, handleSubscriptions } from "villus";
import { batch } from "@villus/batch";
import { multipart } from "@villus/multipart";
import { SubscriptionClient } from "graphql-subscriptions-client";
import fetch from "cross-fetch";

export default () => {
  onGlobalSetup(() => {
    const plugins = [];
    if (process.client) {
      const subscriptionClient = new SubscriptionClient(`ws://localhost:4000/api/graphql`, {
        reconnect: false,
      });
      // @ts-expect-error: Villus has more complex operation types than graphql-subscriptions-client
      plugins.push(handleSubscriptions((operation) => subscriptionClient.request(operation)));
    }

    plugins.push(...[multipart(), cache(), dedup(), batch({ fetch })]);
    useClient({
      url: "/api/graphql",
      use: plugins,
    });
  });
};
