#!/usr/bin/env bash

./scripts/use-prod.sh
kubectl create -f ./deploy/prod-nginx.yaml
kubectl create -f ./deploy/prod-postgres.yaml
kubectl create -f ./deploy/prod-persistent-volume.yaml
kubectl create -f ./deploy/prod-app-build.yaml
