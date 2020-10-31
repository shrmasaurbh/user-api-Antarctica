var express = require('express');
var router = express.Router();
const userCont = require("../api/controllers/user/UserController");
const authenticate = require('../api/middleware/authorization').authenticate;


router
  .route('/list')
  .all(authenticate)
  .get(userCont.getUserListing)
  // .delete(userCont.userAll)

router
  .route('/autocomplete')
  .all(authenticate)
  .get(userCont.userListAutocomplete)

router
  .route('/employees')
  .all(authenticate)
  .get(userCont.getEmployee)


router
  .route('/:user_id')
  .all(authenticate)
  .get(userCont.userDetails)

module.exports = router;
