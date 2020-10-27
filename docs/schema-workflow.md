# Schema Workflow

The schema is defined at the database level (Prisma data model) and at the application level (GraphQL Nexus schema).
This separation allows for better control over what is stored in the database vs what is exposed to the frontend via the GraphQL endpoint.

## Working at the database level

The database tables and columns, which correspond to the [Prisma data model](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-model/), are defined inside `packages/prisma/scheme.prisma` using the [Prisma Schema API](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/prisma-schema-reference).

A default data model is provided with a basic `User` model for authentication purposes.

Let's add the `Post` model:
```
model Post {
  id    Int    @id @default(autoincrement())
  title String
}
```

After modifying `schema.prisma`, we need to migrate the database and re-generate the Prisma Client:
```
# Save the migration to packages/prisma/migrations
yarn migrate save

# Execute the migration against the database
yarn migrate up

# Re-generate the Prisma Client
yarn build:prisma
```

At this point, we can start exploring the database with [Prisma Studio](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-studio):
```
yarn studio
```

## Working at the application level

The GraphQL types, queries, mutations and subscriptions exposed to the frontend are defined inside `packages/schema/types/` using [GraphQL Nexus](https://nexusjs.org/) in a declarative, code-first approach.

Projecting types from the Prisma data model onto GraphQL is done using the [Nexus Prisma plugin](https://nexusjs.org/docs/pluginss/prisma/overview) along with [Nexus Shield](https://github.com/Sytten/nexus-shield) as an authorization layer.

In order to enjoy type-safety and autocompletion for the type declarations, we have to make sure the generated types are up to date:
```
yarn build:nexus
```

Let's add the `Post` types, queries and mutations from our previous example.

After updating the Nexus Prisma types with `yarn build:nexus`, we start by adding the object type in `packages/schema/types/post.ts`:
```
import { objectType } from "@nexus/schema";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.model.id();
    t.model.title();
  },
});
```

We also need to export it from `packages/schema/types/index.ts`:
```
export * from "./post";
```

Before defining the CRUD operations as queries and mutations, we need to update the Nexus types once again with `yarn build:nexus` to propagate the new `Post` type definition.

Let's now add the queries and mutations below the object type:
```
export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.post();
    t.crud.posts();
  },
});

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOnePost({ shield: isAuthenticated() });
    t.crud.deleteOnePost({ shield: isAuthenticated() });
    // ...
  },
});
```

We can now rebuild the whole application to generate the new frontend types and operations:
```
yarn build
```

The generated `PostDocument` / `PostsDocument` are now ready to be used in `packages/frontend` !
