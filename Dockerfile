# ----------------------------------------------------
# 1. BUILD STAGE
# ----------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

ENV DATABASE_URL="postgresql://postgres:1402@postgres:5432/nyver_lms?schema=public"

# Install openssl for Prisma
RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Install all dependencies without trigger scripts
RUN npm install --ignore-scripts

COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src/

# Generate prisma client & build
RUN npx prisma generate
RUN npm run build

# Remove development dependencies, keep production and prisma
RUN npm prune --production

# ----------------------------------------------------
# 2. PRODUCTION RUNNER STAGE
# ----------------------------------------------------
FROM node:22-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl tini

ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Copy pre-built production node_modules and dist directly from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Create uploads directory for persistent storage
RUN mkdir -p uploads && chown -R node:node /app

USER node

EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["sh", "-c", "npx prisma db push --skip-generate && node dist/main.js"]
