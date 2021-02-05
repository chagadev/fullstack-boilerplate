<template>
  <DataTable v-model:selection="selected" :value="cars" data-key="vin">
    <Column selection-mode="multiple" header-style="width: 3em"></Column>
    <Column field="vin" header="Vin"></Column>
    <Column field="year" header="Year"></Column>
    <Column field="brand" header="Brand"></Column>
    <Column field="color" header="Color"></Column>
  </DataTable>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  setup() {
    const cars = reactive([
      { brand: "Volkswagen", year: 2012, color: "Orange", vin: "dsad231ff" },
      { brand: "Audi", year: 2011, color: "Black", vin: "gwregre345" },
      { brand: "Renault", year: 2005, color: "Gray", vin: "h354htr" },
      { brand: "BMW", year: 2003, color: "Blue", vin: "j6w54qgh" },
      { brand: "Mercedes", year: 1995, color: "Orange", vin: "hrtwy34" },
      { brand: "Volvo", year: 2005, color: "Black", vin: "jejtyj" },
      { brand: "Honda", year: 2012, color: "Yellow", vin: "g43gr" },
      { brand: "Jaguar", year: 2013, color: "Orange", vin: "greg34" },
      { brand: "Ford", year: 2000, color: "Black", vin: "h54hw5" },
      { brand: "Fiat", year: 2013, color: "Red", vin: "245t2s" },
    ]);
    const selected = ref(null);
    return { cars, selected };
  },
});
</script>
