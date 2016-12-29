#!/usr/bin/env bash

./scripts/use-prod.sh
kubectl delete service lb
kubectl delete service app
kubectl delete service db
kubectl delete deployment sphela-nginx
kubectl delete deployment sphela-app
kubectl delete deployment sphela-postgres
kubectl delete persistentvolumes data
kubectl delete persistentvolumeclaims dataclaim
