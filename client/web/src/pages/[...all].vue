<template>
  <div class="container text-center">
    <h1 class="text-4xl">Page not found</h1>
    <router-link to="/">Return home</router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFound",
});
</script>
