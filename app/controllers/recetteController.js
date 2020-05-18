const db = require("../models");
const Recette = db.recette;
const Op = db.Sequelize.Op;
const fs = require("fs");

const path = require("path");

exports.home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../../views/recette.html`));
};

// Create and Save a new candidate
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a recette
  const recette = {
    nom: req.body.nom,
    published: req.body.published ? req.body.published : false,
    origin: req.body.origin,
    image: fs.readFileSync(__basedir + "/public/uploads/" + req.file.filename),
  };

  // Save recette in the database
  Recette.create(recette)
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
  const quantite = req.query.quantite;
  var condition = quantite
    ? {
        nom: {
          [Op.like]: `%${nom}%`,
        },
      }
    : null;

  Recette.findAll({ where: condition })
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

  Recette.findByPk(id)
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

  Recette.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "recette was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update recette with id=${id}. Maybe recette was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating recette with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Recette.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "recette was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete recette with id=${id}. Maybe recette was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete recette with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Recette.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} recette were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all recette.",
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Recette.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recette.",
      });
    });
};
