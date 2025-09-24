
FROM node:18-alpine


WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


RUN npm run build

EXPOSE 7475


CMD ["node", "dist/server.js"]
