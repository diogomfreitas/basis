module.exports = (app) => {
  const servants = require("../controllers/servant.controller.js");

  var router = require("express").Router();

  // Create a new Servant
  router.post("/", servants.create);

  // Retrieve all Servants
  router.get("/", servants.findAll);

  // Retrieve a single Servant with id
  router.get("/:id", servants.findOne);

  // Update a Servant with id
  router.put("/:id", servants.update);

  // Delete a Servant with id
  router.delete("/:id", servants.delete);

  // Delete all Servants
  router.delete("/", servants.deleteAll);

  app.use("/api/servants", router);
};
