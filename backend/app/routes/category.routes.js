module.exports = (app) => {
  const categories = require("../controllers/category.controller.js");

  var router = require("express").Router();

  // Retrieve all Categories
  router.get("/", categories.findAll);

  app.use("/api/categories", router);
};
