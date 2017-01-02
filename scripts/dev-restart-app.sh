#!/usr/bin/env bash

./scripts/use-dev.sh
./scripts/deploy-static.sh
# Important! This should never be called against prod!
kubectl delete deployment sphela-app
kubectl create -f ./deploy/dev-app-build.yaml
