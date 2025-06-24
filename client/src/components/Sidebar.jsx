import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Package,
  Boxes,
  Users,
  BarChart2,
  Settings,
  Rocket,
  X,
} from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", label: "Home", icon: <Home size={20} />, path: "/" },
    {
      name: "POS",
      label: "Point of Sale",
      icon: <ShoppingCart size={20} />,
      path: "/pos",
    },
    {
      name: "Orders",
      label: "Orders",
      icon: <Package size={20} />,
      path: "/orders",
    },
    {
      name: "Inventory",
      label: "Inventory",
      icon: <Boxes size={20} />,
      path: "/inventory",
    },
    {
      name: "Customers",
      label: "Customers",
      icon: <Users size={20} />,
      path: "/customers",
    },
    {
      name: "Analytics",
      label: "Analytics",
      icon: <BarChart2 size={20} />,
      path: "/analytics",
    },
    {
      name: "Settings",
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-panel text-text shadow-xl relative">
      <div className="border-b border-border p-5 text-2xl font-bold">
        Retail<span className="text-accent">Edge</span>
        <button
          className="absolute right-4 top-5 cursor-pointer md:hidden"
          onClick={closeSidebar}
        >
          <X size={30} />
        </button>
      </div>

      <nav className="flex-1 flex-col space-y-1 overflow-y-auto px-2 py-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={item.name}
              className={`flex w-full items-center gap-3 rounded-md px-4 py-3 font-medium transition-all
              duration-100 text-sm ${
              isActive
                  ? "bg-accent text-white shadow-md"
                  : "text-muted hover:bg-border hover:text-white"
              }`}
              onClick={closeSidebar}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <a
        href="https://github.com/Fa1sall"
        className="flex gap-2 border-t border-border p-4 text-muted"
      >
        Build by Faisal <Rocket size={20} />
      </a>
    </div>
  );
};

export default Sidebar;
