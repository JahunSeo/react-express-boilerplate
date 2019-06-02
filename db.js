const models = require("./models");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.js")[env];

module.exports = () => {
  try {
    console.log("db sync!");
    models.sequelize.sync({
      force: config.db.forceSync,
      alter: config.db.alter
    });
    // models.Edge.sync({ force: true });
    // models.Vertex.sync({ force: true });
    // models.User.sync({ force: true });
  } catch (err) {
    console.log("error in db sync!", err);
  }
};
