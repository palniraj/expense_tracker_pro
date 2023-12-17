// import dependances 
// always express-async-errors on top
require("express-async-errors");
const express = require("express");
const errorHandler = require("./handlers/errorHandler");

require("dotenv").config();

// create a server
const app = express();

app.use(express.json());

// end of all routes import errorhandler
app.use(errorHandler);
app.listen(8000, ()=>{
    console.log("Server started successfully!");
});