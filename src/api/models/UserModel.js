const Sequelize =require('sequelize')
const db = require('../../config/connections');
 
module.exports = function(sequelize, DataTypes){
	var users = sequelize.define('users', {
		user_id: {
		type: DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
		// field: 'user_id',
	},	

	first_name : {
		type: DataTypes.STRING,
		allowNull: false
	},
	
	last_name : {
		type: DataTypes.STRING,
		allowNull: false
	},

	email : {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true, 
		validate: { isEmail: {msg: "Email number invalid."} }
	},
	
	
	
	password : {
		type: DataTypes.STRING,
		allowNull: false,
	},
		
	is_active : DataTypes.BOOLEAN,

	createdAt: {
		 // field: 'created_at',
		 type: DataTypes.DATE,
	 },
	 updatedAt: {
		 // field: 'updated_at',
		 type: DataTypes.DATE,
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
		 
	 }
	},{
	  // don't add the timestamp attributes (updatedAt, createdAt)
		freezeTableName: true,
  		tableName: 'users'

	  // your other configuration here

	})
	return users;
};