#!/usr/bin/env bash

./scripts/use-prod.sh
./scripts/create-shared.sh
kubectl create -f ./deploy/prod-app.yaml
