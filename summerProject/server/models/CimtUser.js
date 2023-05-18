module.exports = (sequelize, DataTypes) => {
  const CimtUser = sequelize.define(
    "CimtUser",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      phone: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );


  return CimtUser;
};
