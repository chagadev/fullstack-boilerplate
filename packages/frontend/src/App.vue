<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVillus } from "/@/composables/use-villus";
import DefaultLayout from "/@/components/layouts/Default.vue";

export default defineComponent({
  name: "App",
  components: {
    DefaultLayout,
  },
  setup() {
    useVillus();
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    },
  },
});
</script>
