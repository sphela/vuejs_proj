#!/usr/bin/env bash

./scripts/use-prod.sh
kubectl delete service lb
kubectl delete service app
kubectl delete deployment sphela-nginx
kubectl delete deployment sphela-app
