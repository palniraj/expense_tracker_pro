// import dependances
// always express-async-errors on top
require("express-async-errors");
const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
require("dotenv").config();

// create a server
const app = express();
mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("Mongo connection successfull!");
  })
  .catch(() => {
    console.log("Mongo connection failed!");
  });

app.use(express.json());

// end of all routes import errorhandler
app.use(errorHandler);
app.listen(8000, () => {
  console.log("Server started successfully!");
});