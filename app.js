// import dependances 
// always express-async-errors on top
require("express-async-errors");
const express = require("express");

// create a server

const app = express();

app.listen(8000, ()=>{
    console.log("Server started successfully!");
});