import config from "./client/nuxt/nuxt.config";

delete config.buildDir;
config.srcDir = "./client/nuxt";

export default config;
