import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    _id: String,
    customer: String,
    items: [
      {
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    total: Number,
    status: {
      type: String,
      default: "Pending",
    },
    deliveryDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
