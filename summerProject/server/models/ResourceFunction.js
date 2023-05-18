module.exports = (sequelize, DataTypes) => {
  const ResourceFunction = sequelize.define(
    "ResourceFunction",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
  ResourceFunction.associate = (models) => {
    ResourceFunction.hasMany(models.Resource, { foreignKey: "SFunctionId" });
    ResourceFunction.hasMany(models.Resource, { foreignKey: "PFunctionId" });
  };

  return ResourceFunction;
};
