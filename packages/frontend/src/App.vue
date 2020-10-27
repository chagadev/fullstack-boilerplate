<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useClient, handleSubscriptions, defaultPlugins } from "villus";
import ws from "subscriptions-transport-ws";

declare const wsEndpoint: string;

export default defineComponent({
  name: "App",
  setup() {
    // Villus GraphQL client
    const subscriptionClient = new ws.SubscriptionClient(wsEndpoint, {});
    const subscriptionForwarder = (operation) => subscriptionClient.request(operation);
    useClient({
      url: "/graphql",
      use: [handleSubscriptions(subscriptionForwarder), ...defaultPlugins()],
    });
  },
});
</script>
