import "./paths";
import { config } from "@packages/config";
import { app } from "@packages/backend";
import { logger } from "@packages/logger";

app.listen(config.server.port, () => {
  logger.info(
    `🚀 http://${config.server.host}:${config.server.port} (${config.mode})`,
  );
});
