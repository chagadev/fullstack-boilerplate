<template>
  <img src="../assets/logo.png" alt="Vue logo" class="inline-block" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <router-link to="/login">
    <Button label="Login" />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { onLogout } from "../composables/use-local-auth";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
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
