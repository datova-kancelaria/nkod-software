# Software Components for Slovakia National Open Data Catalog
This repository contains Slovakia National Open Data Catalog (SNODC) [specific components](#software-components) and their [deploy scripts](#kubernetes-deployment-scripts) for [Kubernetes](https://kubernetes.io/).

## Software Components
Software components are located in the components directory.
Installation and deployment in described in directories of the respective components.
The following list briefly describes the components:
 * [GraphDB](./components/graphdb/README.md) 
 * [Let's Encrypt](./components/letsencrypt/README.md)  
 * [Manager](./components/manager/README.md) 
 * [Website](./components/website/README.md) 

All components, besides GraphDB, are published as Docker images into GitHub Docker registry using GitHub action ```publish-docker```.

## Kubernetes Deployment Scripts
Kubernetes deployments scripts are located in the k8s directory.
