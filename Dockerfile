FROM node:14-alpine

WORKDIR /tby_back/app

COPY . .

RUN yarn

RUN yarn build

CMD ["yarn", "start:prod"]