# Software Components for Slovakia National Open Data Catalog
This repository contains Slovakia National Open Data Catalog (SNODC) [specific components](#software-components) and their [deploy scripts](#kubernetes-deployment-scripts) for [Kubernetes](https://kubernetes.io/).

## Software Components
Software components are located in the components directory.
Installation and deployment in described in directories of the respective components.
The following list briefly describes the components:
 * [GraphDB](./components/graphdb/README.md) 
 * [Registration Updater](./components/registration-updater/README.md) 
 * [Scheduler](./components/scheduler/README.md) 
 * [Website](./components/website/README.md) 

All components are published as Docker images into GitHub Docker registry using GitHub action ```publish-docker```.

## Kubernetes Deployment Scripts
Kubernetes deployments scripts are located in the k8s directory.
You can apply all of them using following command from the root of this repository:
```kubectl apply -f k8s```

In order to work several requirements must be met.
There must exist PersistentVolumes with sufficient size.
The size can be determined by the space required in the ```k8s/*-claim.yaml``` files.

In addition a secret named ```nodc-secret``` must be created with following fields:
* REGISTRATION_WEBHOOK_TOKEN - token for registration update webhook.
* GRAPHDB_PASSWORD - password for GraphDB ```lp-elt``` user.
* GRAPHDB_ADMIN_PASSWORD - password for graphDB ```admin``` user.

The secret can be created from command line using following command, please remember to substitute the values:
```
kubectl create secret generic nodc-secret --from-literal=REGISTRATION_WEBHOOK_TOKEN='...' --from-literal=GRAPHDB_PASSWORD='1234' --from-literal=GRAPHDB_ADMIN_PASSWORD='12345'
```
