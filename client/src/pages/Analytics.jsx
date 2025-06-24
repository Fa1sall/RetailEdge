import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { BarChart3 } from "lucide-react";

const salesData = [
  { date: "Jun 18", sales: 400 },
  { date: "Jun 19", sales: 300 },
  { date: "Jun 20", sales: 500 },
  { date: "Jun 21", sales: 200 },
  { date: "Jun 22", sales: 450 },
  { date: "Jun 23", sales: 600 },
];

const categoryData = [
  { category: "Electronics", count: 120 },
  { category: "Books", count: 80 },
  { category: "Clothing", count: 150 },
  { category: "Accessories", count: 90 },
];

export default function Analytics() {
  return (
    <div className="rounded-lg bg-panel p-4 shadow-md text-text">
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-accent">
        <BarChart3 size={24} />
        Analytics Overview
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Daily Sales Line Chart */}
        <div className="rounded-xl bg-background p-4 shadow-lg">
          <h3 className="mb-2 text-lg font-semibold text-text">Daily Sales</h3>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--text)" />
                <YAxis stroke="var(--text)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--panel)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--accent)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Count Bar Chart */}
        <div className="rounded-xl bg-background p-4 shadow-lg">
          <h3 className="mb-2 text-lg font-semibold text-text">
            Product Categories
          </h3>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="category" stroke="var(--text)" />
                <YAxis stroke="var(--text)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--panel)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill="var(--accent)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
