// NOT TO USE
'use strict';

var timerModel = require("../models/timerModel"),
    client = require("../../db/connection")

module.exports = {
    createTimer: function (req, res) {
        const timer = req.body;
        const insertQuery = `INSERT INTO timer (id_timer, status, title, start_time, last_pause, last_continue, delays)
                    VALUES('${timer.id_timer}', '${timer.status}', '${timer.title}', '${timer.start_time}',
                    '${timer.last_pause}', '${timer.last_continue}', '${timer.delays}')`

        pool.query(insertQuery, (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json("Timer created successfully")
        })
    },

    // getTimer: function (req, res) {
    //     client.query(`Select * from timer`, (err, result) => {
    //         if (!err) {
    //             res.send(result.rows);
    //         }
    //     });
    //     client.end;
    // }
}