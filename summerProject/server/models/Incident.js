module.exports = (sequelize, DataTypes) => {
  const Incident = sequelize.define(
    "Incident",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
    },
    {
      timestamps: false,
    }
  );

  Incident.associate = (models) => {
    Incident.belongsTo(models.Category, { foreignKey: "categoryId" });
    Incident.belongsTo(models.User, { foreignKey: "username" });
  };

  return Incident;
};
