const express = require("express");
const {
  getBills,
  getBill,
  createBill,
} = require("../controller/purchase/billController");
const {
  getPurchasesOrder,
  getPurchasesOrders,
  addPurchasesOrder,
} = require("../controller/purchase/purchaseOrderController");
const {
  getVendor,
  getVendors,
  updateVendor,
  addVendor,
} = require("../controller/purchase/vendorControlller");
const router = express.Router();
router.get("/vendors", getVendors);
router.post("/vendors", addVendor);
router.get("/vendor/:id", getVendor);
router.patch("/vendors/:id", updateVendor);

router.get("/purchasesorders", getPurchasesOrders);
router.get("/purchasesorders/:id", getPurchasesOrder);
router.post("/purchasesorders", addPurchasesOrder);

router.get("/bills", getBills);
router.get("/bills/:id", getBill);
router.post("/bills", createBill);

module.exports = router;
