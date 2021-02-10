import "./paths";
import { app } from "@server/backend";
import { config } from "@providers/config";

async function listen() {
  await app.listen({ port: config.backend.port, host: config.backend.host });
  console.log(`🚀 http://${config.backend.host}:${config.backend.port}`);
}

listen();

process.on("SIGTERM", () => process.exit());
