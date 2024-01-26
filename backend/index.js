const express = require("express");
const app = express();
const mongoose = require("mongoose");

const apiRoute = require("./src/routes/api");

var PORT = 3000;

app.use(express.json());

//  Database connection
const connectWithDb = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect("mongodb://127.0.0.1:27017/todo_mern")
    .then(() => {
      console.log("DB Connected Successfully");
    })
    .catch((error) => {
      console.log("DB Facing Connection Issues");
      console.error(error);
      process.exit(1);
    });
};

app.use("/api/", apiRoute);

app.listen(PORT, () => {
  connectWithDb();
  console.log(`Server at ${PORT}`);
});
