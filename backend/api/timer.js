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
            const insertQuery = `CALL addTimer('${timer.id_timer}', '${timer.status}', '${timer.title}', '${timer.start_time}',
                    '${timer.last_pause}', '${timer.last_continue}', '${timer.delays}')`

            pool.query(insertQuery, (error, results) => {
                if (error) {
                    throw error
                }
                res.status(200).json("Timer created successfully")
            })
        })

    app.route('/timer/:id_timer')
        .delete((req, res) => {
            const id = parseInt(req.params.id_timer)
            const deleteQuery = `CALL deleteTimer('${id}')`

            pool.query(deleteQuery, (error, results) => {
                if (error) {
                    throw error
                }
                res.status(200).send(`Timer deleted with ID: ${id}`)
            })
        })

    app.route('/notes')
        .get((req, res) => {
            pool.query(`SELECT * FROM notes`, (error, results) => {
                if (error) {
                    throw error
                }
                res.status(200).json(results.rows)
            })
        })

        .post((req, res) => {
            const notes = req.body;
            const insertQuery = `CALL addNote('${notes.id_notes}', '${notes.id_timer}', '${notes.content}')`

            pool.query(insertQuery, (error, results) => {
                if (error) {
                    throw error
                }
                res.status(200).json("Notes created succesfully")
            })
        })

    app.route('/notes/:id_notes')
        .delete((req, res) => {
            const id = parseInt(req.params.id_notes)
            const deleteQuery = `CALL deleteNote('${id}')`

            pool.query(deleteQuery, (error, results) => {
                if (error) {
                    throw error
                }
                res.status(200).send(`Notes deleted with ID: ${id}`)
            })
        })
}