"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename); // index.js
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    define: {
      collate: "utf8mb4_general_ci"
    },
    dialect: config.db.dialect,
    host: config.db.host,
    logging: false
  }
);

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.db.use_env_variable], config.db);
// } else {
//   sequelize = new Sequelize(
//     config.db.database,
//     config.db.username,
//     config.db.password,
//     config.db
//   );
// }

const db = {};
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  // if ("associate" in db[modelName])
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
