#!/usr/bin/env bash

cat ./deploy/dev-app.yaml | sed "s#APP_VERSION#$APP_VERSION#" > ./deploy/dev-app-build.yaml
cat ./deploy/prod-app.yaml | sed "s#APP_VERSION#$APP_VERSION#" > ./deploy/prod-app-build.yaml
./scripts/build-app.sh
