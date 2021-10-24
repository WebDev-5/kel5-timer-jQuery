module.exports = (sequelize, Sequelize) => {
  const Timer = sequelize.define("timer", {
    status: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
	  start_time: {
      type: Sequelize.INTEGER
    },
    last_pause: {
      type: Sequelize.INTEGER
    },
    delays: {
      type: Sequelize.INTEGER
    },
    last_continue: {
      type: Sequelize.INTEGER
    }
  });
  return Timer;
};