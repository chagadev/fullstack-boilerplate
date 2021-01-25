import { extendType, objectType } from "nexus";
import { hasRole } from "@server/schema/rules";
import { Role } from "@server/schema/generated/types";

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
    t.crud.user({ shield: hasRole(Role.Editor)() });
    t.crud.users({ shield: hasRole(Role.Editor)() });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneUser({ shield: hasRole(Role.Editor)() });
    t.crud.deleteOneUser({ shield: hasRole(Role.Editor)() });
    t.crud.updateOneUser({ shield: hasRole(Role.Editor)() });
  },
});
