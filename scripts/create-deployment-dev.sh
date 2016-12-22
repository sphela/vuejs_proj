#! /bin/bash

kubectl create -f ./deploy/dev-persistent-volume.yaml
kubectl create -f ./deploy/dev.yaml
kubectl create -f ./deploy/dev-app.yaml
