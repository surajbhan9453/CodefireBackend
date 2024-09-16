// exports.dbConfig = {
module.exports={
    host: "localhost",
    username: "root",
    password: "codefire",
    database: "newDB",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };