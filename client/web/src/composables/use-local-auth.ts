import { ref } from "vue";
import * as Cookies from "js-cookie";

export const currentUser = ref(null);
try {
  const token = Cookies.get("fullstack-boilerplate-payload");
  if (token) {
    const user = JSON.parse(atob(token.split(".")[1]));
    delete user.iat;
    currentUser.value = user;
  }
} catch (error) {}

export async function onLogin({ email, password }: { email: string; password: string }) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ email, password }),
  });
  const { user } = await response.json();
  return (currentUser.value = user);
}

export async function onLogout() {
  const response = await fetch("/api/auth/logout", {
    credentials: "same-origin",
    redirect: "follow",
  });
  const { user } = await response.json();
  window.localStorage.clear();
  return (currentUser.value = user);
}
