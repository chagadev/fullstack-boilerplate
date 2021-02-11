# Fullstack Boilerplate

Fullstack application boilerplate (Fastify / Mercurius / Nexus / Prisma / Nuxt).

# Getting started

Configure the database URL in `packages/prisma/.env`

```
// Postgres
DATABASE_URL=postgres://username:password@localhost:5432/database

// MySQL
DATABASE_URL=mysql://username:password@localhost:3306/database
```

Install dependencies, deploy database migration and seed initial data

```
yarn install
yarn migrate deploy
yarn seed
```

Prisma Studio can be used to browse the models and data

```
yarn studio
```

When starting in development mode, the Nuxt application is served via an HTTP proxy on `http://localhost:4000`

```
yarn dev
```

When starting in production, the Nuxt application is served by the backend on `http://localhost:4000`

```
yarn build
yarn start
```

# Documentation

- [Schema Workflow](./docs/schema-workflow.md)
