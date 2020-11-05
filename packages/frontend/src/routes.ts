import { RouteRecordRaw } from "vue-router";
import Home from "/@/components/pages/Home.vue";
import NotFound from "/@/components/pages/NotFound.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
    meta: { title: "Home" },
  },
  {
    path: "/:path(.*)",
    component: NotFound,
    meta: { title: "Page not found" },
  },
];
