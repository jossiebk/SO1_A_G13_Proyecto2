package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/go-redis/redis/v8"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// msg_COVID is a struct representing newly registered information
type msg_COVID struct {
	Name         string
	Location     string
	Age          int
	Infectedtype string
	State        string
	CAMINO       string
}

func main() {
	// Create a new Redis Client
	redisClient := redis.NewClient(&redis.Options{
		Addr:     "35.196.165.91:6379", // We connect to host redis, thats what the hostname of the redis service is set to in the docker-compose
		Password: "",                   // The password IF set in the redis Config file
		DB:       3,
	})
	// Ping the Redis server and check if any errors occured
	err := redisClient.Ping(context.Background()).Err()
	if err != nil {
		// Sleep for 3 seconds and wait for Redis to initialize
		time.Sleep(3 * time.Second)
		err := redisClient.Ping(context.Background()).Err()
		if err != nil {
			panic(err)
		}
	}
	ctx := context.Background()
	// Subscribe to the Topic given
	topic := redisClient.Subscribe(ctx, "new_msg")
	// Get the Channel to use
	channel := topic.Channel()
	// Itterate any messages sent on the channel
	for msg := range channel {
		u := &msg_COVID{}
		// Unmarshal the data into the user
		err := u.UnmarshalBinary([]byte(msg.Payload))
		if err != nil {
			panic(err)
		}

		fmt.Println(u)

		//conexión con MOngo DB
		insert_mongo(u.String())
		// postBody := []byte(u.String())
		// fmt.Println("Response: enviando a Mongo DB")
		// http.Post("http://35.229.87.37:27017", "application/json", bytes.NewBuffer(postBody))
		// fmt.Println("Response : datos fueron enviados")

	}
}

func insert_mongo(jsonString string) {
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
	var req msg_COVID
	json.Unmarshal([]byte(jsonString), &req)

	//Checking valid struct
	if (msg_COVID{} != req) {
		//Inserting into Mongodb
		insertResult, err := collection.InsertOne(context.TODO(), req)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Inserted post with ID:", insertResult.InsertedID)
	}
}

// MarshalBinary encodes the struct into a binary blob
// Here I cheat and use regular json :)
func (u *msg_COVID) MarshalBinary() ([]byte, error) {
	return json.Marshal(u)
}

// UnmarshalBinary decodes the struct into a msgCovid
func (u *msg_COVID) UnmarshalBinary(data []byte) error {
	if err := json.Unmarshal(data, u); err != nil {
		return err
	}
	return nil
}

func (u *msg_COVID) String() string {
	return "{Name:" + u.Name + ", Location: " + u.Location + ", Age: " + strconv.Itoa(u.Age) + ", InfectedType: " + u.Infectedtype + ", State: " + u.State + ", CAMINO:" + u.CAMINO + "}"
}
