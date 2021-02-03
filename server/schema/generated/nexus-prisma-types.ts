import * as Typegen from "nexus-plugin-prisma/typegen";
import * as Prisma from "@prisma/client";

// Pagination type
type Pagination = {
  first?: boolean;
  last?: boolean;
  before?: boolean;
  after?: boolean;
};

// Prisma custom scalar names
type CustomScalars = "No custom scalars are used in your Prisma Schema.";

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User;
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: "AND" | "OR" | "NOT" | "id" | "email" | "password" | "role";
      ordering: "id" | "email" | "password" | "role";
    };
  };
  User: {};
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: "User";
    users: "User";
  };
  Mutation: {
    createOneUser: "User";
    updateOneUser: "User";
    updateManyUser: "AffectedRowsOutput";
    deleteOneUser: "User";
    deleteManyUser: "AffectedRowsOutput";
    upsertOneUser: "User";
  };
  User: {
    id: "Int";
    email: "String";
    password: "String";
    role: "UserRole";
  };
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<"User">;
  Query: Typegen.NexusPrismaFields<"Query">;
  Mutation: Typegen.NexusPrismaFields<"Mutation">;
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs;
  outputs: NexusPrismaOutputs;
  methods: NexusPrismaMethods;
  models: PrismaModels;
  pagination: Pagination;
  scalars: CustomScalars;
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<TypeName extends string, ModelOrCrud extends "model" | "crud"> = Typegen.GetNexusPrisma<
    TypeName,
    ModelOrCrud
  >;
}
