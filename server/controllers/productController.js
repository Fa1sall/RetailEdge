import Product from "../models/Product.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Create new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, image, category, description } = req.body;

    if (!name || !price || !image || !category) {
      return res
        .status(400)
        .json({ error: "All fields except description are required" });
    }

    const newProduct = new Product({
      name,
      price,
      image,
      category,
      description,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { name, price, image, category, description } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, image, category, description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
