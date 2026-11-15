FROM node:20-bullseye-slim AS builder
WORKDIR /app

# Install deps
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --progress=false

# Copy source and build
COPY . .
RUN npm run build

FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what's needed to run
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install production deps
RUN npm ci --omit=dev --production --no-audit --progress=false

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "start"]
