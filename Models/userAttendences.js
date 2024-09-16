module.exports = (sequelize, DataTypes) => {
  
  
    const userAttendences = sequelize.define("userAttendences", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        validate:{
          min:3          
        }
        
      },
      date_only: {
        type: DataTypes.DATEONLY,
        
       
        
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: true,
      }
    });
    userAttendences.associate=function(models){
      userAttendences.belongsTo(models.usersInfos,{
        foreignKey:'user_id',
        as:'usersInfos'
    })
    };
  
    return userAttendences;
  };