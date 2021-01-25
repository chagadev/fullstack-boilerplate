import { generic, ruleType, ShieldCache } from "nexus-shield";
import { Role } from "@server/schema/generated/types";

export const isAuthenticated = generic(
  ruleType({
    cache: ShieldCache.CONTEXTUAL,
    resolve: (_root, _args, { request }) => {
      return !!request.user;
    },
  }),
);

export const hasRole = (role: Role) => {
  return generic(
    ruleType({
      cache: ShieldCache.CONTEXTUAL,
      resolve: (_root, _args, { request }) => {
        return [role, Role.Admin].includes(request.user?.role);
      },
    }),
  );
};
