const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");
  // destructuring
  const { email, password, confirm_password, name, balance } = req.body;
  // validating & throwing own custom exception
  if (!email) throw "Email must be provided!";
  if (!password) throw "Password must be provided!";
  if (password.length < 5) throw "Password must be at least 5 characters long.";
  if (!name) throw "Name is required!";
  if (password !== confirm_password)
    throw "Password and confirm password doesnot match!";

  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });
  if (getDuplicateEmail) throw "This email already exists!";

  const hashedPassword = await bcrypt.hash(password, 12);

 const createUser =  await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  const accessToken = jwtManager(createUser);

  res.status(201).json({
    status: "User Registered Successfully!",
    accessToken: accessToken
  });
};

module.exports = register;
