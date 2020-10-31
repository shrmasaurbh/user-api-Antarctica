const Sequelize =require('sequelize')
const db = require('../../config/connections');

module.exports = function(sequelize, DataTypes){
	var employee = sequelize.define('employee', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement:true,
		allowNull: false,
		// field: 'user_id',
	},	

	user_id: DataTypes.INTEGER,
	company_name: DataTypes.STRING,
	emp_id: DataTypes.STRING,

	},{
	  // don't add the timestamp attributes (updatedAt, createdAt)
		timestamps: false,
		underscored: true,
		freezeTableName: true,
  		tableName: 'employee'

	  // your other configuration here

	})
	return employee;
};