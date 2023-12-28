const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const forgotPassword = async (req, res) => {
  // importing users Model
  const usersModel = mongoose.model("users");
  const { email } = req.body;
  if (!email) throw "Email is required!";
  const getUser = await usersModel.findOne({
    email: email,
  });
  if (!getUser) throw "This email doesnot exit in the system!";
  // 5 random digit number
  const resetCode = Math.floor(10000 + Math.random() * 90000);

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidators: true,
    }
  );
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
    to: email,
    from: "info@expensetracker.com",
    text: "Your password rest code is " + resetCode,
    html: "Your password rest code is " + resetCode,
    subject: "Reset your password - Expense Tracker Pro!",
  });
  res.status(200).json({
    status: "success",
  });
};
module.exports = forgotPassword;
