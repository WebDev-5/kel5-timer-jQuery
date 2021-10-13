'use strict'

module.exports = function (app) {
    let timerHandler = require("../controllers/timerController");

    app.get('/timer', timerHandler.getTimer);
}