# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json nest-cli.json ./
RUN npm install --omit=dev

COPY . .
RUN npm run build:user

FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/user-svc ./dist

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
