const client = require('./db/connection')
const express = require('express');
const app = express();

app.listen(3300, ()=>{
    console.log("Server is now listening at port 3300");
})

client.connect();