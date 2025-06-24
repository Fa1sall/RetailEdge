import { useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Search,
  CheckCircle2,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 799,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Keyboard",
    price: 1499,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Webcam",
    price: 1299,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    name: "Monitor",
    price: 9999,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 5,
    name: "Laptop Stand",
    price: 499,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 6,
    name: "USB Hub",
    price: 899,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: 1999,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 8,
    name: "External HDD",
    price: 3499,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 9,
    name: "Graphic Tablet",
    price: 4999,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 10,
    name: "Phone Charger",
    price: 299,
    image: "https://via.placeholder.com/100",
  },
];

export default function POS() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addedProductName, setAddedProductName] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }

    setAddedProductName(product.name);
    setTimeout(() => setAddedProductName(null), 2000);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

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
        {/* Product list */}
        <div className="md:col-span-2">
          <div className="mb-4 flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-border bg-panel px-4 py-2 pr-10 text-text
                  outline-none focus:border-accent"
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                size={20}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center rounded-lg bg-panel p-4 shadow-md text-text"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="mb-2 h-24 w-24 object-cover"
                />
                <div className="mb-1 font-semibold">{product.name}</div>
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
        </div>

        {/* Cart summary */}
        <div className="sticky top-20 h-fit rounded-lg bg-panel p-5 shadow-lg text-text">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <ShoppingCart size={22} /> Cart Summary
          </h2>
          {cart.length === 0 ? (
            <p className="text-muted">Cart is empty</p>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 border-b border-border pb-2"
                >
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-muted">
                      ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="rounded bg-border px-2 py-1 hover:bg-muted"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="rounded bg-border px-2 py-1 hover:bg-muted"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <div className="border-t border-border pt-2 text-lg font-bold">
                Total: ₹{total}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
