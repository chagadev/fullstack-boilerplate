import { generic, ruleType, ShieldCache } from "nexus-shield";
import { UserRole } from "@server/prisma";

export const isAuthenticated = generic(
  ruleType({
    cache: ShieldCache.CONTEXTUAL,
    resolve: (_root, _args, { request }) => {
      return !!request.user;
    },
  }),
);

export const hasUserRole = (role: UserRole) => {
  return generic(
    ruleType({
      cache: ShieldCache.CONTEXTUAL,
      resolve: (_root, _args, { request }) => {
        return [role, UserRole.ADMIN].includes(request.user?.role);
      },
    }),
  );
};
