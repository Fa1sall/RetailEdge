# 🛍️ RetailEdge

RetailEdge is an **AI-powered retail management system** designed to streamline store operations. It offers a comprehensive suite of features, including a **Point of Sale (POS)** system for quick transactions, robust **inventory management** for stock control, efficient **order processing**, an **analytics dashboard** for data-driven insights, and **customer data management** for easy access to contact information.

## ✨ Features Overview

### 🏠 Home

This page provides an overview of key business metrics at a glance, including total orders, today's sales, products in stock, and customer count. It also features a sales overview chart and recent activity summary.

* 📊 Overview of total orders, today's sales, products in stock, and customer count.
* 📈 Sales overview chart to visualize sales trends.
* 📜 Recent activity section for quick updates.

![RetailEdge Home Page](https://github.com/Fa1sall/RetailEdge/blob/main/preview/screenshot1.png?raw=true)

### 📊 Analytics Dashboard

The Analytics Dashboard provides in-depth insights into your sales performance and product categories, enhanced with AI-powered business recommendations.

* 📈 Daily sales line chart to track revenue over time.
* 📦 Product category bar chart to visualize sales distribution by category.
* 🧠 AI-powered business insights covering top products, sales trends, and tailored recommendations.
* 🔄 Refresh AI insights button for updated reports.

![RetailEdge Analytics Dashboard](https://github.com/Fa1sall/RetailEdge/blob/main/preview/screenshot6.png?raw=true)

### 🛒 Point of Sale (POS)

The Point of Sale system facilitates quick and efficient transactions, allowing you to manage customer orders seamlessly.

* 🔍 Search products by name for easy selection.
* ➕ Add items to the cart with adjustable quantities.
* 👤 Search and select customers by phone or name.
* 💳 Seamless checkout process for completing orders.

![RetailEdge Point of Sale](https://github.com/Fa1sall/RetailEdge/blob/main/preview/screenshot2.png?raw=true)

### 📦 Inventory

Manage your product catalog effectively with the Inventory page, where you can view, add, edit, and delete products.

* 🗃️ View all products with images, prices, categories, and descriptions.
* ➕ Add new products with comprehensive description support.
* ✏️ Edit existing products using a convenient modal popup.
* 🗑️ Delete products with a confirmation prompt to prevent accidental removals.
* 🔍 Search products by name for quick access.

![RetailEdge Inventory Management](https://github.com/Fa1sall/RetailEdge/blob/main/preview/screenshot4.png?raw=true)

![RetailEdge Product Details Modal](https://github.com/Fa1sall/RetailEdge/blob/main/preview/screenshot4_1.png?raw=true)

### 📜 Orders

Keep track of all your customer orders, monitor their statuses, and manage them efficiently from the Orders page.

* 📑 View a comprehensive list of orders with status, total amount, and date.
* 👁️ Expand orders to see detailed lists of purchased items.
* 🔄 Change order status (Pending, Shipped, Delivered) to reflect real-time progress.
* 🗑️ Delete orders with a confirmation prompt.
* 🔍 Filter orders by status for easy navigation.

![RetailEdge Orders List](https://github.com/Fa1sall/RetailEdge/blob/main/preview/screenshot3.png?raw=true)

### 👥 Customers

Maintain a comprehensive database of your customers, allowing for easy addition, editing, and management of their details.

* 📋 View all customers with their name, email, and phone number.
* ➕ Add new customers to your database.
* ✏️ Edit customer details via a modal popup for quick updates.
* 🗑️ Delete customers with a confirmation prompt.
* 🔍 Search customers by name or phone number for quick retrieval.

![RetailEdge Customers List](https://github.com/Fa1sall/RetailEdge/blob/main/preview/screenshot5.png?raw=true)

## 🤖 AI Integration

RetailEdge leverages local Mistral or LLaMA models using Ollama to generate valuable business insights, helping you make informed decisions.

* Top selling products/categories
* Daily and weekly sales trends
* Business recommendations

## 🛠️  Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js, MongoDB (Mongoose)
* **AI Integration:** Local Mistral model via Ollama

## ⚙️ Setup

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Fa1sall/RetailEdge.git
    cd RetailEdge
    ```

2.  **Setup backend**

    ```bash
    cd server
    npm install
    ```

3.  **Setup frontend**

    ```bash
    cd client
    npm install
    ```

4.  **Environment Variables**

    Create a `.env` file inside your `server` folder:

    ```
    MONGO_URI=your-mongodb-uri
    ```

5.  **Run the project**

    * **Start backend:**

        ```bash
        cd server
        npm start
        ```

    * **Start frontend:**

        ```bash
        cd client
        npm start
        ```

    Visit `http://localhost:3000`

## 📄 License

This project is open source under the MIT License.
