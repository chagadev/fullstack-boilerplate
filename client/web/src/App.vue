<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

import DefaultLayout from "./layouts/default.vue";
import EmptyLayout from "./layouts/empty.vue";

export default defineComponent({
  name: "App",
  components: {
    "default-layout": DefaultLayout,
    "empty-layout": EmptyLayout,
  },
  setup() {
    const route = useRoute();
    const layout = computed(() => `${route.meta.layout || "default"}-layout`);
    return { layout };
  },
});
</script>
