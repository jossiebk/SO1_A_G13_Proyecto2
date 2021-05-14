const express = require('express')
//const mongoose = require('mongoose')
const app = express();
const MongoClient = require("mongodb").MongoClient;
const fs = require('fs')
var db;
MongoClient.connect('mongodb://jossie:grupoalgo@35.229.87.37:27017/testdb?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    db = client.db("testdb");
});
app.use(express.json({ limit: '5mb', extended: true }));

app.get('/data', async (req, res) => {
    var dat=[];
    try {
        db.collection("covid").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

app.listen(7000);
console.log("servidor corriendo en puerto",7000);