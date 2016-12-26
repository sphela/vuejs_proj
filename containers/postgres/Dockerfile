FROM postgres:alpine

ENV POSTGRES_USER postgres
ENV PGDATA /var/lib/postgresql/data/pgdata

COPY init /docker-entrypoint-initdb.d


