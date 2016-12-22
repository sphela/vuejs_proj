FROM node:7.3

COPY ./src /www/sphela/app/src
COPY ./package.json /www/sphela/app/package.json
COPY ./yarn.lock /www/sphela/app/yarn.lock

ENV SERVER_PORT=9100
ENV STATIC_ROOT=/www/sphela/app/src/js/client
EXPOSE 9100
WORKDIR /www/sphela/app/

RUN npm i -g yarn

RUN yarn install

CMD node ./src/js/server/main.js


