const dbConfig = require('../Config/dbConfig.js');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    define: { timestamps: false },
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

sequelize.authenticate()
  .then(() => console.log('Connected to database'))
  .catch(err => console.log('Error ' + err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.usersInfos = require('./usersInfos.js')(sequelize, DataTypes);
db.userAttendences = require('./userAttendences.js')(sequelize, DataTypes);
db.Roles = require('./rolesModels.js')(sequelize, DataTypes);
db.Permissions = require('./permissionsModels.js')(sequelize, DataTypes);
db.UserRoles = require('./userRolesModels.js')(sequelize, DataTypes);
db.RolesPermissions = require('./rolesPermissionsModels.js')(sequelize, DataTypes);

// Sync the database
// db.sequelize.sync({ force: false })
//   .then(() => console.log('Database re-sync done'))
//   .catch(err => console.log('re-sync Error ' + err));

// Relationships
try {
  // Users and UserAttendences (1-to-Many)
  db.usersInfos.hasMany(db.userAttendences, { foreignKey: 'user_id', as: 'userAttendences' });
  db.userAttendences.belongsTo(db.usersInfos, { foreignKey: 'user_id', as: 'usersInfos' });
  
  // Users and UserRoles (1-to-Many)
  db.usersInfos.hasMany(db.UserRoles, { foreignKey: 'user_id', as: 'usersRolesUser' });
  db.UserRoles.belongsTo(db.usersInfos, { foreignKey: 'user_id', as: 'usersRoles' });
  
  // Roles and UserRoles (1-to-Many)
  db.Roles.hasMany(db.UserRoles, { foreignKey: 'role_id', as: 'roleUsers' });
  db.UserRoles.belongsTo(db.Roles, { foreignKey: 'role_id', as: 'roles' });
  
  // Roles and Permissions (Many-to-Many)
  db.Roles.belongsToMany(db.Permissions, { through: db.RolesPermissions, foreignKey: 'role_id', otherKey: 'permission_id', as: 'permissions' });
  db.Permissions.belongsToMany(db.Roles, { through: db.RolesPermissions, foreignKey: 'permission_id', otherKey: 'role_id', as: 'roles' });
  
  // Users and Roles (Many-to-Many)
  db.usersInfos.belongsToMany(db.Roles, { through: db.UserRoles, foreignKey: 'user_id', otherKey: 'role_id', as: 'roles' });
  db.Roles.belongsToMany(db.usersInfos, { through: db.UserRoles, foreignKey: 'role_id', otherKey: 'user_id', as: 'users' });

} catch (err) {
  console.log(err);
}

module.exports = db;
























// const dbConfig=require('../Config/dbConfig.js');
// const {Sequelize, DataTypes}= require('sequelize');
// const sequalize=new Sequelize(
//     dbConfig.database,
//     dbConfig.username,
//     dbConfig.password,{

//         host: dbConfig.host,
//         dialect:dbConfig.dialect,
//         operatorsAliases: false,

//         define: {
//             timestamps: false,            
//           },
//         pool:{
//             max:dbConfig.pool.max,
//             min:dbConfig.pool.min,
//             acquire:dbConfig.pool.acquire,
//             idle:dbConfig.pool.idle
//         }
//     }
    
// )

// sequalize.authenticate()
// .then(()=>{
//     console.log(`it is Connected to database`)
// })

// .catch(err=>{
// console.log('Error '+ err)
// })

// const db={}

// db.Sequelize= Sequelize
// db.sequalize= sequalize

// db.usersInfos=require('./usersInfos.js')(sequalize,DataTypes)
// db.userAttendences=require('./userAttendences.js')(sequalize,DataTypes)
// db.Roles=require('./rolesModels.js')(sequalize,DataTypes)
// db.Permissions=require('./permissionsModels.js')(sequalize,DataTypes)
// db.UserRoles=require('./userRolesModels.js')(sequalize,DataTypes)
// db.RolesPermissions=require('./rolesPermissionsModels.js')
// // db.userAuth = require('./userAuth.js')(sequalize,DataTypes)
// // db.usersInfos.associate(db);
// // db.userAttendences.associate(db);

// db.sequalize.sync({force:false})
// .then(()=>{
//     console.log('Database re-sync done')
// })
// .catch(err =>{
//     console.log('re-sync Error '+ err)
// })


// //1 to many relation

// // db.usersInfos.hasOne(db.userAttendences,{
// //     foreignKey:'user_id',
// //     as:'userAttendences'
// // })

// // db.userAttendences.belongsTo(db.usersInfos,{
// //     foreignKey:'user_id',
// //     as:'usersInfos'
// // })



// //Relatioship between user model and attendances model
// try{
// db.usersInfos.hasMany(db.userAttendences, {
//     foreignKey: 'user_id',  
//     as: 'userAttendences'
// });
// db.userAttendences.belongsTo(db.usersInfos, {
//     foreignKey: 'user_id',  
//     as: 'usersInfos'
// });
// }
// catch(err){
//     console.log(err);
// }


// // Relatioship between user model and userRoles model
// try{
// db.usersInfos.hasMany(db.UserRoles, {
//      foreignKey: 'user_id', 
//      as: 'usersRolesUser' });

// db.UserRoles.belongsTo(db.usersInfos, { 
//     foreignKey: 'user_id', 
//     as: 'usersRoles' });
// }
// catch(err){
//     console.log(err);
// }


// // //Relatioship between roles model and rolesPermission model
// try{
// // Many-to-Many Relationship between Roles and Permissions through RolesPermissions table
// db.Roles.belongsToMany(db.Permissions, {
//     through: db.RolesPermissions,
//     foreignKey: 'role_id',
//     otherKey: 'permission_id',
//     as: 'permissions',
//   });
  
//   db.Permissions.belongsTo(db.Roles, {
//     through: db.RolesPermissions,
//     foreignKey: 'permission_id',
//     otherKey: 'role_id',
//     as: 'roles',
//   });}
// catch(err){
//     console.log(err);
// }

// // In usersInfos model

  


// // Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'roleId', as: 'permissions' });
// // Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permissionId', as: 'roles' });




// // console.log(db.usersInfos instanceof Sequelize.Model); // Should print true
// // console.log(db.userAttendences instanceof Sequelize.Model); 


// module.exports=db