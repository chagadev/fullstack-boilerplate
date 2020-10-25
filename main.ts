import "./paths";
import { config } from "@packages/config";
import { app } from "@packages/backend";

app.listen(config.server.port, () => {
  console.log(
    `🚀 http://${config.server.host}:${config.server.port} (${config.env})`,
  );
});
