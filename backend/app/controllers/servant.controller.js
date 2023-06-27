const db = require("../models");
const Servant = db.servants;
const Op = db.Sequelize.Op;

// Create and Save a new Servant
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Servant
  const servant = {
    name: req.body.name,
    registration: req.body.registration,
    department: req.body.department,
    categoryId: req.body.category.id,
  };
  console.log(servant);

  // Save Servant in the database
  Servant.create(servant)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Servant.",
      });
    });
};

// Retrieve all Servants from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;

  console.log("teste");
  console.log(name);

  if (!isNaN(name)) {
    Servant.findAll({
      where: { registration: { [Op.eq]: name } },
      include: ["category"],
    })
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          findByName(name, res);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving servants.",
        });
      });
  } else {
    findByName(name, res);
  }
};

function findByName(name, res) {
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  console.log(name);

  Servant.findAll({ where: condition, include: ["category"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving servants.",
      });
    });
}

// Find a single Servant with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Servant.findByPk(id, { include: ["category"] })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Servant with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving Servant with id=" + id,
      });
    });
};

// Update a Servant by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const servant = req.body;
  servant.categoryId = servant.category.id;

  Servant.update(servant, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Servant was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Servant with id=${id}. Maybe Servant was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Servant with id=" + id,
      });
    });
};

// Delete a Servant with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Servant.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Servant was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Servant with id=${id}. Maybe Servant was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Servant with id=" + id,
      });
    });
};
