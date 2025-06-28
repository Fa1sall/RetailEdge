import { useEffect, useState } from "react";
import axios from "axios";
import { UserPlus, Trash2, Edit2, Search } from "lucide-react";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [confirmDeletePhone, setConfirmDeletePhone] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Error fetching customers:", err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const { name, email, phone } = formData;
    if (!name || !email || !phone) {
      setError("Please fill all fields.");
      return;
    }

    axios
      .post("http://localhost:5000/api/customers", formData)
      .then((res) => {
        setCustomers((prev) => [...prev, res.data]);
        setFormData({ name: "", email: "", phone: "" });
      })
      .catch((err) => {
        console.error("Error adding customer:", err);
        setError("Failed to add customer");
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/customers/${confirmDeletePhone}`)
      .then(() => {
        setCustomers((prev) =>
          prev.filter((cust) => cust.phone !== confirmDeletePhone),
        );
        setConfirmDeletePhone(null);
      })
      .catch((err) => {
        console.error("Error deleting customer:", err);
      });
  };

  const handleEditSave = () => {
    if (!editCustomer.name || !editCustomer.email) {
      setError("Name and Email cannot be empty");
      return;
    }

    axios
      .put(`http://localhost:5000/api/customers/${editCustomer.phone}`, {
        name: editCustomer.name,
        email: editCustomer.email,
      })
      .then((res) => {
        setCustomers((prev) =>
          prev.map((cust) =>
            cust.phone === editCustomer.phone ? res.data : cust,
          ),
        );
        setEditCustomer(null);
        setError("");
      })
      .catch((err) => {
        console.error("Error updating customer:", err);
        setError("Failed to update customer");
      });
  };

  const filteredCustomers = customers.filter(
    (cust) =>
      cust.name.toLowerCase().includes(search.toLowerCase()) ||
      cust.phone.includes(search),
  );

  return (
    <div className="rounded-lg bg-panel p-6 text-text shadow-md">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-accent">
        👥 Customers
      </h2>

      {/* Search Bar */}
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-border bg-background p-2 pl-10 text-text
            placeholder-muted"
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          size={18}
        />
      </div>

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

      {error && (
        <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-border rounded-md">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((cust) => (
              <tr
                key={cust.phone}
                className="border-t border-border hover:bg-muted/10"
              >
                <td className="px-4 py-2">{cust.name}</td>
                <td className="px-4 py-2">{cust.email}</td>
                <td className="px-4 py-2">{cust.phone}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => setEditCustomer(cust)}
                    className="text-blue-600 hover:text-blue-700 transition"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => setConfirmDeletePhone(cust.phone)}
                    className="text-red-600 hover:text-red-700 transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeletePhone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-80 rounded-lg bg-background p-6 shadow-xl text-text space-y-4">
            <h3 className="text-lg font-semibold text-accent">
              Delete Customer
            </h3>
            <p className="text-sm text-muted">
              Are you sure you want to delete this customer?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDeletePhone(null)}
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

      {/* Edit Customer Modal */}
      {editCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-80 rounded-lg bg-background p-6 shadow-xl text-text space-y-4">
            <h3 className="text-lg font-semibold text-accent">Edit Customer</h3>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={editCustomer.name}
              onChange={(e) =>
                setEditCustomer((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full rounded-md border border-border bg-panel p-2"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={editCustomer.email}
              onChange={(e) =>
                setEditCustomer((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full rounded-md border border-border bg-panel p-2"
            />
            {error && (
              <p className="text-red-500 text-sm mb-2 font-medium">{error}</p>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditCustomer(null)}
                className="px-3 py-1 rounded-md text-sm border border-border hover:bg-panel"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-3 py-1 rounded-md bg-accent text-sm text-white hover:brightness-110"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
