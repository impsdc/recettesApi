const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ingredient = require("./ingredient")(sequelize, Sequelize);
db.contenuRecette = require("./contenuRecette.js")(sequelize, Sequelize);
db.recette = require("./recette.js")(sequelize, Sequelize);

//relation many to one of contenuRecette to ingredient
db.contenuRecette.hasMany(db.ingredient, { as: "ingredient" });
db.ingredient.belongsTo(db.contenuRecette, {
  foreignKey: "contenuRecetteId",
  as: "contenuRecette",
});

//relation many to one of contenuRecette to ingredient
db.recette.hasMany(db.recette, { as: "contenuRecette" });
db.contenuRecette.belongsTo(db.recette, {
  foreignKey: "recetteId",
  as: "recette",
});

module.exports = db;