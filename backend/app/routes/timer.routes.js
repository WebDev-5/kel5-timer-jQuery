module.exports = app => {
  const timer = require("../controllers/timer.controller.js");

  var router = require("express").Router();

  // Create a new Timer
  router.post("/", timer.create);

  // Retrieve all Timers
  router.get("/", timer.findAll);

  // Retrieve a single Timer with id
  router.get("/:id", timer.findOne);

  // Update a Timer with id
  router.put("/:id", timer.update);

  // Delete a Timer with id
  router.delete("/:id", timer.delete);

  // Create a new Timer
  router.delete("/", timer.deleteAll);

  app.use('/timer', router);
};