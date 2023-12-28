// import dependances
// always express-async-errors on top
require("express-async-errors");
const express = require("express");
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/transactions/transactions.routes");
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
require("./models/transactions.model");

app.use(express.json());

// Routes...
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// end of all routes import errorhandler
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Not found!",
  });
});
app.use(errorHandler);
app.listen(8000, () => {
  console.log("Server started successfully!");
});
