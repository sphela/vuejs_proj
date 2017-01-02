#!/usr/bin/env bash

./scripts/deploy-static.sh

cd ./containers/app

# Any kind of argument builds with no cache.
if [[ -z $1 ]]
then
  echo "building from cache."
  docker build -t gcr.io/$PROJECT_ID/sphela-app:v$APP_VERSION .
else
  echo "building with no cache."
  docker build --no-cache -t gcr.io/$PROJECT_ID/sphela-app:v$APP_VERSION .
fi
gcloud docker -- push gcr.io/$PROJECT_ID/sphela-app:v$APP_VERSION

cd -
