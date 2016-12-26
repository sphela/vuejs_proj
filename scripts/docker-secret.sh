#!/usr/bin/env bash

SPATH="$(cd $(dirname "$0") && pwd -P)"
CONFIG_PATH=${1:-$SPATH/localkube.json}
SECRET_NAME=${2:-docker-registry-secret}
if [[ ! -f $CONFIG_PATH ]]; then
  echo "Unable to locate service account config JSON: $CONFIG_PATH";
  exit 1;
fi

kubectl create secret docker-registry $SECRET_NAME  \
  --docker-server "https://gcr.io" \
  --docker-username _json_key \
  --docker-email not@val.id \
  --docker-password="`cat $CONFIG_PATH`" ${@:3}