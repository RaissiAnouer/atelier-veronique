import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Plus, LayoutGrid, Package, LogOut } from "lucide-react";

const navItems = [
  {
    to: "/admin/add",
    label: "Add Content",
    icon: Plus,
    description: "Product or Blog",
  },
  {
    to: "/admin/list",
    label: "All Items",
    icon: LayoutGrid,
    description: "Products & Blogs",
  },
  {
    to: "/admin/orders",
    label: "Orders",
    icon: Package,
    description: "Track & manage",
  },
];

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#F7F5F2]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A1A] flex flex-col shrink-0 sticky top-0 h-screen">
        {/* Brand */}
        <div className="px-8 py-8 border-b border-white/10">
          <p className="text-[10px] font-semibold tracking-[0.35em] text-[#C9A96E] uppercase mb-1">
            Atelier
          </p>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Véronique
          </h2>
          <p className="text-[10px] text-white/30 tracking-widest uppercase mt-0.5">
            Admin Panel
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <p className="px-4 text-[9px] font-bold text-white/25 uppercase tracking-[0.3em] mb-3">
            Management
          </p>
          {navItems.map(({ to, label, icon: Icon, description }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#C9A96E] text-[#1A1A1A] shadow-lg shadow-[#C9A96E]/20"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1.5 rounded-lg transition-all ${
                      isActive
                        ? "bg-[#1A1A1A]/15"
                        : "bg-white/5 group-hover:bg-white/10"
                    }`}
                  >
                    <Icon size={15} strokeWidth={2} />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold leading-none mb-0.5 ${
                        isActive ? "text-[#1A1A1A]" : ""
                      }`}
                    >
                      {label}
                    </p>
                    <p
                      className={`text-[10px] leading-none ${
                        isActive ? "text-[#1A1A1A]/60" : "text-white/30"
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 pb-6">
          <NavLink
            to="/home"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/5 transition-all duration-200"
          >
            <LogOut size={15} />
            <span className="text-sm">Exit Dashboard</span>
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
