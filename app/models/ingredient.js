module.exports = (sequelize, Sequelize) => {
    const Ingredient = sequelize.define("ingredient", {
      nom: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      prix: {
        type: Sequelize.FLOAT
      },
    });
  
    return Ingredient;
  };