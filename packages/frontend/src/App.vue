<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useClient } from "villus";

export default defineComponent({
  name: "App",
  setup() {
    // Villus GraphQL client
    useClient({
      url: "/graphql",
    });
  },
});
</script>
