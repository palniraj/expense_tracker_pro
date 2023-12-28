const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtManager");
const nodemailer = require("nodemailer");

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

  const createUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  const accessToken = jwtManager(createUser);
  // configuration for nodemailer (trasporter)
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ed3f281a1566dc",
      pass: "5f9692aed81837",
    },
  });
  // use it for sending email
  transport.sendMail({
    to: createUser.email,
    from: "info@expensetracker.com",
    text: "Welcome to epxense tracker Pro. We hope you can manage your expense easily from our platfrom!",
    html: "<h1>Welcome to epxense tracker PRO.</h1> </br></br> We hope you can manage your expense easily from our platfrom!",
    subject: "Welcome to Expense Tracker PRO!",
  })

  res.status(201).json({
    status: "User Registered Successfully!",
    accessToken: accessToken,
  });
};

module.exports = register;
