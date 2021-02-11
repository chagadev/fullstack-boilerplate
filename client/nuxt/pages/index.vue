<template>
  <div id="home">
    <h1 class="text-3xl">Home</h1>
    <div v-if="messages">
      {{ messages }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@nuxtjs/composition-api";
import { useSubscription } from "villus";

export default defineComponent({
  setup() {
    const { data } = useSubscription({ query: `subscription { ping }` });
    let messages = ref<string[]>([]);
    watch(data, (incoming) => {
      messages.value.push(incoming.ping);
    });
    return { messages };
  },
});
</script>
