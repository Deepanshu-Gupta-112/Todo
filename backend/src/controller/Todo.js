const { validationResult } = require("express-validator");
const { returnjson } = require("../utils/helpers");
const { StatusCode } = require("../utils/constants");

const User = require("../models/User");
const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      returnjson(
        StatusCode.VALIDATION_ERROR,
        "Todo is requried",
        error.mapped()
      )
    );
  }
  try {
    const result = await Todo.create({
      userId: req.userId,
      desc: req.body.desc,
    });
    if (result) {
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $push: { todos: result },
        }
      );
      console.log(user);
      return res.json(
        returnjson(StatusCode.SUCCESS, "Todo created Successfully")
      );
    }
  } catch (error) {
    return res.json(
      returnjson(StatusCode.UNPROCESSABLE_ENTITY, "Something Went Wrong")
    );
  }
};
