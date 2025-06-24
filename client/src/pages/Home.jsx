import { Package, ChartColumnIncreasing, Boxes, Users } from "lucide-react";
import HomeInfoCard from "../components/HomeInfoCard";

export default function Home() {
  return (
    <div className="space-y-5 text-text">
      {/* Welcome Header */}
      <div className="text-3xl font-bold">
        Welcome to Retail
        <span className="text-accent">Edge</span>!
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 justify-items-center gap-5 p-10 md:grid-cols-2">
        <HomeInfoCard
          title="Total Orders"
          info="300"
          page="orders"
          icon={Package}
        />
        <HomeInfoCard
          title="Today's Sales"
          info="218"
          page="analytics"
          icon={ChartColumnIncreasing}
        />
        <HomeInfoCard
          title="Products in Stock"
          info="846"
          page="inventory"
          icon={Boxes}
        />
        <HomeInfoCard
          title="Customer Count"
          info="195"
          page="customers"
          icon={Users}
        />
      </div>

      {/* Sales Overview */}
      <div className="rounded-lg bg-panel shadow-md p-6">
        <h3 className="mb-4 text-xl font-semibold text-text">Sales Overview</h3>
        <div className="flex h-64 items-center justify-center rounded-lg bg-border text-muted">
          📊 Graph Placeholder
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg bg-panel shadow-md p-6">
        <h3 className="mb-4 text-xl font-semibold text-text">
          Recent Activity
        </h3>
        <ul className="space-y-2 text-sm text-muted">
          <li>✅ 2 new orders placed</li>
          <li>📦 Stock updated for 4 products</li>
          <li>🧑‍💼 New customer registered</li>
        </ul>
      </div>
    </div>
  );
}
