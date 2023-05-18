module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define(
    "Resource",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      resourceName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      PFunctionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      SFunctionId: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
      },
      distance: {
        type: DataTypes.DECIMAL(10, 1),
        defaultValue: null,
      },
      cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Resource.associate = (models) => {
    Resource.belongsTo(models.User, { foreignKey: "username" });
    Resource.belongsTo(models.Unit, { foreignKey: "unitId" });
    Resource.belongsTo(models.ResourceFunction, { foreignKey: "SFunctionId" });
    Resource.belongsTo(models.ResourceFunction, { foreignKey: "PFunctionId" });
    Resource.hasMany(models.Capability, { foreignKey: "resourceId" });
  };

  return Resource;
};
