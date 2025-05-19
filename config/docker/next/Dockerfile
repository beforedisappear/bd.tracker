FROM node:22-slim AS base

ARG PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOME=/app
WORKDIR /app

# Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl

FROM base AS dependencies
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

COPY .env .env

COPY config/prisma ./config/prisma/
RUN npm run db:pg:generate

RUN npm run build

FROM base AS run
ENV NODE_ENV=production
ENV PORT=$PORT

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/config/prisma ./config/prisma

RUN chown -R nextjs:nodejs /app

COPY config/prisma/scripts/start.sh ./start.sh
RUN chmod +x ./start.sh

USER nextjs

EXPOSE $PORT
ENV HOSTNAME="0.0.0.0"

# Use the server.js from the standalone directory
CMD ["node", "server.js"]