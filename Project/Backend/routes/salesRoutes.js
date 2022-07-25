const express = require("express");
const {
  addCustomer,
  getCustomers,

  updateCustomer,
  getCustomer,
} = require("../controller/sales/customerController");
const {
  getSalesOrders,
  addSalesOrder,
  getSalesOrder,
} = require("../controller/sales/salesOrderController");
const {
  createPackage,
  getPackages,
  getPackage,
} = require("../controller/sales/packageController");

const {
  getDeliveryChallans,
  createDeliveryChallan,
  getDeliveryChallan,
} = require("../controller/sales/deliveryChallanController");
const {
  getInvoices,
  getInvoice,
  createInvoice,
} = require("../controller/sales/invoiceController");

const {
  getPayments,
  addPayment,
} = require("../controller/sales/paymentController");

const {
  getSalesReturns,
  getSalesReturn,
  addSalesReturn,
  approveSalesReturn,
} = require("../controller/sales/salesReturnController");

const {
  getCreditNotes,
  getCreditNote,
  addCreditNote,
} = require("../controller/sales/creditNoteController");

const router = express.Router();
router.get("/customers", getCustomers);
router.post("/customers", addCustomer);
router.get("/customer/:id", getCustomer);
router.patch("/customers/:id", updateCustomer);

router.get("/salesorders", getSalesOrders);
router.get("/salesorders/:id", getSalesOrder);
router.post("/salesorders", addSalesOrder);

router.get("/packages", getPackages);
router.get("/packages/:id", getPackage);
router.post("/packages", createPackage);

router.get("/delivery-challans", getDeliveryChallans);
router.get("/delivery-challans/:id", getDeliveryChallan);
router.post("/delivery-challans", createDeliveryChallan);

router.get("/invoices", getInvoices);
router.get("/invoices/:id", getInvoice);
router.post("/invoices", createInvoice);

router.get("/payments", getPayments);
router.post("/payments", addPayment);

router.get("/sales-returns", getSalesReturns);
router.get("/sales-returns/:id", getSalesReturn);
router.post("/sales-returns", addSalesReturn);
router.post("/sales-returns/approve", approveSalesReturn);

router.get("/credit-notes", getCreditNotes);
router.get("/credit-notes/:id", getCreditNote);
router.post("/credit-notes", addCreditNote);
module.exports = router;
