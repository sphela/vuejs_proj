#!/usr/bin/env bash

./scripts/use-dev.sh
kubectl create -f ./deploy/dev-persistent-volume.yaml
kubectl create -f ./deploy/dev-app-service.yaml
kubectl create -f ./deploy/dev-nginx.yaml
kubectl create -f ./deploy/dev-postgres.yaml
kubectl create -f ./deploy/dev-expose-postgres.yaml
kubectl create -f ./deploy/dev-app-build.yaml
