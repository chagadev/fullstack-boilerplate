import { App } from "vue";
// @ts-expect-error See https://github.com/primefaces/primevue/issues/581
import PrimeVue from "primevue/config";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";

export const primeVue = {
  install: (app: App) => {
    app.use(PrimeVue);
    app.component("Button", Button);
    app.component("Column", Column);
    app.component("DataTable", DataTable);
    app.component("InputText", InputText);
  },
};
