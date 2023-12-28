const mongoose = require("mongoose");
const emailManager = require("../../managers/emailManager");

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

  await emailManager(
    email,
    "Your password rest code is " + resetCode,
    "Your password rest code is " + resetCode,
    "Reset your password - Expense Tracker Pro!",
  );
  res.status(200).json({
    status: "success",
    message: "Reset code sent to email successfully!",
  });
};
module.exports = forgotPassword;
