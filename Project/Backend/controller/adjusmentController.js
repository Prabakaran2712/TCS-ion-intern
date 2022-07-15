const adjustment = require("../models/adjustmentModel");
const getAdjustments = (req, res) => {
  return res.json({ msg: "get all adjustments" });
};

const addAdjustment = async (req, res) => {
  const { mode, refno, date, Reason, description, items } = req.body;
  try {
    const item = await adjustment.create({
      mode,
      refno,
      date,
      Reason,
      description,
      items,
    });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAdjustments,
  addAdjustment,
};
