import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  totalSales: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  customersCount: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model("Analytics", analyticsSchema);
