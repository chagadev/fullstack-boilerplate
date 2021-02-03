<template>
  <div class="container text-center">
    <img src="../assets/logo.png" alt="Vue logo" class="inline-block" />
    <HelloWorld msg="Hello Vue 3 + Vite" />
    <div class="my-8">
      <router-link to="/login" class="inline-block button">Login</router-link>
      <button class="button" @click="onLogout">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { onLogout } from "../composables/use-local-auth";

export default defineComponent({
  setup() {
    return { onLogout };
  },
});
</script>

<style scoped>
.button {
  @apply py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
}
</style>
