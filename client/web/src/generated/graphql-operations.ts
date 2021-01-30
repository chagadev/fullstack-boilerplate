import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type EnumRoleFieldUpdateOperationsInput = {
  set?: Maybe<Role>;
};

export type Mutation = {
  __typename?: "Mutation";
  createOneUser: User;
  deleteOneUser?: Maybe<User>;
  ping?: Maybe<Scalars["String"]>;
  updateOneUser?: Maybe<User>;
};

export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};

export type MutationDeleteOneUserArgs = {
  where: UserWhereUniqueInput;
};

export type MutationUpdateOneUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  user?: Maybe<User>;
  users: Array<User>;
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryUsersArgs = {
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export enum Role {
  Admin = "ADMIN",
  Editor = "EDITOR",
  User = "USER",
}

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars["String"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  ping?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  id: Scalars["Int"];
  role: Role;
};

export type UserCreateInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  role?: Maybe<Role>;
};

export type UserUpdateInput = {
  email?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<StringFieldUpdateOperationsInput>;
  role?: Maybe<EnumRoleFieldUpdateOperationsInput>;
};

export type UserWhereUniqueInput = {
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
};

export type HelloQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: "Query" } & Pick<Query, "hello">;

export const HelloDocument: DocumentNode<HelloQuery, HelloQueryVariables> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Hello" },
      selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "hello" } }] },
    },
  ],
};
