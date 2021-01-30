#!/usr/bin/env bash
set -e

# TODO: Deploy Prisma migration

# Seed database
node /app/dist/server/prisma/seed.js

exec "$@"
