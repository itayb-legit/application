FROM node:16
WORKDIR /usr/src/app
COPY . .
EXPOSE 8125
CMD [ "node", "app.js" ]