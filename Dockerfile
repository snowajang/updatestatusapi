
FROM node:22-alpine3.18

ENV http_proxy=http://172.16.82.3:3128
ENV https_proxy=http://172.16.82.3:3128
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]