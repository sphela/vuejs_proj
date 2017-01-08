#!/usr/bin/env bash

CURRENT_VERSION=29

cd ./containers/nginx
docker build --no-cache -t gcr.io/$PROJECT_ID/sphela-nginx:v$CURRENT_VERSION .
gcloud docker -- push gcr.io/$PROJECT_ID/sphela-nginx:v$CURRENT_VERSION
