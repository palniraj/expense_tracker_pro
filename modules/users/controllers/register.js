const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/emailManager");

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

  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  const accessToken = jwtManager(createdUser);
//  

  await emailManagerer(createdUser.email, "Welcome to epxense tracker Pro. We hope you can manage your expense easily from our platfrom!", "<h1>Welcome to epxense tracker PRO.</h1> </br></br> We hope you can manage your expense easily from our platfrom!", "Welcome to Expense Tracker PRO!")

  res.status(201).json({
    status: "User Registered Successfully!",
    accessToken: accessToken,
  });
};

module.exports = register;
