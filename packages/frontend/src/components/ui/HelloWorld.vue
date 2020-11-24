<template>
  <h1 v-if="data">{{ data }}</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery } from "villus";
import { UserDocument } from "../../generated/graphql-operations";

export default defineComponent({
  name: "HelloWorld",
  setup() {
    // Test Auth / Nexus Shield
    const { data } = useQuery({
      query: UserDocument,
      variables: { where: { email: "admin@example.com" } },
    });
    return {
      data,
    };
  },
});
</script>
