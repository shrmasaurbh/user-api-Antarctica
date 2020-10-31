// const UserDB = require("../../models/UserModel");
// const { validationResult } = require("express-validator");
const apiResp = require(BASEPATH+'/src/helpers/apiResponse');
const db = require('../../../config/connections');
const Sequelize =require('sequelize');
const UserDAL = require('../../DAL/Users');
var moment = require('moment');

module.exports = {
    
    async getUserListing(req, res) {

                
        var err = {
                    "message": ""
                };
        var meta ={
                    "status": 200,
                    // "error" : false
                }
        
        try{
            const { count, rows: users } = await UserDAL.getUserListing(req.query);

            if(count){ 
                 meta.count = count;
                
                return apiResp.apiResp( req, res, users, meta );
            
            }else{
                meta.message = "DATA not found";
                return apiResp.apiErr( req, res, 400, meta);
            }

        }catch (err) {
            return apiResp.apiErr( req, res, 400, err);  
        }
    },

  
    async userDetails(req, res) {
     
        var err = {
                    "message": ""
                };
        var meta ={
                    "status": 200,
                    // "error" : false
                }
        try{
                        // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            var include = [ 
                            {
                              model: db.employee,
                              as: "employee",
                            },
                            
                        ];
            await db.users.findOne({ attributes: {
                                                    exclude: ['password']
                                                },
                                    where: {user_id: parseInt(req.params.user_id)} ,
                                    include
                                })
                    .then(user_data => {
                        
                        if(user_data){
                            user_data.dataValues.createdAt = user_data.dataValues.createdAt ? moment(user_data.dataValues.createdAt).format('llll') : null;
                            user_data.dataValues.updatedAt = user_data.dataValues.updatedAt? moment(user_data.dataValues.updatedAt).format('llll') : null;
                            return apiResp.apiResp( req, res, user_data, meta );
                                    
                        }
                        err.message = "User not found"
                        // console.log(meta)
                        return apiResp.apiErr( req, res, 400, err);
                        // throw new Error('Invalid object');
                        
                        // console.log(aa)
                        // res.status(200).send(data);
                    })
                    .catch(err => {
                        apiResp.apiErr( req, res, 400, err);
                    })
                    // console.log("user",user)
        } 
        catch (err) {
            apiResp.apiErr( req, res, 400, err);
        }       
    },

    async userListAutocomplete(req, res) {

                
        var err = {
                    "message": ""
                };
        var meta ={
                    "status": 200,
                    // "error" : false
                }

        const Op = Sequelize.Op;

        if (typeof req.query.q !== 'undefined' || req.query.q !== null) {
            let queryStr = req.query.q;
            try{
                
                await db.users.findAll({ 
                                        
                                        where: {first_name:{ [Op.like]: '%'+queryStr+'%' },  "is_active":1 },
                                        attributes: ['user_id','first_name','last_name']

                                    })
                        .then(user_data => {
                            console.log(user_data)
                            if(user_data){
                                return apiResp.apiResp( req, res, user_data, meta );
                                        
                            }
                            err.message = "user not found"
                            // // console.log(meta)
                            return apiResp.apiErr( req, res, 400, err);
                            // throw new Error('Invalid object');
                            
                            // console.log(aa)
                            // res.status(200).send(data);
                        })
                        .catch(err => {
                            apiResp.apiErr( req, res, 400, err);
                        })
                        // console.log("user",project)
            } 
            catch (err) {
                apiResp.apiErr( req, res, 400, err);
            } 
        }      
    },
    
   
    async getEmployee(req, res) {
        var err = {
                    "message": ""
                };
        var meta ={
                    "status": 200,
                    // "error" : false
                }
        try{
                // req.body.user_id = req.requester.id;
                let employee = await db.employee.findAll({where: {user_id: req.requester.id}});
                return apiResp.apiResp( req, res, employee, meta );
        } 
        catch (err) {
            return apiResp.apiErr( req, res, 300, err);
        }       
    },
    
    

}
