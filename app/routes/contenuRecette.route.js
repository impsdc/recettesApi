module.exports = (app) => {
  const contenuRecette = require("../controllers/contenuRecetteController");

  // Create a new Tutorial
  app.post("/contenuRecette/", contenuRecette.create);

  // Retrieve all Tutorials
  app.get("/contenuRecette/", contenuRecette.findAll);

  // Retrieve all published Tutorials
  app.get("/contenuRecette/published/", contenuRecette.findAllPublished);

  // Retrieve a single Tutorial with id
  app.get("/contenuRecette/:id", contenuRecette.findOne);

  // Update a Tutorial with id
  app.put("/contenuRecette/:id", contenuRecette.update);

  // Delete a Tutorial with id
  app.delete("/contenuRecette/:id", contenuRecette.delete);

  // Create a new Tutorial
  app.delete("/contenuRecette/", contenuRecette.deleteAll);
};
