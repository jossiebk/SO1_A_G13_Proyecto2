import time
from locust import HttpUser, task, between
import json
from random import seed
from random import randint

class QuickstartUser(HttpUser):
    # this will set a random time between request to the server
    wait_time=between(1,10)

    # task enable the method to work in a loop.
    @task
    def on_start(self):
        reg=""
        # We read the Json file.
        with open("traffic.json") as file:
            data=json.load(file)
            # Generate a random value between 0 and the size of your Json file - 1
            
            # Get the value position of the Json load in data variable to send it in the request.
            print("tamaño del file: ",len(data))
            value=randint(0,len(data)-1)
            reg=data[value]
            print(reg)

        #self.client.get("http://localhost/")
        self.client.post("http://localhost/", json=reg)