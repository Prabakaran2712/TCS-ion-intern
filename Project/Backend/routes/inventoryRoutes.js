const express = require("express");
const { getItems, addItem } = require("../controller/itemController");
const {
  getAdjustments,
  addAdjustment,
} = require("../controller/adjusmentController");
const {
  getItemGroups,
  addItemGroup,
} = require("../controller/itemGroupController");

const router = express.Router();

//create an item

router.post("/items", addItem);

//get an item

router.get("/items", getItems);

//create an item group

router.post("/item-groups", addItemGroup);

//get item group

router.post("/item-groups", getItemGroups);

//create an adjustment

router.post("/adjustments", addAdjustment);

//get adjustment

router.get("/adjustments", getAdjustments);
module.exports = router;
