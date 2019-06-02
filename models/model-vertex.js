module.exports = (sequelize, DataTypes) => {
  const Vertex = sequelize.define(
    "Vertex",
    {
      type: {
        type: DataTypes.STRING(16),
        allowNull: false,
        defaultValue: "BEAD" // "THREAD"
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ""
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    { timestamps: true }
  );

  Vertex.associate = function(models) {
    models.Vertex.belongsTo(models.User, {
      foreignKey: "email",
      targetKey: "email"
    });
    models.Vertex.hasMany(models.Edge, { foreignKey: "from" });
    models.Vertex.hasMany(models.Edge, { foreignKey: "to" });
  };

  return Vertex;
};
