import { useEffect, useState } from "react";
import axios from "axios";
import { PackageSearch, ChevronDown, ChevronUp, XCircle } from "lucide-react";

const statusColors = {
  Pending: "bg-yellow-500 text-white",
  Shipped: "bg-blue-500 text-white",
  Delivered: "bg-green-600 text-white",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [expandedOrderIds, setExpandedOrderIds] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setOrders(sorted);
        setFilteredOrders(sorted);
      })
      .catch((err) => console.error("Error fetching orders:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...orders];
    if (statusFilter !== "All")
      result = result.filter((o) => o.status === statusFilter);
    setFilteredOrders(result);
  }, [statusFilter, orders]);

  const toggleExpand = (id) => {
    setExpandedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const updateStatus = (id, status) => {
    axios
      .put(`http://localhost:5000/api/orders/${id}`, { status })
      .then(() => {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status } : o)),
        );
      })
      .catch((err) => console.error("Failed to update order status:", err));
  };

  const deleteOrder = (id) => {
    if (!confirm("Delete this order?")) return;
    axios
      .delete(`http://localhost:5000/api/orders/${id}`)
      .then(() => {
        setOrders((prev) => prev.filter((o) => o._id !== id));
      })
      .catch(() => alert("❌ Failed to delete order"));
  };

  return (
    <div className="bg-panel p-6 rounded-lg shadow-md text-text">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-accent">
        <PackageSearch size={24} />
        Orders
      </h2>

      {/* Status Filter */}
      <div className="flex gap-4 mb-6 items-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {loading ? (
        <p className="text-muted">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-muted">No orders found.</p>
      ) : (
        <div className="overflow-x-auto rounded border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-background text-muted uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const isExpanded = expandedOrderIds.includes(order._id);
                const total = order.items.reduce(
                  (sum, item) => sum + item.price * item.qty,
                  0,
                );

                return (
                  <>
                    <tr
                      key={order._id}
                      className="border-t border-border hover:bg-muted/10"
                    >
                      <td className="px-4 py-3">
                        {order._id.split("order")[1]}
                      </td>
                      <td className="px-4 py-3">{order.customer}</td>
                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order._id, e.target.value)
                          }
                          className={`rounded px-2 py-1 text-xs font-medium ${statusColors[order.status]}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 font-semibold text-accent">
                        ₹{total}
                      </td>
                      <td className="px-4 py-3 text-muted">
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => toggleExpand(order._id)}
                            className="flex items-center gap-1 rounded bg-border px-3 py-1 text-xs hover:bg-muted"
                          >
                            {isExpanded ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            )}
                            Details
                          </button>
                          <button
                            onClick={() => deleteOrder(order._id)}
                            className="flex items-center gap-1 rounded bg-red-600 px-3 py-1 text-xs text-white
                              hover:bg-red-700"
                          >
                            <XCircle size={14} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr className="bg-panel text-sm border-t border-border">
                        <td colSpan="6" className="px-8 py-4">
                          <div className="bg-muted/10 rounded p-4">
                            <p className="font-semibold mb-2">
                              Items in this order:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {order.items.map((item, idx) => (
                                <li key={idx}>
                                  {item.name} × {item.qty} = ₹
                                  {item.price * item.qty}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
