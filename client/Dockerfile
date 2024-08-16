FROM node:20.8.1

WORKDIR /client

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev"]