<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useClient, handleSubscriptions, defaultPlugins } from "villus";
import ws from "subscriptions-transport-ws";
import DefaultLayout from "/@/components/layouts/Default.vue";

declare const wsEndpoint: string;

export default defineComponent({
  name: "App",
  components: {
    DefaultLayout,
  },
  setup() {
    // Villus GraphQL client
    const subscriptionClient = new ws.SubscriptionClient(wsEndpoint, {});
    const subscriptionForwarder = (operation) => subscriptionClient.request(operation);
    useClient({
      url: "/graphql",
      use: [handleSubscriptions(subscriptionForwarder), ...defaultPlugins()],
    });
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    },
  },
});
</script>
