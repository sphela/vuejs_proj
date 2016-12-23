# sphela

An app written in vue.js. Not sure what kind of app yet.

What currently has been accomplished:

* Single file vue files being compile, works client and server side
* flowtype interfaces, type checking
* rxjs 5.0 being used
* kubernetes local and prod deployment clusters configured

## Requirements

* [yarn](https://github.com/yarnpkg/yarn)
* [minikube](https://github.com/kubernetes/minikube)
* [kubernetes](https://github.com/kubernetes/kubernetes)
* [gcloud](https://cloud.google.com/sdk/gcloud/) for the image registry and prod deployment

As PersistentVolume mapping to host does not yet work on Linux, Linux for dev environment is not yet supported.

This project assumes images are hosted in private repositories on GCE.

## Getting Started

The first thing to do after git cloning is to generate a local persistent disk yaml for mini:

```sh
./scripts/set-dev-pb-path /Users/username/path/to/sphela/root/
```

### Important environment variables to set:

* `PROJECT_ID` The Google Compute Engine project id, i.e. `"sphela-153202"`
* `PROD_PROJECT_CONTEXT` The GCE kubernetes context gcloud creates i.e. `"gke_sphela-153202_us-central1-a_sphela-prod"`
* `PROD_CLUSTER_NAME` The name of the cluster, i.e. `"sphela-prod"`

### Google Compute Engine set up

Billing must be enabled. There's an important script for authenticating docker with GCR:

```sh
./scripts/docker-secret.sh ./YOUR_GCE_SECRET.json docker-registry-secret
```

In this case `YOUR_GCE_SECRET.json` is a .json file you downloaded after creating a secret key json file via the GCE
dashboard.

### Important local commands

To build the initial environment:

Build the app's code:

```sh
yarn i
yarn gulp
```

Create the images and push them to GCR

```sh
./scripts/build-app.sh
./scripts/build-nginx.sh
```

To run the local environment in minikube:

```sh
./scripts/use-dev.sh
./scripts/create-deployment-dev.sh
env STATIC_ROOT='containers/app/src/js/client' yarn gulp watch
```
For now `STATIC_ROOT` is required, this is an issue to fix.

See the app in your browser:

```sh
minikube get lb
```

This should open up a tab in your default browser with the app running.


To setup and deploy to prod:

```sh
./scripts/use-prod.sh
./scripts/create-deployment-prod.sh
```

Otherwise important commands:

```sh
kubectl get pods # Get the state of the current pods
kubectl get services # Get the state of services and their external IP
kubectl proxy # Run a web ui to see important info about your cluster http://127.0.0.1:8000/ui usually.
minikube logs # If something's not right in the dev environment this probably where to check.
```


