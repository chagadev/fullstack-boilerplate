import { extendType, objectType } from "@nexus/schema";

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
    t.crud.user();
    t.crud.users();
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.deleteOneUser();
  },
});
