import moduleAlias from "module-alias";
import { resolve } from "path";
moduleAlias.addAliases({ "@client": resolve(__dirname, "../client") });
moduleAlias.addAliases({ "@server": __dirname });
