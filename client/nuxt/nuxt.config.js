export default {
  buildDir: "../../.nuxt",
  buildModules: ["@nuxtjs/composition-api", "@nuxt/typescript-build", "@nuxtjs/tailwindcss"],
  css: ["@braid/vue-formulate/dist/snow.css"],
  plugins: ["~/plugins/vue-formulate.ts", "~/plugins/villus.ts"],
};
