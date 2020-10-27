import { generic, ruleType, ShieldCache } from "nexus-shield";

export const isAuthenticated = generic(
  ruleType({
    cache: ShieldCache.CONTEXTUAL,
    resolve: (_root, _args, { user }) => {
      return !!user;
    },
  }),
);
