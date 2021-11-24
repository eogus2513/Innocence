FROM node:15.8.0-alpine3.10

WORKDIR /root

COPY . .

EXPOSE 3000

CMD ["yarn" ,"node", "./dist/main.js"]