const pool = require('./db/connection')

// get environment variable from .env file
require('dotenv').config();

// intialize
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    cors = require('cors')

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, ()=>{
    console.log("Server is now listening at port: " + port);
})

require('./api/timer')(app);

pool.connect();