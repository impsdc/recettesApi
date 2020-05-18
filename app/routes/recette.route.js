module.exports = (app) => {
  const recettes = require("../controllers/recetteController.js");
  const upload = require("../../config/middleware/upload");

  // Create a new Tutorial
  app.post("/recette/post",upload.single("file"),  recettes.create);

  // Retrieve all Tutorials
  app.get("/recette/", recettes.findAll);

  // Retrieve all published Tutorials
  app.get("/recette/published/", recettes.findAllPublished);

  // Retrieve a single Tutorial with id
  app.get("/recette/:id", recettes.findOne);

  // Update a Tutorial with id
  app.put("/recette/:id", recettes.update);

  // Delete a Tutorial with id
  app.delete("/recette/:id", recettes.delete);

  // Create a new Tutorial
  app.delete("/recette/", recettes.deleteAll);
};
