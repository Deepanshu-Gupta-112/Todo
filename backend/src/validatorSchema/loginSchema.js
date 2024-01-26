const { body, validationResult } = require("express-validator");

exports.loginSchema = [
  body("username", "username is requried")
    .exists()
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric character Only")
    .trim(),
  body("password", "password is required").isLength({ min: 6, max: 15 }).trim(),
];
