const { body,validationResult } = require("express-validator");
const db = require('../../config/connections');

exports.registerMiddleware = [
	// Validate fields.
	body("first_name").exists().trim().isLength({ min: 3 }).withMessage("First name must be specified."),
	body("last_name").exists().trim().isLength({ min: 3 }).withMessage("First name must be specified."),
	body("email").exists().isLength({ min: 5 }).trim().withMessage("Email must be specified.")
		.normalizeEmail().isEmail().withMessage("Email must be a valid email address.").custom(async (value) => { console.log(value)
			return await db.users.findOne({ where: {email: value}}).then((user) => {
				if (user) {
					return Promise.reject("Email already in use");
				}
			});
		}),
	body("password").exists().isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	body("confirmpassword").exists().isLength({ min: 6 }).trim().withMessage("Confirm password must be 6 characters or greater.")
		.custom((value, { req }) => {
		  if (value !== req.body.password) {
		    throw new Error('Password confirmation does not match password');
		  }
		  return true;
		}),
	];

exports.loginMiddleware = [
	// Validate fields.
	body("email").exists().isLength({ min: 5 }).trim().withMessage("Email must be specified.")
		.normalizeEmail().isEmail().withMessage("Email must be a valid email address."),
	body("password").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	]

exports.forgotpwMiddleware = [
	// Validate fields.
	body("email").exists().isLength({ min: 5 }).trim().withMessage("Email must be specified.")
		.normalizeEmail().isEmail().withMessage("Email must be a valid email address.").custom(async (value) => { console.log(value)
			return await db.users.findOne({ where: {email: value}}).then((user) => {
				if (user) {
					return Promise.reject("Email already in use");
				}
			});
		})
	];


exports.changepwMiddleware = [
	// Validate fields.
	body("email").exists().isLength({ min: 5 }).trim().withMessage("Email must be specified.")
		.normalizeEmail().isEmail().withMessage("Email must be a valid email address.").custom(async (value) => { console.log(value)
			return await db.users.findOne({ where: {email: value}}).then((user) => {
				if (user) {
					return Promise.reject("Email already in use");
				}
			});
		}),
	body("password").exists().isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	body("confirmpassword").exists().isLength({ min: 6 }).trim().withMessage("Confirm password must be 6 characters or greater.")
		.custom((value, { req }) => {
		  if (value !== req.body.password) {
		    throw new Error('Password confirmation does not match password');
		  }
		  return true;
		}),
	];

exports.updatepwMiddleware = [
	// Validate fields.

	body("currentpassword").exists().trim(),
	body("password").exists().isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
	body("confirmpassword").exists().isLength({ min: 6 }).trim().withMessage("Confirm password must be 6 characters or greater.")
		.custom((value, { req }) => {
		  if (value !== req.body.password) {
		    throw new Error('Password confirmation does not match password');
		  }
		  return true;
		}),
	// Sanitize fields.
	// sanitizeBody("password").escape(),
	// sanitizeBody("mobile_number").escape(),
	];