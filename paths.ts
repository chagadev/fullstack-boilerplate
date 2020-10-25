// Monorepo paths resolution
import moduleAlias from "module-alias";
import { join } from "path";
moduleAlias.addAliases({ "@packages": join(__dirname, "packages") });
