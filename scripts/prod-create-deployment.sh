#!/usr/bin/env bash

./scripts/use-prod.sh
./scripts/create-shared.sh
kubectl create -f ./deploy/prod-postgres.yaml
kubectl create -f ./deploy/prod-persistent-volume.yaml
kubectl create -f ./deploy/prod-app-build.yaml
