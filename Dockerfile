# Build stage
FROM node:18-alpine as Builder

# Install OS dependencies and node-prune script
RUN apk update &&\
    apk add --no-cache curl &&\
    curl -sf https://gobinaries.com/tj/node-prune | sh &&\
    curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /workspace
COPY . .

# Install app dependencies, clean up
RUN pnpm install &&\
    pnpm run build

# Clean up node_modules
RUN node-prune

# Production stage
FROM node:18-alpine as Production
ENV NODE_ENV=production

# Create app directory and set user and group to node
RUN mkdir -p /app &&\
    chown -R node:node /app

WORKDIR /app
USER node

COPY --from=Builder --chown=node:node ./workspace/node_modules ./node_modules
COPY --from=Builder --chown=node:node ./workspace/dist .

CMD [ "node", "/app/main.js" ]
