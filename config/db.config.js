
module.exports = {
  HOST: process.env.APP_HOST,
  USER: process.env.APP_USER,
  PASSWORD: process.env.APP_PWD,
  DB: process.env.APP_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};