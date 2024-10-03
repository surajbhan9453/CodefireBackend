
  module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define('roles', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description:{
        type: DataTypes.STRING,
        allowNull: true,
    }
    }, {
      tableName: 'roles',
      timestamps: false,
    });
  
    return Roles;
  };
  