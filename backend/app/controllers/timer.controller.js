const db = require("../models");
const Timer = db.timer;
const Op = db.Sequelize.Op;

// Create and Save a new Timer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Timer
  const timer = {
	  status: req.body.status,  
    title: req.body.title,
    start_time: req.body.start_time,
	  last_pause: req.body.last_pause,
    delays: req.body.delays,
    last_continue: req.body.last_continue
  };

  // Save Timer in the database
  Timer.create(timer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Timer."
      });
    });
};

// Retrieve all Timers from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Timer.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving timers."
      });
    });
};

// Find a single Timer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Timer.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Timer with id = ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Timer with id = " + id
      });
    });
};

// Update a Timer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Timer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Timer with id = ${id} was updated successfully.`
        });
      } else {
        res.send({
          message: `Cannot update Timer with id = ${id}. Maybe Timer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Timer with id = " + id
      });
    });
};

// Delete a Timer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Timer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Timer with id = ${id} was deleted successfully.`
        });
      } else {
        res.send({
          message: `Cannot delete Timer with id = ${id}. Maybe Timer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Timer with id = " + id
      });
    });
};

// Delete all Timers from the database.
exports.deleteAll = (req, res) => { 
  Timer.destroy({
    where: {},
    truncate: true,
    restartIdentity: true
  })
    .then(nums => {
      res.send({ message: "All Timers were deleted successfully!" 
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all timers."
      });
    });
};