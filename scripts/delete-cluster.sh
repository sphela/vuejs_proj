#!/usr/bin/env bash

./scripts/delete-deployment.sh
gcloud container clusters delete $PROD_CLUSTER_NAME


