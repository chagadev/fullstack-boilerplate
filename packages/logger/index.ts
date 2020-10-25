import { createLogger, format, transports } from "winston";
import { config } from "@packages/config";

export const logger = createLogger({
  level: config.logger.level,
  format: format.simple(),
  transports: [new transports.Console()],
});
