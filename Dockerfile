### BASE ###
FROM node:14-buster-slim as base

RUN apt-get update && apt-get install --no-install-recommends --yes openssl

WORKDIR /app

### BUILDER ###
FROM base AS builder

# Install production dependencies
COPY *.json yarn.lock ./
COPY client/web/*.json ./client/web/
COPY server/backend/*.json ./server/backend/
COPY server/config/*.json ./server/config/
COPY server/prisma/*.json ./server/prisma/
COPY server/schema/*.json ./server/schema/

RUN yarn install --production --pure-lockfile
RUN cp -RL ./node_modules/ /tmp/node_modules/

# Install all dependencies
RUN yarn install --pure-lockfile

# Copy source files
COPY .gitignore *.js *.ts  ./
COPY client/ ./client/
COPY server/ ./server/

# Build
RUN yarn build

### RUNNER ###
FROM base

ENV NODE_ENV production

# Copy runtime dependencies
COPY --from=builder /tmp/node_modules/ ./node_modules/
COPY --from=builder /app/node_modules/.prisma/ ./node_modules/.prisma/
COPY --from=builder /app/dist/ ./dist/
COPY ./docker-entrypoint.sh /

USER node

EXPOSE 4000

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["node", "./dist/main.js"]
