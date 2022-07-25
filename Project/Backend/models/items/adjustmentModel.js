const mongoose = require("mongoose");
const adjustmentSchema = mongoose.Schema(
  {
    mode: {
      type: String,
      required: true,
    },
    refno: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      //   required: true,
    },
    Reason: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    items: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: "items",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("adjustment", adjustmentSchema);
