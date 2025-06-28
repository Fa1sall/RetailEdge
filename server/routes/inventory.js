const express = require("express");
const router = express.Router();

const inventory = [
  { id: 1, name: "Wireless Mouse", price: 599, stock: 50 },
  { id: 2, name: "Mechanical Keyboard", price: 2499, stock: 30 },
  { id: 3, name: "USB-C Cable", price: 299, stock: 100 },
];

router.get("/", (req, res) => {
  res.json(inventory);
});

module.exports = router;
