[![sphela](https://cloud.githubusercontent.com/assets/249641/21595529/b40f8b1e-d0e3-11e6-9eb8-d0fcbd90c275.png)](http://www.sphela.com)

[![Gitter](https://badges.gitter.im/sphela/sphela.svg)](https://gitter.im/sphela/sphela)


## Community

There isn't one yet, but a chat exists on [Gitter](https://gitter.im/sphela/Lobby).

An app written in vue.js. Not sure what kind of app yet.

What currently has been accomplished:

* Single file vue files being compile, works client and server side
* flowtype interfaces, type checking
* rxjs 5.0 being used
* kubernetes local and prod deployment clusters configured
* Data persistence with postgres

## Requirements

* [yarn](https://github.com/yarnpkg/yarn)
* [minikube](https://github.com/kubernetes/minikube)
* [kubernetes](https://github.com/kubernetes/kubernetes)
* [gcloud](https://cloud.google.com/sdk/gcloud/) for the image registry and prod deployment

As PersistentVolume mapping to host does not yet work on Linux, Linux for dev environment is not yet supported.

This project assumes images are hosted in private repositories on GCE.

## Getting Started

### In development reate a persistent disk for your source for minikube

The first thing to do after git cloning is to generate a local persistent disk yaml for mini:

```sh
./scripts/set-dev-pb-path /Users/username/path/to/sphela/root/
```

### In production create a persistent disk for postgres on GCE

There needs to be a persistent disk in GCE as well.

These are the rough steps to take to get a proper persistent disk for prod deploy.

* Create a persistent disk with a provided script.

This script simply calls `gcloud compute disk create` with options that make sense for the current state of the application.

```sh
./scripts/prod-create-gcepdisk.sh
```

* Create an instance to use to format the disk:

```sh
gcloud compute instances create pg-disk-formatter
```

* Attach disk to the new instance:

```sh
gcloud compute instances attach-disk pg-disk-formatter --disk sphela-disk
```

* ssh into the new instance

```sh
gcloud compute ssh pg-disk-formatter
```

* Find the attached disk.

This part is a bit tricky. [Read the documentation](https://cloud.google.com/compute/docs/disks/add-persistent-disk#formatting)
but it may be incorrect in its advice. What worked for me was running `ls /dev/disk/by-id` before and after attaching the disk.
The new disk id that appears after attaching is the new disk. There may be a better way to do this.

* Format the disk.

Grabbing the disk id as explained in the previous step run:

```sh
sudo mkfs.ext4 -F -E lazy_itable_init=0,lazy_journal_init=0,discard /dev/disk/by-id/google-[disk id]
```

* Detach the disk from the instance

```sh
gcloud compute instances detach-disk pg-disk-formatter --disk sphela-disk
```

* Finally delete the instance:

```sh
gcloud compute instances delete pg-disk-formatter
```


### Important environment variables to set:

* `PROJECT_ID` The Google Compute Engine project id, i.e. `"sphela-153202"`
* `PROD_PROJECT_CONTEXT` The GCE kubernetes context gcloud creates i.e. `"gke_sphela-153202_us-central1-a_sphela-prod"`
* `PROD_CLUSTER_NAME` The name of the cluster, i.e. `"sphela-prod"`

### Google Compute Engine set up

In the GCE dashboard: billing must be enabled. The Google Container Engine API engine must also be enabled.

There's an important script for authenticating minikube's docker with GCR:

```sh
minikube start
./scripts/docker-secret.sh ./YOUR_GCE_SECRET.json docker-registry-secret
kubectl get secrets # make sure you see docker-registry-secret here
```

If you have trouble pulling images it may be because of problems with the above lines. Make sure minikube is up to
date and that it is being started correctly. If you use vmware you may need more arguments when starting minikube.

In this case `YOUR_GCE_SECRET.json` is a .json file you downloaded after creating a secret key json file via the GCE
dashboard.

### Important local commands

To build the initial environment:

Build the app's code:

```sh
yarn i
yarn flow-typed install
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
minikube service lb
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
kubectl describe po PODNAME
kubectl describe deployments/services/etc
kubectl logs PODNAME
```


