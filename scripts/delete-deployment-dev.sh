#! /bin/bash

kubectl delete service lb
kubectl delete service app
kubectl delete deployment sphela-nginx
kubectl delete deployment sphela-app
kubectl delete persistentvolumes src
kubectl delete persistentvolumeclaims srclaim

