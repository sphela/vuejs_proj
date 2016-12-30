FROM node:7.3

COPY ./src /www/sphela/app/src
COPY ./package.json /www/sphela/app/package.json
COPY ./yarn.lock /www/sphela/app/yarn.lock

ENV SERVER_PORT=9100
ENV STATIC_JS_ROOT=/www/sphela/app/src/js/client
ENV STATIC_CSS_ROOT=/www/sphela/app/src/css
EXPOSE 9100
WORKDIR /www/sphela/app/

RUN npm i -g yarn

RUN yarn install --production

CMD node ./src/js/server/main.js


