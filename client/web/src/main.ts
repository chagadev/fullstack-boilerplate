import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { villus } from "./villus";
import "./assets/index.css";

const app = createApp(App);
app.use(router);
app.use(villus);
app.mount("#app");
