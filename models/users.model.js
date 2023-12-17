const mongoose = require("mongoose");
// creating users schema
const usersSchema = new mongoose.Schema({
    full_name:{
        type: String,
        required: [true, "Name is required"]
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    balance:{
        type: Number,
        required: [true, "Balance is required"],
        default: 0
    }

})
// creating model
const usersModel = mongoose.model("users", usersSchema);
// exporting
module.exports = usersModel;