const mongoose = require("mongoose");

const UserCurrency = new mongoose.Schema({
    userId: { type: String, required: true },
    balance: { type: Number, default: 0 },
});

module.exports = mongoose.model("UserCurrency", UserCurrency);