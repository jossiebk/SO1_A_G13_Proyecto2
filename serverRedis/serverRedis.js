const express = require('express');
const fetch = require('node-fetch');
const Redis = require("ioredis");
const redis = new Redis({
    port: 6379, // Redis port
    host: '35.196.165.91',
    family: 4, // 4 (IPv4) or 6 (IPv6)
    db: 0,
});

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

const app = express();


async function main(req, res, next){
    const key = 'lista';
    try{
        const ans = await redis.lrange(key,0,-1);
        ans.forEach(v => console.log(v));
        res.send(ans);
    }
    catch (error){
        console.error(error);
    }
    redis.disconnect();
}


app.get('/data',main);

app.listen(5000, ()=> {
    console.log(`App listening on port ${PORT}`);
});