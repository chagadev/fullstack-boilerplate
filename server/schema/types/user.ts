import { extendType, objectType } from "nexus";
import { hasRole } from "@server/schema/rules";
import { Role } from "@prisma/client";

export const UserObject = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.role();
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.user({ shield: hasRole(Role.EDITOR)() });
    t.crud.users({ shield: hasRole(Role.EDITOR)() });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneUser({ shield: hasRole(Role.EDITOR)() });
    t.crud.deleteOneUser({ shield: hasRole(Role.EDITOR)() });
    t.crud.updateOneUser({ shield: hasRole(Role.EDITOR)() });
  },
});
