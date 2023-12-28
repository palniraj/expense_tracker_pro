const mongoose = require("mongoose");

const getTransactions = async (req, res) =>{
    
    const transactionsModel = mongoose.model("transactions");
    //query string parameter for finding spection transactions like expense only, income only
    // console.log(req.query);

    const transactions = await transactionsModel.find({
        user_id: req.user._id,
        // ...spread operator -> transaction_type: 'income'
        ...req.query,
    });
    res.status(200).json({
        status: "success",
        data: transactions,
    });
};

module.exports = getTransactions;