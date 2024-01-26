const { validationResult } = require("express-validator");
const { returnjson } = require("../utils/helpers");
const { StatusCode, JWT_SECRET_TOKEN } = require("../utils/constants");
const bcrypt = require("bcrypt");
const User = require("../models/User");
var jwt = require("jsonwebtoken");

exports.Registration = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(returnjson(StatusCode.VALIDATION_ERROR, errors.mapped()));
  }

  const { name, username, password, email } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      return res.json(
        returnjson(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Email or Username Already Exists Try Another"
        )
      );
    }

    let userData = {
      name: name,
      email: email,
      password: hashedPassword,
      username: username,
    };

    const result = await User.create(userData);
    const token = jwt.sign({ userId: result._id }, JWT_SECRET_TOKEN);
    userData.password = undefined;

    return res.json(
      returnjson(StatusCode.SUCCESS, "Registration Complete", {
        userId: result._id,
        token: token,
      })
    );
  } catch (error) {
    console.error(error);

    return res.json(
      returnjson(
        StatusCode.INTERNAL_SERVER_ERROR,
        "An error occurred during registration."
      )
    );
  }
};
