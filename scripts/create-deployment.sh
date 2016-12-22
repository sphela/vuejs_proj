#! /bin/bash

if [[ -z $1 ]]
then
  echo "No environment given."
  exit 1
fi

if [ ! "$1" = "dev" ]
then
  if [ ! "$1" = "prod" ]
  then
    echo "Must provide either 'dev' or 'prod'."
    exit 1
  fi
fi

kubectl create -f ./deploy/$1.yaml
