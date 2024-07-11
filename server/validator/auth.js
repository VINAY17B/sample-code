const { check } = require("express-validator");

exports.userValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Enter valid email"),
  check("password").isLength({ min: 6 }).withMessage("6 characters long"),
];

exports.userloginValidator = [
  check("email").isEmail().withMessage("Enter valid email"),
  check("password").isLength({ min: 6 }).withMessage("6 characters long"),
];

exports.forgotpasswordValidator = [
  check("email").not().isEmpty().isEmail().withMessage("Enter valid email"),
];

exports.resetpasswordValidator = [
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("6 characters long"),
];
