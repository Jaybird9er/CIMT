module.exports = (sequelize, DataTypes) => {
  const Capability = sequelize.define(
    "Capability",
    {
      capability: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false }
  );

  Capability.associate = (models) => {
    Capability.belongsTo(models.Resource,{ foreignKey:'resourceId'})
  }

  return Capability;
};
