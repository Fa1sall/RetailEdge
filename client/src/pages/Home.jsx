import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import {
  Package,
  ChartColumnIncreasing,
  Boxes,
  Users,
  TrendingUp,
  Clock,
  UserPlus,
  ShoppingBag,
} from "lucide-react";
import HomeInfoCard from "../components/HomeInfoCard";

export default function Home() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    todaysSales: 0,
    productCount: 0,
    customerCount: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes, customersRes] = await Promise.all([
          axios.get("http://localhost:5000/api/orders"),
          axios.get("http://localhost:5000/api/products"),
          axios.get("http://localhost:5000/api/customers"),
        ]);

        const orders = ordersRes.data;
        const today = new Date().toISOString().split("T")[0];
        const todaysOrders = orders.filter((o) =>
          o.createdAt?.startsWith(today),
        );
        const todaysSales = todaysOrders.reduce((sum, o) => sum + o.total, 0);

        // Construct recent activity
        const activities = [];
        if (todaysOrders.length > 0)
          activities.push({
            icon: <ShoppingBag size={16} />,
            text: `${todaysOrders.length} orders placed today`,
          });

        activities.push({
          icon: <Boxes size={16} />,
          text: `${productsRes.data.length} products currently in stock`,
        });

        activities.push({
          icon: <UserPlus size={16} />,
          text: `${customersRes.data.length} registered customers`,
        });

        activities.push({
          icon: <TrendingUp size={16} />,
          text: `₹${todaysSales} in sales today`,
        });

        setStats({
          totalOrders: orders.length,
          todaysSales,
          productCount: productsRes.data.length,
          customerCount: customersRes.data.length,
        });

        setRecentActivities(activities);

        // Chart Setup
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (6 - i));
          return d.toISOString().split("T")[0];
        });

        const salesData = last7Days.map((day) => {
          const sales = orders
            .filter((o) => o.createdAt?.startsWith(day))
            .reduce((sum, o) => sum + o.total, 0);
          return sales;
        });

        const ctx = chartRef.current.getContext("2d");
        new Chart(ctx, {
          type: "line",
          data: {
            labels: last7Days.map((d) =>
              new Date(d).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
              }),
            ),
            datasets: [
              {
                label: "Sales (₹)",
                data: salesData,
                fill: true,
                tension: 0.4,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                labels: { color: "#fff" },
              },
            },
            scales: {
              x: {
                ticks: { color: "#ccc" },
              },
              y: {
                ticks: { color: "#ccc" },
              },
            },
          },
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-muted">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="space-y-5 text-text">
      {/* Welcome Header */}
      <div className="text-3xl font-bold">
        Welcome to Retail<span className="text-accent">Edge</span>!
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 justify-items-center gap-5 p-10 md:grid-cols-2">
        <HomeInfoCard
          title="Total Orders"
          info={stats.totalOrders}
          page="orders"
          icon={Package}
        />
        <HomeInfoCard
          title="Today's Sales"
          info={`₹${stats.todaysSales}`}
          page="analytics"
          icon={ChartColumnIncreasing}
        />
        <HomeInfoCard
          title="Products in Stock"
          info={stats.productCount}
          page="inventory"
          icon={Boxes}
        />
        <HomeInfoCard
          title="Customer Count"
          info={stats.customerCount}
          page="customers"
          icon={Users}
        />
      </div>

      {/* Sales Overview Chart */}
      <div className="rounded-lg bg-panel shadow-md p-6">
        <h3 className="mb-4 text-xl font-semibold text-text">Sales Overview</h3>
        <div className="relative w-full max-w-full overflow-x-auto rounded-lg bg-background p-4">
          <canvas ref={chartRef} height={100} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg bg-panel shadow-md p-6">
        <h3 className="mb-4 text-xl font-semibold text-text">
          Recent Activity
        </h3>
        <ul className="space-y-3 text-sm">
          {recentActivities.map((activity, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-md bg-muted/10 p-3 text-muted shadow-sm"
            >
              {activity.icon}
              <span>{activity.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
