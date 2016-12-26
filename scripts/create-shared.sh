#!/usr/bin/env bash

kubectl create -f ./deploy/nginx.yaml
kubectl create -f ./deploy/postgres.yaml