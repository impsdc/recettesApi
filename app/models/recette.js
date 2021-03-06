module.exports = (sequelize, Sequelize) => {
  const recette = sequelize.define("recette", {
    nom: {
      type: Sequelize.STRING,
    },
    origin: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING
    }
  });

  return recette;
};
