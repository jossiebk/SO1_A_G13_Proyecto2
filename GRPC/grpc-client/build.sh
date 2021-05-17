#!/bin/bash
docker login --username $1
docker build -t grpc-client .
docker tag grpc-client $1/grpc-client
docker push $1/grpc-client