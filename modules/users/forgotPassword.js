const mongoose = require("mongoose");

const forgotPassword = async (req, res) => {
  // importing users Model
  const usersModel = mongoose.model("users");
  const { email } = req.body;
  if (!email) throw "Email is required!";
  const getUser = await usersModel.findOne({
    email: email,
  });
  if (!getUser) throw "This email doesnot exit in the system!";

  res.status(200).json({
    status: "success",
  });
};
module.exports = forgotPassword;
