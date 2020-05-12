module.exports = (sequelize, Sequelize) => {
  const ContenuRecette = sequelize.define("contenuRecette", {
      quantite: {
        type: Sequelize.FLOAT
      },
    });
  
    return ContenuRecette;
  };