FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY conf /etc/nginx

COPY build /www/sphela/app

EXPOSE 80
