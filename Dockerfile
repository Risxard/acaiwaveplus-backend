
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY dist ./dist

COPY .env .env

EXPOSE 7475

CMD ["node", "dist/server.js"]
