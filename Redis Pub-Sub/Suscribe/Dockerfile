FROM golang

RUN apt-get update

WORKDIR /app
COPY . .

EXPOSE 80

CMD ["go", "run", "./suscribe.go"]