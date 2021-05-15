// Package main implements a server for Greeter service.
package main

import (
	"log"
	"net"
	"fmt"
	"time"
	"context"
	"encoding/json"

	"google.golang.org/grpc"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/gomodule/redigo/redis"
	
)

const (
	port = ":8081"
)

//Struct to save into Mongodb
type Request struct {
  Name string `redis:"name"`
	Location string `redis:"location"`
	Age int `redis:"age"`
	InfectedType string `json:"infected_type"`
	State string `redis:"state"`
}

// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedGreeterServer
}

// SayHello implements helloworld.GreeterServer
func (s *server) SayHello(ctxt context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	//JSON string (it comes from client)
	jsonString := in.GetName()
	
	//Print received data from the client
	log.Printf("Data received: %v", jsonString)

	//Connection with Mongodb directly
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://35.229.87.37:27017").SetAuth(options.Credential{
		AuthSource: "testdb", Username: "jossie", Password: "grupoalgo",
	}))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	//Accessing the collection inside the database
	collection := client.Database("testdb").Collection("covid")

	//Parsing JSON string to Struct
	var req Request	
	json.Unmarshal([]byte(jsonString), &req)

	//Checking valid struct
	if (Request{} != req) {
		//Inserting into Mongodb 
		insertResult, err := collection.InsertOne(context.TODO(), req)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Inserted data in mongo with ID:", insertResult.InsertedID)

		//Inserting into redis
		log.Println("EMPIEZA REDIS")
		c, err := redis.Dial("tcp", "35.196.165.91:6379")
		log.Println("SI SE CONECTA",err)
		if err != nil {
			log.Println("No se pudo conectar a redis desde GRPC", err)
		} else {
			//Struct to jsonstring just to ensure a good format
			b, err := json.Marshal(req)
			if err != nil {
				fmt.Println(err)
			}

			//Inserting object
			if _, err := c.Do("LPUSH", "lista", string(b)); err != nil {
				fmt.Println("Error insertando objeto en redis: ",err)
			}
		}
	} 

	//Return something to the client
	return &pb.HelloReply{Message: "Hello " + jsonString}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}