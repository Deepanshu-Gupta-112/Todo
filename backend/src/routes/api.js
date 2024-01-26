const express = require("express");
const route = express.Router();

const { Registration } = require("../controller/Registration");
const { registrationSchema } = require("../validatorSchema/registrationSchema");

route.post("/registration", registrationSchema, Registration);

module.exports = route;
