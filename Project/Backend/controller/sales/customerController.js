const customer = require("../../models/sales/customerModel");
const mongoose = require("mongoose");
const getCustomers = async (req, res) => {
  const customers = await customer.find({}).sort({ createdAt: -1 });
  res.json(customers);
};
const getCustomer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Customer Id" });
  }
  const customers = await customer.find({ _id: id });
  if (!customers) {
    return res.status(404).json({ error: "No such customer" });
  }
  return res.status(200).json(customers);
};
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Customer Id" });
  }
  const customers = await customer.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!customers) {
    return res.status(404).json({ error: "No such customer" });
  }
  return res.status(200).json(customers);
};
const addCustomer = async (req, res) => {
  const { customerName, company, mobile, email } = req.body;
  try {
    const customers = await customer.create({
      customerName,
      company,
      mobile,
      email,
    });
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  addCustomer,
  updateCustomer,
  getCustomer,
  getCustomers,
};
