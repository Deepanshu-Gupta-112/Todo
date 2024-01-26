const express = require("express");
const route = express.Router();

const { body } = require("express-validator");
const { Login } = require("../controller/Login");
const { Registration } = require("../controller/Registration");
const { registrationSchema } = require("../validatorSchema/registrationSchema");
const { loginSchema } = require("../validatorSchema/loginSchema");
const {
  createTodo,
  GetTodos,
  MarkTodo,
  DeleteTodo,
} = require("../controller/Todo");
const { AuthMiddleware } = require("../middlewares/Auth");

route.post("/registration", registrationSchema, Registration);
route.get("/Login", loginSchema, Login);

route.post(
  "/createtodo",
  AuthMiddleware,
  [body("desc", "Todo Description is Required").exists()],
  createTodo
);
route.get("/getalltodo", AuthMiddleware, GetTodos);
route.put(
  "/updatetodo",
  AuthMiddleware,
  [body("todo_id", "Todo Id is Required").exists()],
  MarkTodo
);
route.delete(
  "/deletetodo",
  AuthMiddleware,
  [body("todo_id", "Todo Id is Required").exists()],
  DeleteTodo
);

module.exports = route;
