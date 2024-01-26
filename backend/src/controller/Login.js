const User = require("../models/User");
const { validationResult } = require("express-validator");
const { returnjson } = require("../utils/helpers");
const { StatusCode, JWT_SECRET_TOKEN } = require("../utils/constants");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.Login = async (req, res) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(returnjson(StatusCode.VALIDATION_ERROR, error.mapped()));
  }
  try {
    const { username, password } = req.body;
    const loginUser = await User.findOne({ username }).select(
      "username password"
    );

    if (!loginUser) {
      return res.json(
        returnjson(StatusCode.UNPROCESSABLE_ENTITY, "Username not found")
      );
    }
    const verified = await bcrypt.compareSync(password, loginUser.password);
    if (!verified) {
      return res.json(
        returnjson(StatusCode.UNPROCESSABLE_ENTITY, "Wrong Password")
      );
    }
    const token = await jwt.sign({ userId: loginUser._id }, JWT_SECRET_TOKEN);
    return res.json(
      returnjson(StatusCode.SUCCESS, "Successfullylogin", {
        userId: loginUser._id,
        token: token,
      })
    );
  } catch (error) {
    console.error(error);

    return res.json(
      returnjson(
        StatusCode.INTERNAL_SERVER_ERROR,
        "An error occurred during login."
      )
    );
  }
};
