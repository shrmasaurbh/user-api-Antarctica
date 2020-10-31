const Sequelize =require('sequelize');
const moment =require('moment');

const db = require('../../config/connections');
const Op = Sequelize.Op; 

//{"size": 3, "pageId": 1, "filters": {"is_active":1,"email":"sas@.com","mobile_number":354474534534,"user_id":35447,"role_ids":[10,3],"deletedby_id":35447,"createdAt":{"to":"2020-03-27","from":"2020-03-25"} ,"updatedAt":{"to":"2020-03-27","from":"2020-03-25"} }  }
module.exports = {

  async getUserListing(query) {
      // var order= [['added_date', 'ASC']];
    const {
    pageId, size,
    ids,
    order,
    first_name: firstName,
    last_name: lastName,
    emp_id: empId,
    company_name: companyName,
  } = query;

  let pageListId = 1;
  let pageSize = 16;

  if (pageId) {
    pageListId = Number(pageId);
  }

  if (size) {
    pageSize = Number(size);
  }

  const offset = (pageListId - 1) * pageSize;

  const options = {
    attributes: [
      'user_id', 'first_name', 'last_name'
    ],
    where: {},
    limit: pageSize,
    offset,
    // order: [['id', 'desc']],
  };

  options.include = [
    {
      model: db.employee,
      attributes: ['id', 'company_name', 'emp_id'],
      as: 'Emp',
      where:{}
    }
  ];

  if(order){
    if(order === "emp_id" || order === "company_name" ){
      options.include[0].order = [[order, 'desc']];

    }else{
      options.order = [[order, 'desc']];
    }
  }

  if (firstName) {
    options.where.first_name = firstName;
  }

  if (lastName) {
    options.where.last_name = lastName;
  }

  if (empId) {
    // options.include[0].where = {};
    options.include[0].where.emp_id = empId;
  }

    if (companyName) {
    // options.include[0].where = {};
    options.include[0].where.company_name = companyName;
  }


  return await db.users
    .findAndCountAll(options);




      // var attributes =  {
      //                     exclude: ['password']
      //                 };
      
      // var include = [ 
      //                 {
      //                   model: db.address,
      //                   as: "addresses",
      //                   // attributes: ['user_id','name']
      //                 },
      //                 {
      //                   model: db.roles,
                    
      //                 }
                      
      // ];


      // var where = {};
      // var order= [['name', 'ASC']];

      // if(filters.hasOwnProperty('user_id')){
      //     where = Object.assign(where, {"user_id":filters.user_id});
      // }

      // if(filters.hasOwnProperty('mobile_number')){
      //     where = Object.assign(where, {"mobile_number":filters.mobile_number});
      // }

      // if(filters.hasOwnProperty('email')){
      //     where = Object.assign(where, {"email":filters.email});
      // }

      // if(filters.hasOwnProperty('is_active')){
      //     where = Object.assign(where, {"is_active":filters.is_active});
      // }

      // if(filters.hasOwnProperty('role_ids')){
      
      //     where = Object.assign(where, {"role_id":{[Op.or]:filters.role_ids}});
      // }


      // if(filters.hasOwnProperty('updatedAt')){
      
      //     where = Object.assign(where, {"updatedAt":{
      //                                           [Op.between]: [filters.updatedAt.from, moment(filters.updatedAt.to).add(1, 'days').format("YYYY-MM-DD")]

      //                                                 }});
      //     order= [['updatedAt', 'DESC']]
      // }

      // if(filters.hasOwnProperty('createdAt')){
      //     order= [['createdAt', 'DESC']]
      
      //     where = Object.assign(where, {"createdAt":{
      //                                           [Op.between]: [filters.createdAt.from, moment(filters.createdAt.to).add(1, 'days').format("YYYY-MM-DD")]

      //                                                 }});
      // }

      // return await db.users.findAndCountAll({  attributes, where,include , offset: fromData, limit: size, order });

  },


     
}