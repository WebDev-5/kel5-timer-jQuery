const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    user: "webdev-5",
    port: 5432,
    password: "webdev-5",
    database: "timer"
})

module.exports = client