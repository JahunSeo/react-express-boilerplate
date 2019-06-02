module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(128),
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false
      }
    },
    { timestamps: true }
  );

  User.associate = function(models) {
    models.User.hasMany(models.Vertex, {
      foreignKey: "email",
      sourceKey: "email"
    });
  };

  return User;
};
