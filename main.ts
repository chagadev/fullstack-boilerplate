import "./paths";
import { config } from "@packages/config";
import { app } from "@packages/backend";
import { logger } from "@packages/logger";

app.listen({ port: config.backend.port, host: config.backend.host }, () => {
  logger.info(`🚀 http://${config.backend.host}:${config.backend.port} (${config.mode})`);
});
