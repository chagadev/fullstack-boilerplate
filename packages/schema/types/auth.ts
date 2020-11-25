import { extendType, nonNull, objectType, stringArg } from "@nexus/schema";
import { encryptPassword, getTokenFromUser, verifyPassword } from "@packages/auth";

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
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_root, { email, password }, { prisma }) => {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user && verifyPassword(password, user.password)) {
          return {
            token: getTokenFromUser(user),
          };
        }
        return null;
      },
    });

    t.field("signup", {
      type: AuthPayload,
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_root, { email, password }, { prisma }) => {
        const userExists = await prisma.user.count({ where: { email } });
        if (userExists) {
          return null;
        }

        const user = await prisma.user.create({ data: { email, password: encryptPassword(password) } });
        if (user) {
          return {
            token: getTokenFromUser(user),
          };
        }

        return null;
      },
    });
  },
});
