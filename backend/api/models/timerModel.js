'use strict';

var dbo = require('../../db/connection');

module.exports = {
    createNewTimer: function (timer) {
        let newTimer = {
            id_timer = timer.id_timer,  // this.id
            status = timer.status,      // isRunning
            title = timer.title,
            start_time = timer.start_time,  // startTime
            // current_time = timer.current_time,
            last_pause = timer.last_pause,  // puaseTime
            // last_delay = timer.last_delay,
            last_continue = timer.last_continue,    // continueTime
            delays = timer.delays   // timeDelays
        }
        return newTimer;
    }
}