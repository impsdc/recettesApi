require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");

const app = express();

global.__basedir = __dirname;

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
// app.use(express.static(".public"));

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "50mb", extended: true }));

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const ingredientCon = require("./app/controllers/ingredient.controller");
app.get("/", ingredientCon.home);

require("./app/routes/ingredient.route")(app);
require("./app/routes/contenuRecette.route")(app);
require("./app/routes/recette.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
