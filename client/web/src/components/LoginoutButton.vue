<template>
  <Button v-if="currentUser" type="button" label="Logout" @click="onLogoutClick"></Button>
  <router-link v-else to="/login">
    <Button label="Login" />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { currentUser, onLogout } from "../composables/use-local-auth";

export default defineComponent({
  setup() {
    const router = useRouter();
    const onLogoutClick = async () => {
      await onLogout();
      router.push("/");
    };
    return { currentUser, onLogoutClick };
  },
});
</script>
