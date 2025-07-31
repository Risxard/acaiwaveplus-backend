# Etapa 1 - build
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Etapa 2 - produção
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY firebase-admin-sdk.json ./
COPY .env ./

CMD ["node", "dist/server.js"]
