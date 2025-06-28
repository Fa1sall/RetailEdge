import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, X } from "lucide-react";

const predefinedCategories = [
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
];

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, image, category, description } = formData;

    if (!name || !price || !image || !category || !description) {
      setError("Please fill all fields.");
      return;
    }

    const payload = {
      name,
      price: parseFloat(price),
      image,
      category,
      description,
    };

    if (editingId) {
      axios
        .put(`http://localhost:5000/api/products/${editingId}`, payload)
        .then(() => {
          fetchProducts();
          resetForm();
          setShowEditModal(false);
        })
        .catch((err) => console.error("Error updating product:", err));
    } else {
      axios
        .post("http://localhost:5000/api/products", payload)
        .then(() => {
          fetchProducts();
          resetForm();
        })
        .catch((err) => console.error("Error adding product:", err));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      image: "",
      category: "",
      description: "",
    });
    setEditingId(null);
    setError("");
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      category: product.category || "",
      description: product.description || "",
    });
    setEditingId(product._id);
    setError("");
    setShowEditModal(true);
  };

  const confirmDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/products/${confirmDeleteId}`)
      .then(() => {
        fetchProducts();
        if (editingId === confirmDeleteId) resetForm();
        setConfirmDeleteId(null);
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="rounded-lg bg-panel p-6 text-text shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-accent">📦 Inventory</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-md border border-border bg-background p-2 text-sm text-text
          placeholder-muted"
      />

      {/* Add Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col gap-4 md:flex-row md:flex-wrap"
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
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="rounded-md border border-border bg-background p-2 text-text"
        >
          <option value="">Select Category</option>
          {predefinedCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="rounded-md border border-border bg-background p-2 text-text placeholder-muted
            md:w-full"
        />
        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 font-semibold text-white hover:brightness-110
            transition"
        >
          Add
        </button>
      </form>

      {error && (
        <p className="mb-4 text-sm text-red-500 font-medium">{error}</p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="relative rounded-lg border border-border bg-background p-4 shadow
              hover:scale-[1.02] transition"
          >
            <div
              onClick={() => setViewProduct(product)}
              className="cursor-pointer"
            >
              <div
                className="w-full h-40 bg-muted flex items-center justify-center overflow-hidden rounded-md
                  mb-2"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-accent font-medium">₹{product.price}</p>
              <p className="text-sm text-muted">Category: {product.category}</p>
            </div>

            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="rounded-full bg-yellow-500 p-1 text-white hover:bg-yellow-600"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => confirmDelete(product._id)}
                className="rounded-full bg-red-600 p-1 text-white hover:bg-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Product Modal */}
      {viewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50
            backdrop-blur-sm"
        >
          <div
            className="bg-background rounded-lg shadow-lg p-6 max-w-md w-[90%] space-y-4 text-text
              relative"
          >
            <button
              onClick={() => setViewProduct(null)}
              className="absolute top-2 right-2 text-muted hover:text-text"
            >
              <X size={22} />
            </button>
            <div className="flex justify-center">
              <img
                src={viewProduct.image}
                alt={viewProduct.name}
                className="max-h-48 max-w-full object-contain rounded-md"
              />
            </div>
            <h3 className="text-2xl font-bold">{viewProduct.name}</h3>
            <p className="text-accent font-semibold text-lg">
              ₹{viewProduct.price}
            </p>
            <p className="text-sm text-muted">
              Category: {viewProduct.category}
            </p>
            <p className="text-sm">{viewProduct.description}</p>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50
            backdrop-blur-sm"
        >
          <div
            className="bg-background rounded-lg shadow-lg p-6 max-w-md w-[90%] space-y-4 text-text
              relative"
          >
            <button
              onClick={() => {
                setShowEditModal(false);
                resetForm();
              }}
              className="absolute top-2 right-2 text-muted hover:text-text"
            >
              <X size={22} />
            </button>
            <h3 className="text-xl font-bold text-accent">Edit Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-panel p-2"
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-panel p-2"
              />
              <input
                name="image"
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-panel p-2"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-panel p-2"
              >
                <option value="">Select Category</option>
                {predefinedCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                name="description"
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-panel p-2"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded-md border border-border hover:bg-panel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-accent text-white hover:brightness-110"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-background rounded-lg p-6 w-80 space-y-4 text-text shadow-xl">
            <h3 className="text-lg font-semibold text-accent">
              Delete Product
            </h3>
            <p className="text-sm text-muted">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-3 py-1 rounded-md text-sm border border-border hover:bg-panel"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 rounded-md bg-red-600 text-sm text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
