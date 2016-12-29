#!/usr/bin/env bash

# Important! This should never be called against prod!
kubectl delete deployment sphela-app
kubectl create -f ./deploy/dev-app.yaml
