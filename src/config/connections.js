const winston = require('winston')
const Sequelize =require('sequelize')
const db ={}

var sequelize = new Sequelize(CONFIG.mysqldb_name, CONFIG.mysqldb_user, CONFIG.mysqldb_password, {
  host: CONFIG.mysqldb_host,
  dialect: CONFIG.mysqldb_dialect,
  operatorAliases: false,
  freezeTableName: true,
  // underscored: true,
  timezone: '+05:30' //for writing to database
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../api/models/UserModel")(sequelize,Sequelize);
db.employee = require("../api/models/EmployeeModel")(sequelize,Sequelize);


// db.users.hasOne(db.employee , {foreignKey: 'role_id',sourceKey: 'role_id'});
db.users.hasOne(db.employee , { as:'Emp', foreignKey : 'user_id'});

module.exports = db;