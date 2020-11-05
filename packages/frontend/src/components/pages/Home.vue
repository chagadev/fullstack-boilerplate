<template>
  <HelloWorld />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "/@/components/ui/HelloWorld.vue";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
});
</script>
