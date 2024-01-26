const express = require("express");
const route = express.Router();

const { Login } = require("../controller/Login");
const { Registration } = require("../controller/Registration");
const { registrationSchema } = require("../validatorSchema/registrationSchema");
const { loginSchema } = require("../validatorSchema/loginSchema");

route.post("/registration", registrationSchema, Registration);
route.get("/Login", loginSchema, Login);

module.exports = route;
