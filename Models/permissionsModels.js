module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define('permissions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'permissions',
    timestamps: false,
  });

  return Permissions;
};
