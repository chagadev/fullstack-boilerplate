import "./paths";
import { config } from "@packages/config";

console.log(
  `🚀 http://${config.server.host}:${config.server.port} (${config.env})`,
);
