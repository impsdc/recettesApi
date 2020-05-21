module.exports = (sequelize, Sequelize) => {
  const Ingredient = sequelize.define("ingredient", {
    nom: {
      type: Sequelize.STRING,
    },
    prix: {
      type: Sequelize.FLOAT,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return Ingredient;
};
