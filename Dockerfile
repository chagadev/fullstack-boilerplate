### BASE ###
FROM node:14-buster-slim as base

RUN apt-get update && apt-get install --no-install-recommends --yes openssl

WORKDIR /app

# Copy all package.json files
COPY *.json nuxt.config.js yarn.lock ./
COPY client/nuxt/*.json ./client/nuxt/
COPY client/nuxt/nuxt.config.js ./client/nuxt/
COPY providers/mailer/*.json ./providers/mailer/
COPY server/backend/*.json ./server/backend/
COPY server/config/*.json ./server/config/
COPY server/prisma/*.json ./server/prisma/
COPY server/schema/*.json ./server/schema/

### BUILDER ###
FROM base AS builder

# Install production dependencies
RUN yarn install --production --pure-lockfile
RUN cp -RL ./node_modules/ /tmp/node_modules/

# Install all dependencies
RUN yarn install --pure-lockfile

# Copy source files
COPY .gitignore *.js *.ts  ./
COPY client/ ./client/
COPY providers/ ./providers/
COPY server/ ./server/

# Build
RUN yarn build

### RUNNER ###
FROM base

ENV NODE_ENV production

# Copy runtime dependencies
COPY --from=builder /tmp/node_modules/ ./node_modules/
COPY --from=builder /app/node_modules/.prisma/client/ ./node_modules/.prisma/client/
COPY --from=builder /app/server/prisma/ ./server/prisma/
COPY --from=builder /app/.nuxt/ ./.nuxt/
COPY --from=builder /app/dist/ ./dist/
COPY ./docker-entrypoint.sh /

USER node

EXPOSE 4000

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["node", "./dist/main.js"]
