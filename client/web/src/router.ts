import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/index.vue";
import Login from "./pages/login.vue";
import NotFound from "./pages/[...all].vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
