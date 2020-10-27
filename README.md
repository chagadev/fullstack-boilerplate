# Fullstack Boilerplate

Fullstack application boilerplate (Fastify / Mercurius / Nexus / Prisma / Vue 3).

# Getting started

Configure the database URL in `packages/prisma/.env`

```
// Postgres
DATABASE_URL=postgres://username:password@localhost:5432/database

// MySQL
DATABASE_URL=mysql://username:password@localhost:3306/database
```

Install dependencies, migrate database up and seed initial data

```
yarn install
yarn migrate up
yarn seed
```

Prisma Studio can be used to browse the models and data

```
yarn studio
```

When starting in development mode, the application is served by Vite on `http://localhost:3000` with a proxy to the backend and GraphQL Playground at `/playground`

```
yarn dev
```

When starting in production, the built application is served statically by the backend on `http://localhost:4000`

```
yarn build
yarn start
```

# Documentation

- [Schema Workflow](./docs/schema-workflow.md)
