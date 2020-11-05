import { extendType, objectType, stringArg } from "@nexus/schema";
import { getTokenFromUser, verifyPassword } from "@packages/auth";

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("token");
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("login", {
      type: "AuthPayload",
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: async (_root, { email, password }, { prisma }) => {
        const user = await prisma.user.findOne({ where: { email } });
        if (user && verifyPassword(password, user.password)) {
          return {
            token: getTokenFromUser(user),
          };
        }
        return null;
      },
    });
  },
});
