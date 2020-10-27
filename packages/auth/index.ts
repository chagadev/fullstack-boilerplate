import { config } from "@packages/config";
import { compareSync, hashSync } from "bcryptjs";
import { verify, sign } from "jsonwebtoken";
import { User } from "@packages/schema/generated/types";

export function getUserFromToken(token: string): User | null {
  try {
    return verify(token, config.auth.tokenSecret) as User;
  } catch (error) {
    return null;
  }
}

export function getTokenFromUser(user: User): string {
  return sign(user, config.auth.tokenSecret);
}

export function verifyPassword(password: string, hash: string): boolean {
  return compareSync(password, hash);
}

export function encryptPassword(password: string): string {
  return hashSync(password);
}
