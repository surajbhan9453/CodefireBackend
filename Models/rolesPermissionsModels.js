
  module.exports = (sequelize, DataTypes) => {
    const RolesPermissions = sequelize.define('rolesPermissions', {
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'roles', // Reference to the roles table
          key: 'id',
        },
      },
      permission_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'permissions', // Reference to the permissions table
          key: 'id',
        },
      },
    }, {
      tableName: 'rolesPermissions',
      timestamps: false,
    });
  
    return RolesPermissions;
  };
  