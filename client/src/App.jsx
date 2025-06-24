import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import POS from "./pages/POS";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("dark"); // default: dark

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  return (
    <div className="flex h-screen w-screen bg-background text-text">
      {/* Sidebar */}
      <div
        className={`fixed z-20 transition-transform duration-300 ease-in-out md:static
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-panel p-4 md:hidden text-text">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <div className="text-2xl font-bold">
            Retail<span className="text-accent">Edge</span>
          </div>
        </div>

        {/* Pages */}
        <div className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pos" element={<POS />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route
              path="/settings"
              element={<Settings theme={theme} setTheme={setTheme} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
