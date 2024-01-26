const { StatusCode, JWT_SECRET_TOKEN } = require("../utils/constants");
const { returnjson } = require("../utils/helpers");
var jwt = require("jsonwebtoken");

exports.AuthMiddleware = (req, res, next) => {
  if (req.headers["auth"] === undefined) {
    return res.json(returnjson(StatusCode.AuthError, "Access Denied"));
  }

  const token = req.headers["auth"];
  try {
    const decode = jwt.verify(token, JWT_SECRET_TOKEN);
    console.log(decode);
    req.userId = decode.userId;
    return next();
  } catch (error) {
    return res.json(
      returnjson(StatusCode.UNPROCESSABLE_ENTITY, "Invalid Token")
    );
  }
};
