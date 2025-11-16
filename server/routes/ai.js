import express from "express";
import { generateInsights } from "../controllers/aiController.js";

const router = express.Router();
router.post("/insights", generateInsights);
export default router;
