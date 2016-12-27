#!/usr/bin/env bash

./scripts/use-dev.sh
kubectl create -f ./deploy/dev-persistent-volume.yaml
kubectl create -f ./deploy/dev-app-service.yaml
./scripts/create-shared.sh
kubectl create -f ./deploy/dev-expose-postgres.yaml
kubectl create -f ./deploy/dev-app.yaml
