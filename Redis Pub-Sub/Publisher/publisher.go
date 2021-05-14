package main

import (
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/go-redis/redis/v8"
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

// MarshalBinary encodes the struct into a binary blob
// Here I cheat and use regular json :)
func (u *msg_COVID) MarshalBinary() ([]byte, error) {
	return json.Marshal(u)
}

// UnmarshalBinary decodes the struct into a msg_COVID
func (u *msg_COVID) UnmarshalBinary(data []byte) error {
	if err := json.Unmarshal(data, &u); err != nil {
		return err
	}
	return nil
}

// Names Some Non-Random name lists used to generate Random Users
var Names []string = []string{"Jasper", "Johan", "Edward", "Niel", "Percy", "Adam", "Grape", "Sam", "Redis", "Jennifer", "Jessica", "Angelica", "Amber", "Watch"}

// Names Some Non-Random name lists used to generate Random Users
var Locations []string = []string{"Guatemala", "El Salvador", "Honduras", "Nicaragua", "Costa Rica", "Panamá", "Haíti", "Cuba", "Puerto Rico"}

// SirNames Some Non-Random name lists used to generate Random Users
var Ages []int = []int{1, 2, 4, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20}

// EmailProviders Some Non-Random email lists used to generate Random Users
var InfectedTypes []string = []string{"imported", "communitary", "non-imported"}

// EmailProviders Some Non-Random email lists used to generate Random Users
var States []string = []string{"symptomatic", "asymptomatic"}

var Paths = "Redis Pub/Sub"

func Server(wr http.ResponseWriter, req *http.Request) {

	switch req.Method {
	case "POST":
		var json_covid msg_COVID

		//route := "Google pub/sub"
		decoder := json.NewDecoder(req.Body)
		_error := decoder.Decode(&json_covid)

		if _error != nil {
			fmt.Println("Error al recibir cadena: %v", _error)
		}

		message, _error := json.Marshal(msg_COVID{Name: json_covid.Name, Location: json_covid.Location, Age: json_covid.Age, Infectedtype: json_covid.Infectedtype, State: json_covid.State, CAMINO: "PUBSUB"})

		if _error != nil {
			fmt.Fprintf(wr, "Error en parser: %v", _error)
			return
		}

		fmt.Println(string(message))
		publish(string(message))

	default:
		fmt.Println(wr, "Ruta %s no validada", req.Method)
		return
	}
}

func publish(msg string) {
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
	// Generate a new background context that  we will use
	ctx := context.Background()
	// Loop and randomly generate users on a random timer
	for {
		// Publish a generated user to the new_users channel
		err := redisClient.Publish(ctx, "new_msg", msg).Err()
		if err != nil {
			panic(err)
		}
		// Sleep random time
		rand.Seed(time.Now().UnixNano())
		n := rand.Intn(4)
		time.Sleep(time.Duration(n) * time.Second)
	}
}

func main() {
	fmt.Println("Iniciando ...")
	fmt.Println("..")
	fmt.Println(".")
	http.HandleFunc("/", Server)
	puerto := ":80"
	_error := http.ListenAndServe(puerto, nil)
	if _error != nil {
		fmt.Println("Error en el WebService: %v", _error)
	}
}

// GenerateRandomUser creates a random user, dont care too much about this.
func GenerateRandomUser() *msg_COVID {
	rand.Seed(time.Now().UnixNano())
	nameMax := len(Names)
	locationMax := len(Locations)
	ageMax := len(Ages)
	infectedMax := len(InfectedTypes)
	stateMax := len(States)
	pathMax := Paths

	nameIndex := rand.Intn(nameMax-1) + 1
	locationIndex := rand.Intn(locationMax-1) + 1
	ageIndex := rand.Intn(ageMax-1) + 1
	infectedIndex := rand.Intn(infectedMax-1) + 1
	stateIndex := rand.Intn(stateMax-1) + 1
	pathIndex := pathMax

	return &msg_COVID{
		Name:         Names[nameIndex],
		Location:     Locations[locationIndex],
		Age:          Ages[ageIndex],
		Infectedtype: InfectedTypes[infectedIndex],
		State:        States[stateIndex],
		CAMINO:       pathIndex,
	}
}
