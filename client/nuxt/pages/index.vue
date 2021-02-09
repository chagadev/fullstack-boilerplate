<template>
  <div id="home">
    <h1 class="text-3xl">Home</h1>
    <div v-if="isFetching">Loading...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else-if="data">{{ data.hello }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { useQuery } from "villus";

export default defineComponent({
  setup() {
    const { data, error, isFetching } = useQuery({
      query: `{ hello }`,
    });
    return { data, error, isFetching };
  },
});
</script>
