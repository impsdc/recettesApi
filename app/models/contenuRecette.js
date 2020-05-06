module.exports = (sequelize, Sequelize) => {
    const contenuRecette = sequelize.define("contenuRecette", {
      quantite: {
        type: Sequelize.FLOAT
      },
    });
  
    return contenuRecette;
  };