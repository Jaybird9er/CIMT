
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  User.associate = (models) => {
    
    User.hasOne(models.Admin, {
      foreignKey: "username",
    });

    User.hasOne(models.Provider, {
      foreignKey: "username",
    });

    User.hasOne(models.CimtUser, {
      foreignKey: "username",
    });

    User.hasMany(models.Resource, { foreignKey: "username"
    });

    User.hasMany(models.Incident, { foreignKey: "username"
    });
  };

  return User
};
