// seedProducts.js
import mongoose from "mongoose";
import Product from "./models/Product.js"; // ✅ Direct named import (no .default)

const products = [
  {
    name: "Wireless Mouse",
    price: 799,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4f4f",
  },
  {
    name: "Classic Wrist Watch",
    price: 1799,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1508669232496-135a1cacf59f",
  },
  {
    name: "Cooking Pan",
    price: 999,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1589308078057-3360a5ee9c0a",
  },
  {
    name: "Children's Book",
    price: 399,
    category: "Books",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
  },
  {
    name: "Yoga Mat",
    price: 1200,
    category: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
  },
  {
    name: "Lipstick Set",
    price: 649,
    category: "Health & Beauty",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1fc4c20",
  },
  {
    name: "Bluetooth Headphones",
    price: 1999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1583224576737-c55aa3a3f573",
  },
  {
    name: "Pack of Pens",
    price: 149,
    category: "Office Supplies",
    image: "https://images.unsplash.com/photo-1588776814546-92484e9c7f55",
  },
  {
    name: "Toy Robot",
    price: 850,
    category: "Toys & Games",
    image: "https://images.unsplash.com/photo-1606813902764-0440d0a37930",
  },
  {
    name: "T-Shirt",
    price: 499,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1598032894628-287e24ea503d",
  },
  {
    name: "Grocery Basket",
    price: 599,
    category: "Grocery",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  },
  {
    name: "Backpack",
    price: 1299,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1613909207030-c22bb0c1ee75",
  },
  {
    name: "Automobile Vacuum Cleaner",
    price: 1899,
    category: "Automotive",
    image: "https://images.unsplash.com/photo-1605707241000-f6b6c38f96ef",
  },
  {
    name: "Notebook",
    price: 199,
    category: "Office Supplies",
    image: "https://images.unsplash.com/photo-1616627981768-7918f0768345",
  },
  {
    name: "Running Shoes",
    price: 2299,
    category: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
  },
];

const seed = async () => {
  try {
    await mongoose.connect("mogodb--connection--uri", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected");

    await Product.deleteMany(); // ✅ Works now
    await Product.insertMany(products);

    console.log("✅ Products seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding products:", err);
    process.exit(1);
  }
};

seed();
