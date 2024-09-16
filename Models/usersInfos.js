
module.exports = (sequelize, DataTypes) => {
  
    const usersInfos = sequelize.define('usersInfos', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
       
        validate:{        
          is: /^[a-zA-Z ]+$/i,          
      },

        
        // get(){
        //   const usename=this.getDataValue("name");
        //   return usename?usename.toUpperCase():null;
        // }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
    });
    usersInfos.associate = function(models){
      usersInfos.hasMany(models.userAttendences,{
        foreignKey:'user_id',
        as:'userAttendence'
    })
    };
 
  
    return usersInfos;
  };