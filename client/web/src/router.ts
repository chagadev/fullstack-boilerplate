import { createRouter, createWebHistory } from "vue-router";
import { currentUser } from "./composables/use-local-auth";

import Home from "./pages/index.vue";
import Login from "./pages/login.vue";
import AdminHome from "./pages/admin/index.vue";
import NotFound from "./pages/[...all].vue";

declare module "vue-router" {
  interface RouteMeta {
    layout?: string;
    isAnonymous?: boolean;
    isAuthenticated?: boolean;
  }
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home, meta: { layout: "admin" } },
    { path: "/login", component: Login, meta: { layout: "empty", isAnonymous: true } },
    { path: "/admin/:pathMatch(.*)*", component: AdminHome, meta: { layout: "admin", isAuthenticated: true } },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ],
});

// Navigation guards
router.beforeEach((to, from) => {
  if (to.meta.isAnonymous && currentUser.value) {
    return from.fullPath;
  }
  if (to.meta.isAuthenticated && !currentUser.value) {
    return `/login?redirect=${to.path}`;
  }
  return true;
});
