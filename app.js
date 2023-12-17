// import dependances
// always express-async-errors on top
require("express-async-errors");
const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
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

// Model initiallization
require("./models/users.model");

app.use(express.json());

// Routes...
app.use("/api/users", userRoutes);

// end of all routes import errorhandler
app.use(errorHandler);
app.listen(8000, () => {
  console.log("Server started successfully!");
});