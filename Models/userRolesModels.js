module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define('userRoles', {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usersInfos', // Refers to usersInfos table
        key: 'id',
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles', // Refers to roles table
        key: 'id',
      },
    },
  });

  return UserRoles;
};
