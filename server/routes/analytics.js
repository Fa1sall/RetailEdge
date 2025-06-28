import express from "express";
import {
  getAnalytics,
  initAnalytics,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/", getAnalytics);
router.post("/init", initAnalytics);

export default router;
