import { createRouter, createWebHistory } from "vue-router";
import routes from "voie-pages";

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
