#! /bin/bash

# Usage ./scripts/set-dev-pb-path /Users/username/path/to/sphela/root/

cat ./deploy/dev-persistent-volume-sample.yaml | sed "s#LOCAL_PATH#$1#" > ./deploy/dev-persistent-volume.yaml
