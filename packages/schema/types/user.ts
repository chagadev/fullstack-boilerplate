import { extendType, objectType } from "@nexus/schema";
import { isAuthenticated } from "../rules";

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.email();
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.user({ shield: isAuthenticated() });
    t.crud.users({ shield: isAuthenticated() });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.deleteOneUser({ shield: isAuthenticated() });
  },
});
