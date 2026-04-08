import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import axiosConfig from "../utils/axiosConfig";
import toast from "react-hot-toast";
import {
  Package, Clock, CheckCircle2, Truck, XCircle,
  Search, ChevronDown, MapPin, User, Hash,
} from "lucide-react";

// Placeholder orders data — replace with real API call when backend is ready
const MOCK_ORDERS = [
  {
    id: "ORD-00124",
    customer: "Mohamed Ali",
    email: "m.ali@email.com",
    items: [{ name: "Linen Summer Shirt", qty: 2, size: "M" }],
    total: 189.0,
    status: "shipped",
    date: "2026-04-05",
    city: "Tunis",
  },
  {
    id: "ORD-00123",
    customer: "Sara Ben Youssef",
    email: "sara.by@email.com",
    items: [{ name: "Merino Wool Knitwear", qty: 1, size: "S" }],
    total: 230.0,
    status: "processing",
    date: "2026-04-04",
    city: "Sfax",
  },
  {
    id: "ORD-00122",
    customer: "Karim Mansour",
    email: "karim.m@email.com",
    items: [
      { name: "Classic Suit", qty: 1, size: "L" },
      { name: "Silk Tie", qty: 2, size: "One Size" },
    ],
    total: 680.0,
    status: "delivered",
    date: "2026-04-03",
    city: "Monastir",
  },
  {
    id: "ORD-00121",
    customer: "Leila Trabelsi",
    email: "leila.t@email.com",
    items: [{ name: "Cashmere Scarve", qty: 1, size: "One Size" }],
    total: 145.0,
    status: "pending",
    date: "2026-04-02",
    city: "Sousse",
  },
  {
    id: "ORD-00120",
    customer: "Anis Bouaziz",
    email: "anis.b@email.com",
    items: [{ name: "Tailored Jacket", qty: 1, size: "XL" }],
    total: 420.0,
    status: "cancelled",
    date: "2026-04-01",
    city: "Nabeul",
  },
];

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "text-amber-700 bg-amber-50 border-amber-200",
    dot: "bg-amber-500",
    icon: Clock,
  },
  processing: {
    label: "Processing",
    color: "text-blue-700 bg-blue-50 border-blue-200",
    dot: "bg-blue-500",
    icon: Package,
  },
  shipped: {
    label: "Shipped",
    color: "text-purple-700 bg-purple-50 border-purple-200",
    dot: "bg-purple-500",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "text-green-700 bg-green-50 border-green-200",
    dot: "bg-green-500",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-700 bg-red-50 border-red-200",
    dot: "bg-red-500",
    icon: XCircle,
  },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

const STATUSES = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = s === "all" ? orders.length : orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  const onStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    toast.success(`Order ${orderId} updated to ${newStatus}`);
  };

  return (
    <AdminLayout>
      <div className="p-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A96E] uppercase mb-2">
            Fulfillment
          </p>
          <h1 className="text-3xl font-bold text-gray-900">Order Tracking</h1>
          <p className="text-gray-500 mt-1.5 text-sm">
            Monitor and manage all customer orders.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {[
            { key: "pending", label: "Pending", color: "text-amber-600", bg: "bg-amber-50" },
            { key: "processing", label: "Processing", color: "text-blue-600", bg: "bg-blue-50" },
            { key: "shipped", label: "Shipped", color: "text-purple-600", bg: "bg-purple-50" },
            { key: "delivered", label: "Delivered", color: "text-green-600", bg: "bg-green-50" },
            { key: "cancelled", label: "Cancelled", color: "text-red-500", bg: "bg-red-50" },
          ].map(({ key, label, color, bg }) => {
            const Icon = STATUS_CONFIG[key].icon;
            return (
              <div key={key} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-lg ${bg}`}>
                    <Icon size={14} className={color} />
                  </div>
                </div>
                <p className={`text-2xl font-bold ${color}`}>{counts[key]}</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            );
          })}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="px-8 py-5 border-b border-gray-100 flex items-center gap-4 flex-wrap">
            {/* Status filter pills */}
            <div className="flex gap-2 flex-wrap flex-1">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    statusFilter === s
                      ? "bg-[#1A1A1A] text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {s === "all" ? "All" : s} ({counts[s]})
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] w-52 transition-all"
              />
            </div>
          </div>

          {/* Orders List */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <Package size={36} className="text-gray-200 mb-3" />
              <p className="font-medium text-gray-500">No orders found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map((order) => {
                const isExpanded = expandedOrder === order.id;
                return (
                  <div key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Order Row */}
                    <div
                      className="px-8 py-5 flex items-center gap-6 cursor-pointer"
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    >
                      {/* Order ID */}
                      <div className="flex items-center gap-2 w-32 shrink-0">
                        <Hash size={13} className="text-gray-400" />
                        <span className="text-sm font-bold text-gray-800">{order.id.replace("ORD-", "")}</span>
                      </div>

                      {/* Customer */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-[#C9A96E]/15 flex items-center justify-center shrink-0">
                          <User size={14} className="text-[#C9A96E]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{order.customer}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                            <MapPin size={10} />
                            {order.city}
                          </div>
                        </div>
                      </div>

                      {/* Items summary */}
                      <div className="hidden md:block w-40 shrink-0">
                        <p className="text-xs text-gray-400">
                          {order.items.length} item{order.items.length > 1 ? "s" : ""}
                        </p>
                      </div>

                      {/* Total */}
                      <div className="w-28 shrink-0">
                        <p className="text-sm font-bold text-gray-900">{order.total.toFixed(2)} TND</p>
                        <p className="text-xs text-gray-400">{order.date}</p>
                      </div>

                      {/* Status */}
                      <div className="w-36 shrink-0">
                        <StatusBadge status={order.status} />
                      </div>

                      {/* Expand icon */}
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>

                    {/* Expanded Detail */}
                    {isExpanded && (
                      <div className="px-8 pb-6 bg-gray-50/70">
                        <div className="flex gap-10 flex-wrap">
                          {/* Order Items */}
                          <div className="flex-1 min-w-[200px]">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                              Order Items
                            </p>
                            <div className="space-y-2">
                              {order.items.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3"
                                >
                                  <Package size={14} className="text-[#C9A96E]" />
                                  <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                                  <span className="text-xs text-gray-400 ml-auto">
                                    Qty: {item.qty} · Size: {item.size}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Update Status */}
                          <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                              Update Status
                            </p>
                            <div className="flex flex-col gap-2">
                              {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                                <button
                                  key={s}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onStatusChange(order.id, s);
                                  }}
                                  className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize border transition-all text-left ${
                                    order.status === s
                                      ? STATUS_CONFIG[s].color + " border-current"
                                      : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                                  }`}
                                >
                                  {s}
                                  {order.status === s && " ✓"}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
