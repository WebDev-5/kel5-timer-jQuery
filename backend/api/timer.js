const pool = require('../db/connection');

module.exports = function (app) {
    app.route('/timer')
        .get((req, res) => {
            // TESTING GET DB
            pool.query(`SELECT * FROM timer`, (error, results) => {
                if (error) {
                    throw error
                }

                res.status(200).json(results.rows)
            })
        })

        .post((req, res) => {
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
        })
}