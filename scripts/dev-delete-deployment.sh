#!/usr/bin/env bash

./scripts/use-dev.sh
kubectl delete service lb
kubectl delete service app
kubectl delete service db
kubectl delete service devpostgres
kubectl delete deployment sphela-nginx
kubectl delete deployment sphela-postgres
kubectl delete deployment sphela-app
kubectl delete persistentvolumes src
kubectl delete persistentvolumes data
kubectl delete persistentvolumeclaims srclaim
kubectl delete persistentvolumeclaims dataclaim

