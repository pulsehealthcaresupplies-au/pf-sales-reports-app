# =============================================================================
# Next.js production Dockerfile (standalone output)
# =============================================================================
# Build order: deps -> builder -> runner. Before production deploy run:
#   make verify-before-deploy   (from repo root) or
#   ./scripts/03-deployment/production-build-test.sh --verify --docker
#
# NEXT_PUBLIC_* are inlined at build time (nextjs.org/docs/app/configuring/environment-variables).
# Pass build args when building, e.g.: docker build --build-arg NEXT_PUBLIC_API_URL=https://api.example.com ...
# =============================================================================

# Next.js 16 requires Node >= 20.9.0 (see package.json / next)
FROM node:20-alpine AS base

# Stage 1: deps - install dependencies only (no source; better layer caching)
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
COPY .npmrc ./
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else npm install --legacy-peer-deps; fi

# Stage 2: builder - copy source, set NEXT_PUBLIC_*, run next build (produces .next/standalone)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Optional build-time args for NEXT_PUBLIC_* (client bundle). Set via docker build --build-arg or compose build.args.
# These are baked into the client bundle at build time and cannot be changed at runtime.
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT
ARG NEXT_PUBLIC_WS_ENDPOINT
ARG NEXT_PUBLIC_APP_URL
# Required at build time to avoid "Failed to find Server Action 'x'" in production (Next.js Server Action IDs).
# Generate once: openssl rand -base64 32. Same value must be set at runtime in ECS task definition.
ARG NEXT_SERVER_ACTIONS_ENCRYPTION_KEY

# Set build-time environment variables (these are baked into the bundle)
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:8000}
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT=${NEXT_PUBLIC_GRAPHQL_ENDPOINT:-http://localhost:8000/graphql/sales-reports}
ENV NEXT_PUBLIC_WS_ENDPOINT=${NEXT_PUBLIC_WS_ENDPOINT:-ws://localhost:8000/graphql}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL:-http://localhost:3004}
ENV NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=${NEXT_SERVER_ACTIONS_ENCRYPTION_KEY:-}

# Use simplified config for Docker builds
RUN cp next.config.docker.js next.config.js || true

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_ENV_VALIDATION=1
# Next.js 16 defaults to Turbopack; we have webpack config in next.config.docker.js
RUN npm run prebuild && npx next build --webpack || npx next build --webpack

# Stage 3: runner - minimal production image (standalone + public + static only; no full node_modules)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3004

ENV PORT=3004
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
