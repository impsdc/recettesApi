module.exports = (app) => {
  const ingredients = require("../controllers/ingredient.controller");
  const upload = require("../../config/middleware/upload");

  // Create a new Tutorial
  app.post("/ingredient/upload/", upload.single("file"), ingredients.create);

  // Retrieve all Tutorials
  app.get("/ingredient/", ingredients.findAll);

  // Retrieve all published Tutorials
  app.get("/ingredient/published/", ingredients.findAllPublished);

  // Retrieve a single Tutorial with id
  app.get("/ingredient/:id", ingredients.findOne);

  // Update a Tutorial with id
  app.put("/ingredient/:id", ingredients.update);

  // Delete a Tutorial with id
  app.delete("/ingredient/:id", ingredients.delete);

  // Create a new Tutorial
  app.delete("/ingredient/", ingredients.deleteAll);
};
