import { ref } from "vue";

export const currentUser = ref(null);

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
  return (currentUser.value = user);
}
