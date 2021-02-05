<template>
  <div class="container text-center">
    <img src="../assets/logo.png" alt="Vue logo" class="inline-block" />
    <HelloWorld msg="Hello Vue 3 + Vite" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { onLogout } from "../composables/use-local-auth";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    async function onLogoutSubmit() {
      await onLogout();
      router.push("/");
    }
    return { onLogout };
  },
});
</script>
