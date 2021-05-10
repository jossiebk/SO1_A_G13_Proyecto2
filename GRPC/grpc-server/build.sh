#!/bin/bash
docker login --username $1
docker build -t grpc-server .
docker tag grpc-server $1/grpc-server
docker push $1/grpc-server