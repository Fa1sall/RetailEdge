import React from "react";
import { PackageSearch, CheckCircle, Clock } from "lucide-react";

const orders = [
  {
    id: "ORD-001",
    customer: "Alice",
    status: "Delivered",
    total: 499,
    date: "2025-06-23",
  },
  {
    id: "ORD-002",
    customer: "Bob",
    status: "Pending",
    total: 799,
    date: "2025-06-22",
  },
  {
    id: "ORD-003",
    customer: "Charlie",
    status: "Delivered",
    total: 299,
    date: "2025-06-21",
  },
];

const Orders = () => {
  return (
    <div className="rounded-lg bg-panel p-6 shadow-md text-text">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-accent">
        <PackageSearch size={24} />
        Orders
      </h2>

      <div className="overflow-x-auto rounded-md border border-border">
        <table className="min-w-full table-auto">
          <thead className="bg-border/30 text-muted">
            <tr>
              <th className="p-4 text-left text-sm font-semibold">Order ID</th>
              <th className="p-4 text-left text-sm font-semibold">Customer</th>
              <th className="p-4 text-left text-sm font-semibold">Status</th>
              <th className="p-4 text-left text-sm font-semibold">Total (₹)</th>
              <th className="p-4 text-left text-sm font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-border hover:bg-border/20 transition"
              >
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4 flex items-center gap-2">
                  {order.status === "Delivered" ? (
                    <CheckCircle className="text-green-400" size={16} />
                  ) : (
                    <Clock className="text-yellow-400" size={16} />
                  )}
                  <span
                    className={`font-medium ${
                    order.status === "Delivered"
                        ? "text-green-400"
                        : "text-yellow-300"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4">₹{order.total}</td>
                <td className="p-4">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
