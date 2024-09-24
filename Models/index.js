const dbConfig=require('../Config/dbConfig.js');
const {Sequelize, DataTypes}= require('sequelize');
const sequalize=new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,{

        host: dbConfig.host,
        dialect:dbConfig.dialect,
        operatorsAliases: false,

        define: {
            timestamps: false,
            
          },
        pool:{
            max:dbConfig.pool.max,
            min:dbConfig.pool.min,
            acquire:dbConfig.pool.acquire,
            idle:dbConfig.pool.idle
        }
    }
    
)

sequalize.authenticate()
.then(()=>{
    console.log(`it is Connected`)
})

.catch(err=>{
console.log('Error '+ err)
})

const db={}

db.Sequelize= Sequelize
db.sequalize= sequalize

db.usersInfos=require('./usersInfos.js')(sequalize,DataTypes)
db.userAttendences=require('./userAttendences.js')(sequalize,DataTypes)
// db.userAuth = require('./userAuth.js')(sequalize,DataTypes)
// db.usersInfos.associate(db);
// db.userAttendences.associate(db);

// db.sequalize.sync({force:false})
// .then(()=>{
//     console.log('Database re-sync done')
// })
// .catch(err =>{
//     console.log('re-sync Error '+ err)
// })


//1 to many relation

// db.usersInfos.hasOne(db.userAttendences,{
//     foreignKey:'user_id',
//     as:'userAttendences'
// })

// db.userAttendences.belongsTo(db.usersInfos,{
//     foreignKey:'user_id',
//     as:'usersInfos'
// })




db.usersInfos.hasMany(db.userAttendences, {
    foreignKey: 'user_id',  
    as: 'userAttendences'
});
db.userAttendences.belongsTo(db.usersInfos, {
    foreignKey: 'user_id',  
    as: 'usersInfos'
});
// console.log(db.usersInfos instanceof Sequelize.Model); // Should print true
// console.log(db.userAttendences instanceof Sequelize.Model); 


module.exports=db