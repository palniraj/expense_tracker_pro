const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");

  const { transaction_id, remarks } = req.body;
  //   const { transaction_id, remarks, amount, transaction_type } = req.body;

  if (!transaction_id) throw "Transaction is required!";
  //   if (transaction_type !== "income" && transaction_type !== "expense")
  //     throw "Transaction type must be income or expense only!";
  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide valid id";

  const getTransaction = await transactionModel.findOne({
    _id: transaction_id,
  });
  if (!getTransaction) throw "Transaction not found!";
  //   update functionality
  await transactionModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      remarks,
      //   transaction_type,
      //   amount,
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Edit transation",
  });
};
module.exports = editTransaction;
