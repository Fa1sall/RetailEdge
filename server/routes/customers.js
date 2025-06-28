import express from "express";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", createCustomer);
router.put("/:phone", updateCustomer);
router.delete("/:phone", deleteCustomer);

export default router;
