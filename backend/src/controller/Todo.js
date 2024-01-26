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

exports.GetTodos = async (req, res) => {
  try {
    const list = await User.findById(req.userId)
      .select("-password -email")
      .populate("todos")
      .exec();
    return res.json(
      returnjson(StatusCode.SUCCESS, "All Todo is Fetched", list)
    );
  } catch (error) {
    return res.json(
      returnjson(StatusCode.UNPROCESSABLE_ENTITY, "Something Went Wrong", error)
    );
  }
};

exports.MarkTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json(
      returnjson(
        StatusCode.VALIDATION_ERROR,
        "Todo Id is requried",
        error.mapped()
      )
    );
  }
  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.body.todo_id,
        userId: req.userId,
      },
      [
        {
          $set: {
            isCompleted: {
              $eq: [false, "$isCompleted"],
            },
          },
        },
      ]
    );

    return res.json(
      returnjson(StatusCode.SUCCESS, "SucessFully Updayed", todo)
    );
  } catch (error) {
    res.json(
      returnjson(StatusCode.UNPROCESSABLE_ENTITY, "Something Went Wrong", error)
    );
  }
};
