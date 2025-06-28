import { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Search,
  CheckCircle2,
  Filter,
  Box,
} from "lucide-react";

export default function POS() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [addedProductName, setAddedProductName] = useState(null);

  const [customerQuery, setCustomerQuery] = useState("");
  const [customerDetails, setCustomerDetails] = useState(null);
  const [allCustomers, setAllCustomers] = useState([]);
  const [customerSuggestions, setCustomerSuggestions] = useState([]);

  const [sortOrder, setSortOrder] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [maxPrice, setMaxPrice] = useState(10000);

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        const cats = Array.from(new Set(res.data.map((p) => p.category)));
        setCategories(cats);

        const prices = res.data.map((p) => p.price);
        const maxP = prices.length ? Math.max(...prices) : 1000;
        setMaxPrice(maxP);
        setPriceRange([0, maxP]);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Fetch customers
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((res) => setAllCustomers(res.data))
      .catch((err) => console.error("Error fetching customers:", err));
  }, []);

  // Filter customers
  useEffect(() => {
    const filtered = allCustomers.filter(
      (c) =>
        c.phone.includes(customerQuery) ||
        c.name.toLowerCase().includes(customerQuery.toLowerCase()),
    );
    setCustomerSuggestions(customerQuery ? filtered : []);
  }, [customerQuery, allCustomers]);

  useEffect(() => {
    if (customerQuery.trim() === "") {
      setCustomerDetails(null);
    }
  }, [customerQuery]);

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "" || product.category === selectedCategory) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1],
    )
    .sort((a, b) =>
      sortOrder === "lowHigh"
        ? a.price - b.price
        : sortOrder === "highLow"
          ? b.price - a.price
          : 0,
    );

  // Cart functions
  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }

    setAddedProductName(product.name);
    setTimeout(() => setAddedProductName(null), 2000);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const updateQty = (id, delta) => {
    setCart(
      cart
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const selectCustomer = (cust) => {
    setCustomerQuery(`${cust.name} (${cust.phone})`);
    setCustomerDetails(cust);
    setCustomerSuggestions([]);
  };

  const handleCheckout = () => {
    if (!customerDetails) {
      alert("Please select a valid customer.");
      return;
    }

    axios
      .post("http://localhost:5000/api/orders", {
        customer: customerDetails.name,
        items: cart,
      })
      .then(() => {
        alert("✅ Order placed successfully!");
        setCart([]);
        setCustomerQuery("");
        setCustomerDetails(null);
      })
      .catch((err) => {
        console.error("Order error:", err);
        alert("❌ Failed to place order");
      });
  };

  return (
    <div className="relative">
      {addedProductName && (
        <div
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-md bg-green-600 px-4 py-2
            text-white shadow-md flex items-center gap-2"
        >
          <CheckCircle2 size={20} />
          <span>{addedProductName} added to cart</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Products Section */}
        <div className="md:col-span-2">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6 rounded-lg bg-panel p-4 shadow-sm">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-4 py-2 pr-10 text-text
                  outline-none focus:border-accent"
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                size={20}
              />
            </div>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-text"
            >
              <option value="">Sort: None</option>
              <option value="lowHigh">Price: Low to High</option>
              <option value="highLow">Price: High to Low</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-text"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <Filter size={18} />
              <input
                type="range"
                min="0"
                max={maxPrice}
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="accent-accent"
              />
              <span className="text-sm text-muted">Under ₹{priceRange[1]}</span>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted">
              <Box size={48} />
              <p className="mt-4">No products match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col items-center rounded-lg bg-panel p-4 shadow-md text-text"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-2 h-24 w-24 object-cover rounded"
                  />
                  <div className="mb-1 font-semibold">{product.name}</div>
                  <div className="text-xs text-muted mb-1">
                    {product.category}
                  </div>
                  <div className="mb-2 text-accent font-medium">
                    ₹{product.price}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-md bg-accent px-4 py-2 text-white hover:brightness-110"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="sticky top-20 h-fit rounded-lg bg-panel p-5 shadow-lg text-text">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <ShoppingCart size={22} /> Cart Summary
          </h2>

          {/* Customer Search */}
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search customer by name or phone"
              value={customerQuery}
              onChange={(e) => setCustomerQuery(e.target.value)}
              className="w-full rounded-md border border-border bg-background p-2 text-text
                placeholder-muted"
            />
            {customerSuggestions.length > 0 && (
              <ul
                className="absolute z-10 w-full mt-1 rounded-md border border-border bg-panel shadow-lg
                  max-h-40 overflow-y-auto"
              >
                {customerSuggestions.map((cust) => (
                  <li
                    key={cust.phone}
                    onClick={() => selectCustomer(cust)}
                    className="cursor-pointer px-4 py-2 hover:bg-muted/20"
                  >
                    {cust.name} — {cust.phone}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Customer Info */}
          {customerDetails ? (
            <div className="mb-4 rounded bg-muted/10 p-3 text-sm">
              <div>
                <strong>Name:</strong> {customerDetails.name}
              </div>
              <div>
                <strong>Email:</strong> {customerDetails.email}
              </div>
              <div>
                <strong>Phone:</strong> {customerDetails.phone}
              </div>
            </div>
          ) : (
            <p className="mb-4 text-sm text-muted">No customer selected</p>
          )}

          {/* Cart Details */}
          {cart.length === 0 ? (
            <p className="text-muted">Cart is empty</p>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-2 border-b border-border pb-2"
                >
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-muted">{item.category}</div>
                    <div className="text-sm text-muted">
                      ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQty(item._id, -1)}
                      className="rounded bg-border px-2 py-1 hover:bg-muted"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item._id, 1)}
                      className="rounded bg-border px-2 py-1 hover:bg-muted"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <div className="border-t border-border pt-2 text-lg font-bold">
                Total: ₹{total}
              </div>
              <button
                onClick={handleCheckout}
                className="mt-4 w-full rounded-md bg-accent px-4 py-2 font-semibold text-white
                  hover:brightness-110"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
