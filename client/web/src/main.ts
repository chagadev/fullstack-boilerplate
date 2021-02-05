import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { villus } from "./villus";
import { primeVue } from "./plugins/primevue";
import "./assets/index.css";

const app = createApp(App);

app.use(router);
app.use(villus);
app.use(primeVue);

app.mount("#app");
