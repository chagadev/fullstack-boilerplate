import { RouteRecordRaw } from "vue-router";
import Home from "/@/components/pages/Home.vue";
import Login from "/@/components/pages/Login.vue";
import Signup from "/@/components/pages/Signup.vue";
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
    path: "/signup",
    component: Signup,
    meta: { title: "Sign Up" },
  },
  {
    path: "/:path(.*)",
    component: NotFound,
    meta: { title: "Page not found" },
  },
];
