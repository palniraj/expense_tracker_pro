const express = require("express");
const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addincome");
const addExpense = require("./controllers/addExpense");

const transactionRoutes = express.Router();

// Middleware Route...
transactionRoutes.use(auth);
// protected routes...
transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);

module.exports = transactionRoutes;