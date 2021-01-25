<template>
  <h1 class="text-4xl">{{ msg }}</h1>
  <div v-if="isFetching">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else-if="data && data.hello">
    {{ data.hello }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useQuery } from "villus";
import { HelloDocument as query } from "../generated/graphql-operations";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const count = ref(0);
    const { data, isFetching, error } = useQuery({ query });
    return { count, data, isFetching, error };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
