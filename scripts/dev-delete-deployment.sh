#!/usr/bin/env bash

./scripts/use-dev.sh
kubectl delete service lb
kubectl delete service app
kubectl delete service db
kubectl delete service devpostgres
kubectl delete deployment sphela-nginx
kubectl delete deployment sphela-postgres
kubectl delete deployment sphela-app
kubectl delete persistentvolumes server-src
kubectl delete persistentvolumes client-src
kubectl delete persistentvolumes data
kubectl delete persistentvolumeclaims client-src-claim
kubectl delete persistentvolumeclaims server-src-claim
kubectl delete persistentvolumeclaims dataclaim

