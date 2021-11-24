FROM node:15.8.0-alpine3.10

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

CMD ["yarn", "run", "start"]