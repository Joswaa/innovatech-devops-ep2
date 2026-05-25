# --- ETAPA 1: Dependencias y preparación ---
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

# --- ETAPA 2: Ejecución segura ---
FROM node:18-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app /app

USER node

EXPOSE 3001

CMD ["node", "server.js"]