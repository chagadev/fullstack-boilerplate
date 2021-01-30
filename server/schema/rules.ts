import { generic, ruleType, ShieldCache } from "nexus-shield";
import { Role } from "@prisma/client";

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
        return [role, Role.ADMIN].includes(request.user?.role);
      },
    }),
  );
};
