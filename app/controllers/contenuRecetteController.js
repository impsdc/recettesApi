const db = require("../models");
const ContenuRecette = db.contenuRecette;
const Op = db.Sequelize.Op;

// Create and Save a new candidate
exports.create = (req, res) => {
  console.log(req.body)
  // Validate request
  if (!req.body.quantite) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a contenuRecette
  const contenuRecette =
    {
      quantite: req.body.quantite,
      published: req.body.published ? req.body.published : false,
      ingredientId: req.body.ingredientId,
      recetteId: req.body.recetteId,

    };

  // Save contenuRecette in the database
  ContenuRecette.create(contenuRecette)
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

  ContenuRecette.findAll({ where: condition })
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

  ContenuRecette.findByPk(id)
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

  ContenuRecette.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "contenuRecette was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update contenuRecette with id=${id}. Maybe contenuRecette was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating contenuRecette with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ContenuRecette.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "contenuRecette was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete contenuRecette with id=${id}. Maybe contenuRecette was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete contenuRecette with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  ContenuRecette.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} contenuRecette were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all contenuRecette.",
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  ContenuRecette.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contenuRecette.",
      });
    });
};
