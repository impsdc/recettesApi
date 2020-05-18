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

db.ingredient = require("./ingredient.js")(sequelize, Sequelize);
db.contenuRecette = require("./contenuRecette.js")(sequelize, Sequelize);
db.recette = require("./recette.js")(sequelize, Sequelize);
// db.image = require("./image.js")(sequelize, Sequelize);

//relation many to one of contenuRecette to ingredient
db.ingredient.hasMany(db.contenuRecette, { as: "contenuRecette" });
const ingredientAsso = db.contenuRecette.belongsTo(db.ingredient, {
  foreignKey: "ingredientId",
  as: "ingredient",
  onDelete: "cascade",
});

//relation many to one of contenuRecette to recette
db.recette.hasMany(db.contenuRecette, { as: "contenuRecette" });
const recetteAsso = db.contenuRecette.belongsTo(db.recette, {
  foreignKey: "recetteId",
  as: "recette",
  onDelete: "cascade",
});

module.exports = db;
