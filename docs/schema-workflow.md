# Schema Workflow

The schema is defined at the database level (Prisma data model) and at the application level (GraphQL Nexus schema).
This separation allows for better control over what is stored in the database vs what is exposed to the frontend via the GraphQL endpoint.

## Working at the database level

The database tables and columns, which correspond to the [Prisma data model](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-model/), are defined inside `server/prisma/scheme.prisma` using the [Prisma Schema API](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/prisma-schema-reference).

A default data model is provided with a basic `User` model for authentication purposes.

## Working at the application level

The GraphQL types, queries, mutations and subscriptions exposed to the frontend are defined inside `server/schema/types/` using [GraphQL Nexus](https://nexusjs.org/) in a declarative, code-first approach.

Projecting types from the Prisma data model onto GraphQL is done using the [Nexus Prisma plugin](https://nexusjs.org/docs/pluginss/prisma/overview) along with [Nexus Shield](https://github.com/Sytten/nexus-shield) as an authorization layer.
