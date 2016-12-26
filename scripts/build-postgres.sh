#!/usr/bin/env bash

CURRENT_VERSION=2

cd ./containers/postgres
docker build --no-cache -t gcr.io/$PROJECT_ID/sphela-postgres:v$CURRENT_VERSION .
gcloud docker -- push gcr.io/$PROJECT_ID/sphela-postgres:v$CURRENT_VERSION
