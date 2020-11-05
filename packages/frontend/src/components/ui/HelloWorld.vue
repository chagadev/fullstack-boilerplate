<template>
  <h1 v-if="data">{{ data.hello }}</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery } from "villus";

export default defineComponent({
  name: "HelloWorld",
  setup() {
    const { data } = useQuery({
      query: `{ hello }`,
    });
    return {
      data,
    };
  },
});
</script>
