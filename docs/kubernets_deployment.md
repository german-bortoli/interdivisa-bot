# Deploying a Node App to Google Cloud with Kubernetes

## Want to learn how to build this?

Check out the [post](https://testdriven.io/deploying-a-node-app-to-google-cloud-with-kubernetes).

## Want to use this project?

### Docker

Build the images and spin up the containers:

```sh
$ docker-compose up -d --build
```

### Kubernetes

#### Google Cloud Platform (GCP)

Install the [Google Cloud SDK](https://cloud.google.com/sdk), run `gcloud init` to configure it, and then either pick an existing GCP project or create a new project to work with.

Set the project:

```sh
$ gcloud config set project interdivisas-bot
```

Install `kubectl`:

```sh
$ gcloud components install kubectl
```

#### Kubernetes Cluster

Create a cluster on [Kubernetes Engine](https://console.cloud.google.com/kubernetes):

```sh
$ gcloud container clusters create node-kubernetes \
    --num-nodes=1 --zone us-central1-a --machine-type g1-small
```

Connect the `kubectl` client to the cluster:

```sh
$ gcloud container clusters get-credentials node-kubernetes --zone us-central1-a
```

#### Docker

Build and push the image to the [Container Registry](https://cloud.google.com/container-registry/):

```sh
$ gcloud auth configure-docker
$ docker build --no-cache -t gcr.io/interdivisas-bot/node-kubernetes:v0.1.2 .
$ docker push gcr.io/interdivisas-bot/node-kubernetes:v0.1.2
```

#### Secrets

Create the secret object:

```sh
$ kubectl apply -f ./kubernetes/secret.yaml
```

#### Volume

Create a [Persistent Disk](https://cloud.google.com/persistent-disk/):

```sh
$ gcloud compute disks create pg-data-disk --size 50GB --zone us-central1-a
```

Create the volume:

```sh
$ kubectl apply -f ./kubernetes/volume.yaml
```

Create the volume claim:

```sh
$ kubectl apply -f ./kubernetes/volume-claim.yaml
```

#### Postgres

Create deployment:

```sh
$ kubectl create -f ./kubernetes/postgres-deployment.yaml
```

Create the service:

```sh
$ kubectl create -f ./kubernetes/postgres-service.yaml
```

Create the database:

```sh
$ kubectl get pods
$ kubectl exec <POD_NAME> --stdin --tty -- createdb -U <DB_USER> <DB_NAME>

Example: kubectl exec postgres-57fdf4d959-f69nh --stdin --tty -- createdb -U intdiv_bot interdivisa_bot
```

#### Node

Update the image name *kubernetes/node-deployment-updated.yaml* and then create the deployment:

```sh
$ kubectl create -f ./kubernetes/node-deployment-updated.yaml
```

Create the service:

```sh
$ kubectl create -f ./kubernetes/node-service.yaml
```

Apply the migration and seed the database:

```sh
$ kubectl get pods
$ kubectl exec <POD_NAME> knex migrate:latest
$ kubectl exec <POD_NAME> knex seed:run
```

Grab the external IP:

```sh
$ kubectl get service node

NAME      TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)          AGE
node      LoadBalancer   10.39.244.136   35.232.249.48   3000:30743/TCP   2m
```

#### Remove

Remove the resources once done:

```sh
$ kubectl delete -f ./kubernetes/node-service.yaml
$ kubectl delete -f ./kubernetes/node-deployment-updated.yaml

$ kubectl delete -f ./kubernetes/secret.yaml

$ kubectl delete -f ./kubernetes/volume.yaml
$ kubectl delete -f ./kubernetes/volume-claim.yaml

$ kubectl delete -f ./kubernetes/postgres-deployment.yaml
$ kubectl delete -f ./kubernetes/postgres-service.yaml

$ gcloud container clusters delete node-kubernetes --zone us-central1-a
$ gcloud compute disks delete pg-data-disk --zone us-central1-a
$ gcloud container images delete gcr.io/interdivisas-bot/node-kubernetes:v0.1.2
```
