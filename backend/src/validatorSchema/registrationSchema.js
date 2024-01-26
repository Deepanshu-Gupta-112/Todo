const { body } = require("express-validator");

exports.registrationSchema = [
  body("name").trim().isAlpha().withMessage("Name Should be Aplhabets only"),
  body("username", "username is requried")
    .exists()
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric character Only")
    .trim(),
  body("password", "password is required").isLength({ min: 6, max: 15 }).trim(),
  body("email", "Email is required").exists().isEmail(),
];
