import Customer from "../models/Customer.js";

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
};

// Create a new customer
export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Customer.findOne({ phone });
    if (exists) {
      return res
        .status(409)
        .json({ message: "Customer with this phone already exists" });
    }

    const newCustomer = new Customer({ name, email, phone });
    const saved = await newCustomer.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Failed to create customer" });
  }
};

// Update a customer by phone
export const updateCustomer = async (req, res) => {
  try {
    const { phone } = req.params;
    const { name, email } = req.body;

    const updated = await Customer.findOneAndUpdate(
      { phone },
      { name, email },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Failed to update customer" });
  }
};

// Delete a customer by phone
export const deleteCustomer = async (req, res) => {
  try {
    const { phone } = req.params;

    const deleted = await Customer.findOneAndDelete({ phone });
    if (!deleted) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer deleted", phone });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Failed to delete customer" });
  }
};
