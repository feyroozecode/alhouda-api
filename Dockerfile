# Docker Configuration
FROM node:21-alpine

WORKDIR /

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3033

CMD npm run dev