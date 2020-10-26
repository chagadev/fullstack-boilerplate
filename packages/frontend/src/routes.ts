import { RouteRecordRaw } from "vue-router";
import Home from "/@/views/Home.vue";
import NotFound from "/@/views/NotFound.vue";

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Home, meta: { title: "Home" } },
  { path: "/:path(.*)", component: NotFound },
];
