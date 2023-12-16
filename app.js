// import dependances 
// always express-async-errors on top
require("express-async-errors");
const express = require("express");

// create a server

const app = express();


// end of all routes import errorhandler
app.use(errorHandler);
app.listen(8000, ()=>{
    console.log("Server started successfully!");
});