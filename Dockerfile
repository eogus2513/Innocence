FROM node:17-alpine

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

CMD ["yarn", "start:prod"]

#--platform linux/amd64 (실리콘 맥 전용)