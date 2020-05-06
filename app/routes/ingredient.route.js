module.exports = app => {
    const ingredient = require("../controllers/ingredient.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", ingredient.create);
  
    // Retrieve all Tutorials
    router.get("/", ingredient.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", ingredient.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", ingredient.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", ingredient.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", ingredient.delete);
  
    // Create a new Tutorial
    router.delete("/", ingredient.deleteAll);
  
    app.use('/api/ingredient', router);
  };
  