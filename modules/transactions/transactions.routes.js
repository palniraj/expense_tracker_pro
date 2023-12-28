const express = require("express");
const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addincome");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getTransactions");
const deleteTransction = require("./controllers/deleteTransaction");

const transactionRoutes = express.Router();

// Middleware Route...
transactionRoutes.use(auth);
// protected routes...
transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);
transactionRoutes.get("/", getTransactions);
transactionRoutes.delete("/:transaction_id", deleteTransction)

module.exports = transactionRoutes;