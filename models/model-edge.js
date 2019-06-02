module.exports = (sequelize, DataTypes) => {
  const Edge = sequelize.define(
    "Edge",
    {
      order: {
        type: DataTypes.INTEGER(64),
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );

  // TODO: from, to associate
  Edge.associate = function(models) {
    models.Edge.belongsTo(models.Vertex, {
      foreignKey: "from",
      as: "parentVertex"
    });
    models.Edge.belongsTo(models.Vertex, {
      foreignKey: "to",
      as: "childVertex"
    });
  };

  return Edge;
};
