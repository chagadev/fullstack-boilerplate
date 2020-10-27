import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import "./assets/main.css";

// Create Vue application
const app = createApp(App);

// Initialize Vue-Router
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
app.use(router);

// Mount Vue application
app.mount("#app");
