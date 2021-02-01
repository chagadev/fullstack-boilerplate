#!/usr/bin/env bash
set -e

# Deploy Prisma migration
/app/server/prisma/node_modules/.bin/prisma migrate deploy --schema /app/server/prisma/schema.prisma --preview-feature

# Seed database
node /app/dist/server/prisma/seed.js

exec "$@"
