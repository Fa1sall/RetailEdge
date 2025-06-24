import { useState } from "react";
import { UserPlus } from "lucide-react";

const Customers = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com", phone: "9876543210" },
    { id: 2, name: "Bob", email: "bob@example.com", phone: "9123456789" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    const newCustomer = {
      id: Date.now(),
      ...formData,
    };

    setCustomers((prev) => [...prev, newCustomer]);
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <div className="rounded-lg bg-panel p-6 text-text shadow-md">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-accent">
        👥 Customers
      </h2>

      {/* Add Customer Form */}
      <form
        onSubmit={handleAddCustomer}
        className="mb-6 flex flex-col gap-4 md:flex-row"
      >
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="rounded-md border border-border bg-background p-2 text-text placeholder-muted"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="rounded-md border border-border bg-background p-2 text-text placeholder-muted"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="rounded-md border border-border bg-background p-2 text-text placeholder-muted"
        />
        <button
          type="submit"
          className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-semibold text-white
            hover:brightness-110"
        >
          <UserPlus size={18} />
          Add
        </button>
      </form>

      {/* Customer List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-border rounded-md">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr
                key={cust.id}
                className="border-t border-border hover:bg-muted/10"
              >
                <td className="px-4 py-2">{cust.name}</td>
                <td className="px-4 py-2">{cust.email}</td>
                <td className="px-4 py-2">{cust.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
