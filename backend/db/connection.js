// get environment variable from .env file
require('dotenv').config();

const DB_USERNAME = process.env.DB_USERNAME,
    DB_PASSWORD = process.env.DB_PASSWORD,
    DB_NAME = process.env.DB_NAME

const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    user: DB_USERNAME,
    port: 5432,
    password: DB_PASSWORD,
    database: DB_NAME
})

module.exports = client