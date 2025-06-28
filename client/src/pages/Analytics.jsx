import { useState, useEffect } from "react";
import axios from "axios";
import { BarChart3, Brain, RefreshCcw } from "lucide-react";
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

export default function Analytics() {
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [aiInsights, setAiInsights] = useState({
    top: "",
    trends: "",
    recs: "",
  });
  const [loading, setLoading] = useState(true);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [dataReady, setDataReady] = useState(false);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/orders"),
          axios.get("http://localhost:5000/api/products"),
        ]);

        const orders = ordersRes.data;
        const products = productsRes.data;

        // Process sales data
        const salesMap = {};
        orders.forEach((o) => {
          const date = new Date(o.createdAt).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          });
          salesMap[date] = (salesMap[date] || 0) + (o.total || 0);
        });
        setSalesData(
          Object.entries(salesMap).map(([date, sales]) => ({ date, sales })),
        );

        // Process category data
        const catMap = {};
        products.forEach((p) => {
          const cat = p.category || "Uncategorized";
          catMap[cat] = (catMap[cat] || 0) + 1;
        });
        setCategoryData(
          Object.entries(catMap).map(([category, count]) => ({
            category,
            count,
          })),
        );

        setDataReady(true);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Fetch AI insights only once when data is ready
  useEffect(() => {
    if (dataReady) {
      fetchInsights();
    }
  }, [dataReady]);

  const fetchInsights = async () => {
    if (!salesData.length || !categoryData.length) return;

    setInsightsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/ai/insights", {
        salesData,
        categoryData,
      });

      const raw = res.data.insights || "";
      const sections = { top: "", trends: "", recs: "" };

      const parts = raw.split(
        /(?=^Top Categories and Products:|^Sales Trends:|^Recommendations:)/gm,
      );

      parts.forEach((part) => {
        if (part.startsWith("Top Categories and Products:")) {
          sections.top = part
            .replace("Top Categories and Products:", "")
            .trim();
        } else if (part.startsWith("Sales Trends:")) {
          sections.trends = part.replace("Sales Trends:", "").trim();
        } else if (part.startsWith("Recommendations:")) {
          sections.recs = part.replace("Recommendations:", "").trim();
        }
      });

      setAiInsights(sections);
    } catch (err) {
      console.error("AI insight failed:", err);
      setAiInsights({
        top: "",
        trends: "",
        recs: "❌ Failed to generate AI insights.",
      });
    } finally {
      setInsightsLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-muted">Loading analytics...</div>;
  }

  return (
    <div className="space-y-8 rounded-lg bg-panel p-6 shadow-xl text-text">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-accent flex items-center gap-2">
          <BarChart3 size={26} /> Analytics Dashboard
        </h2>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-background p-5 rounded-lg shadow-md h-[260px]">
          <h3 className="text-lg font-semibold mb-2">📈 Daily Sales</h3>
          <ResponsiveContainer height="100%">
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
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-background p-5 rounded-lg shadow-md h-[260px]">
          <h3 className="text-lg font-semibold mb-2">📦 Product Categories</h3>
          <ResponsiveContainer height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="category"
                stroke="var(--text)"
                angle={-30}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="var(--text)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--panel)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />
              <Legend />
              <Bar
                dataKey="count"
                fill="var(--accent)"
                barSize={30}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-background p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="flex gap-2 text-lg font-semibold items-center">
            <Brain size={20} /> AI-Powered Insights
          </h3>
          <button
            onClick={fetchInsights}
            disabled={insightsLoading}
            className="flex items-center gap-1 rounded border border-border bg-panel px-3 py-1 text-sm
              hover:bg-muted disabled:opacity-50"
          >
            <RefreshCcw size={16} /> Refresh AI
          </button>
        </div>

        {insightsLoading ? (
          <div className="mt-4 flex items-center gap-3 text-muted">
            <span className="animate-spin h-5 w-5 rounded-full border-2 border-accent border-t-transparent"></span>
            Generating insights...
          </div>
        ) : (
          <div className="mt-4 grid gap-4">
            <div className="rounded-md border border-border bg-panel p-4 shadow-sm">
              <h4 className="text-accent font-semibold mb-2">
                🔝 Top Categories & Products
              </h4>
              <p className="text-muted whitespace-pre-line">{aiInsights.top}</p>
            </div>

            <div className="rounded-md border border-border bg-panel p-4 shadow-sm">
              <h4 className="text-accent font-semibold mb-2">
                📈 Sales Trends
              </h4>
              <p className="text-muted whitespace-pre-line">
                {aiInsights.trends}
              </p>
            </div>

            <div className="rounded-md border border-border bg-panel p-4 shadow-sm">
              <h4 className="text-accent font-semibold mb-2">
                🧠 Recommendations
              </h4>
              <p className="text-muted whitespace-pre-line">
                {aiInsights.recs}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
