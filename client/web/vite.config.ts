import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import components from "vite-plugin-components";

export default defineConfig({
  build: {
    outDir: "../../dist/public",
  },
  plugins: [vue(), components()],
  server: {
    host: process.env.WEB_HOST || "localhost",
    port: parseInt(process.env.WEB_PORT) || 3000,
  },
});
