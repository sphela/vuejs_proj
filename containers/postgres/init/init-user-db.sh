#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER sphela;
    CREATE DATABASE sphela;
    GRANT ALL PRIVILEGES ON DATABASE sphela TO sphela;
EOSQL