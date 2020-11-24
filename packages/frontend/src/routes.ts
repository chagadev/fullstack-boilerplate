import { RouteRecordRaw } from "vue-router";
import Home from "/@/components/pages/Home.vue";
import Login from "/@/components/pages/Login.vue";
import NotFound from "/@/components/pages/NotFound.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
    meta: { title: "Home" },
  },
  {
    path: "/login",
    component: Login,
    meta: { title: "Login" },
  },
  {
    path: "/:path(.*)",
    component: NotFound,
    meta: { title: "Page not found" },
  },
];
