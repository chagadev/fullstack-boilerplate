<template>
  <DataTable v-if="data" ref="dt" v-model:selection="selected" data-key="id" :value="data.users">
    <Column selection-mode="multiple" header-style="width: 3em"></Column>
    <Column field="id" header="ID"></Column>
    <Column field="email" header="Email"></Column>
    <Column field="role" header="Role"></Column>
  </DataTable>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useQuery } from "villus";
import { UsersDocument as query } from "../../generated/graphql-operations";

export default defineComponent({
  setup() {
    const { data } = useQuery({ query });
    const roles = ref({
      USER: "User",
      EDITOR: "Editor",
      ADMIN: "Administrator",
    });
    const selected = ref(null);
    return { data, roles, selected };
  },
});
</script>
