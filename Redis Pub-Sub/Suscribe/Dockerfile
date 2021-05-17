FROM golang

RUN apt-get update

WORKDIR /app
COPY . .

EXPOSE 80

RUN go get go.mongodb.org/mongo-driver/mongo
RUN go get github.com/go-redis/redis/v8

CMD ["go", "run", "./suscribe.go"]