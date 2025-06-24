import { useState } from "react";

const Inventory = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Mouse",
      price: 599,
      image: "https://via.placeholder.com/100x100?text=Mouse",
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 2499,
      image: "https://via.placeholder.com/100x100?text=Keyboard",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) return;

    const newProduct = {
      id: Date.now(),
      ...formData,
    };

    setProducts((prev) => [...prev, newProduct]);
    setFormData({ name: "", price: "", image: "" });
  };

  return (
    <div className="rounded-lg bg-panel p-6 text-text shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-accent">📦 Inventory</h2>

      {/* Add Product Form */}
      <form
        onSubmit={handleAddProduct}
        className="mb-6 flex flex-col gap-4 md:flex-row"
      >
        <input
          name="name"
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="rounded-md border border-border bg-background p-2 text-text placeholder-muted"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="rounded-md border border-border bg-background p-2 text-text placeholder-muted"
        />
        <input
          name="image"
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="rounded-md border border-border bg-background p-2 text-text placeholder-muted"
        />
        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 font-semibold text-white hover:brightness-110"
        >
          Add Product
        </button>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border border-border bg-background p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mb-2 h-32 w-full rounded-md object-cover"
            />
            <h3 className="text-lg font-semibold text-text">{product.name}</h3>
            <p className="text-accent font-medium">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
