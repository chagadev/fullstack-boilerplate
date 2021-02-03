import { extendType, objectType } from "nexus";
import { hasUserRole } from "@server/schema/rules";
import { UserRole } from "@prisma/client";

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
    t.crud.user({ shield: hasUserRole(UserRole.EDITOR)() });
    t.crud.users({ shield: hasUserRole(UserRole.EDITOR)() });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneUser({ shield: hasUserRole(UserRole.EDITOR)() });
    t.crud.deleteOneUser({ shield: hasUserRole(UserRole.EDITOR)() });
    t.crud.updateOneUser({ shield: hasUserRole(UserRole.EDITOR)() });
  },
});
