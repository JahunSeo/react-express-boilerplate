const models = require("./models");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.js")[env];

module.exports = () => {
  //   models.sequelize.sync({
  //     force: config.db.forceSync,
  //     alter: config.db.alter
  //   });
  //   models.User.sync({ force: true });
  //   models.Vertex.sync({ force: true });
  //   models.Edge.sync({ force: true });
};
