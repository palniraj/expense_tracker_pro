const mongoose = require("mongoose");
const validator = require("validator");
const usersModel = require("../../../models/users.model");
const deleteTransction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");

  const { transaction_id } = req.params;

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide valid id";

  const getTransaction = await transactionModel.findOne({
    _id: transaction_id,
  });
  if (!getTransaction) throw "Transaction not found!";

//   console.log(getTransaction);
  if (getTransaction.transaction_type === "income") {
    // income logic
    await usersModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: getTransaction.amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } else {
    // expense logic
    await usersModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: getTransaction.amount,
        },
      },
      {
        runValidators: true,
      }
    );
  }
  // delete from db
  await transactionModel.deleteOne({
    _id: transaction_id,
  });
  res.status(200).json({
    status: "Deleted Successfully!",
  });
};
module.exports = deleteTransction;
