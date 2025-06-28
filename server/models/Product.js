import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Books",
        "Clothing",
        "Home & Kitchen",
        "Toys & Games",
        "Health & Beauty",
        "Grocery",
        "Sports & Outdoors",
        "Accessories",
        "Automotive",
        "Office Supplies",
      ],
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
