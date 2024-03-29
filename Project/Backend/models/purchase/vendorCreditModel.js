const mongoose = require("mongoose");

const vendorCreditSchema = mongoose.Schema(
  {
    creditNoteNo: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    vendor: {
      type: mongoose.Types.ObjectId,
      ref: "vendors",
      required: true,
    },
    items: {
      type: [mongoose.Types.ObjectId],
      ref: "items",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorCredit", vendorCreditSchema);
