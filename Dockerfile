FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY .env .env
COPY firebase-admin-sdk.json firebase-admin-sdk.json

RUN npm run build

CMD ["npm", "run", "start:prod"]
