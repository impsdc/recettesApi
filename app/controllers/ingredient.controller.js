const db = require("../models");
const Ingredient = db.ingredient;
const Op = db.Sequelize.Op;
const fs = require("fs");

const path = require("path");

exports.home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../../views/index.html`));
};

// Create and Save a new candidate
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  } else if (!req.body.prix) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  } else if (req.file == undefined) {
    res.status(400).send({
      message: "you must select a file !",
    });
  }

  // Create a Ingredient
  const ingredient = {
    nom: req.body.nom,
    prix: req.body.prix,
    published: req.body.published ? req.body.published : false,
    image:  req.file.filename
  };

  // Save Ingredient in the database
  Ingredient.create(ingredient)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const nom = req.query.nom;
  var condition = nom
    ? {
        nom: {
          [Op.like]: `%${nom}%`,
        },
      }
    : null;

  Ingredient.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ingredient.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Ingredient.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Ingredient was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Ingredient with id=${id}. Maybe Ingredient was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Ingredient with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Ingredient.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Ingredient was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Ingredient with id=${id}. Maybe Ingredient was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Ingredient with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Ingredient.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Ingredient were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Ingredient.",
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Ingredient.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Ingredient.",
      });
    });
};
