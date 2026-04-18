import React, { useEffect, useState, useCallback } from "react";
import axiosConfig from "../../utils/axiosConfig";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";
import toast from "react-hot-toast";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Search,
  ChevronDown,
  MapPin,
  User,
  Hash,
  Phone,
} from "lucide-react";

const STATUS_CONFIG = {
  PENDING: {
    label: "Pending",
    color: "text-amber-700 bg-amber-50 border-amber-200",
    dot: "bg-amber-500",
    icon: Clock,
  },
  PROCESSING: {
    label: "Processing",
    color: "text-blue-700 bg-blue-50 border-blue-200",
    dot: "bg-blue-500",
    icon: Package,
  },
  SHIPPED: {
    label: "Shipped",
    color: "text-purple-700 bg-purple-50 border-purple-200",
    dot: "bg-purple-500",
    icon: Truck,
  },
  DELIVERED: {
    label: "Delivered",
    color: "text-green-700 bg-green-50 border-green-200",
    dot: "bg-green-500",
    icon: CheckCircle2,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "text-red-700 bg-red-50 border-red-200",
    dot: "bg-red-500",
    icon: XCircle,
  },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

const STATUSES = [
  "all",
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [counts, setCounts] = useState({});

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const [ordersRes, countsRes] = await Promise.all([
        axiosConfig.get(API_ENDPOINTS.ALL_ORDERS),
        axiosConfig.get(API_ENDPOINTS.ORDER_COUNTS),
      ]);
      setOrders(ordersRes.data || []);
      setCounts(countsRes.data || {});
    } catch (err) {
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      String(o.id).includes(searchQuery) ||
      o.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.city?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const onStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axiosConfig.put(
        API_ENDPOINTS.UPDATE_ORDER_STATUS(orderId),
        { status: newStatus }
      );
      if (res.status === 200) {
        toast.success(`Order #${orderId} updated to ${newStatus.toLowerCase()}`);
        fetchOrders();
      }
    } catch (err) {
      toast.error("Failed to update order status.");
    }
  };

  return (
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
          {
            key: "PENDING",
            label: "Pending",
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            key: "PROCESSING",
            label: "Processing",
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            key: "SHIPPED",
            label: "Shipped",
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            key: "DELIVERED",
            label: "Delivered",
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            key: "CANCELLED",
            label: "Cancelled",
            color: "text-red-500",
            bg: "bg-red-50",
          },
        ].map(({ key, label, color, bg }) => {
          const Icon = STATUS_CONFIG[key].icon;
          return (
            <div
              key={key}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg ${bg}`}>
                  <Icon size={14} className={color} />
                </div>
              </div>
              <p className={`text-2xl font-bold ${color}`}>
                {counts[key] || 0}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">
                {label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center gap-4 flex-wrap">
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
                {s === "all" ? "All" : s.toLowerCase()} (
                {s === "all" ? counts.total || 0 : counts[s] || 0})
              </button>
            ))}
          </div>

          <div className="relative">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
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
        {loading ? (
          <div className="flex items-center justify-center py-24 text-gray-400">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Loading orders...</p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <Package size={36} className="text-gray-200 mb-3" />
            <p className="font-medium text-gray-500">No orders found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((order) => {
              const isExpanded = expandedOrder === order.id;
              return (
                <div
                  key={order.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  {/* Order Row */}
                  <div
                    className="px-8 py-5 flex items-center gap-6 cursor-pointer"
                    onClick={() =>
                      setExpandedOrder(isExpanded ? null : order.id)
                    }
                  >
                    <div className="flex items-center gap-2 w-24 shrink-0">
                      <Hash size={13} className="text-gray-400" />
                      <span className="text-sm font-bold text-gray-800">
                        {order.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#C9A96E]/15 flex items-center justify-center shrink-0">
                        <User size={14} className="text-[#C9A96E]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {order.fullName}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                          <MapPin size={10} />
                          {order.city || "—"}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block w-32 shrink-0">
                      <p className="text-xs text-gray-400">
                        {order.items?.length || 0} item
                        {(order.items?.length || 0) !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="w-28 shrink-0">
                      <p className="text-sm font-bold text-gray-900">
                        {order.totalAmount?.toFixed(2)} TND
                      </p>
                      <p className="text-xs text-gray-400">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>

                    <div className="w-36 shrink-0">
                      <StatusBadge status={order.status} />
                    </div>

                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
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
                            {order.items?.map((item, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3"
                              >
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt=""
                                    className="w-10 h-10 object-cover rounded-lg"
                                  />
                                )}
                                <span className="text-sm text-gray-700 font-medium">
                                  {item.productName}
                                </span>
                                <span className="text-xs text-gray-400 ml-auto">
                                  Qty: {item.quantity} · Size:{" "}
                                  {item.size || "—"} ·{" "}
                                  {item.price?.toFixed(2)} TND
                                </span>
                              </div>
                            ))}
                            {(!order.items || order.items.length === 0) && (
                              <p className="text-sm text-gray-400">
                                No items data available
                              </p>
                            )}
                          </div>

                          {/* Shipping Info */}
                          <div className="mt-4 space-y-1">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                              Shipping Details
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.address || "No address provided"}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Phone size={12} />
                              {order.phone || "—"}
                            </div>
                            <p className="text-sm text-gray-400">
                              {order.userEmail}
                            </p>
                          </div>
                        </div>

                        {/* Update Status */}
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                            Update Status
                          </p>
                          <div className="flex flex-col gap-2">
                            {[
                              "PENDING",
                              "PROCESSING",
                              "SHIPPED",
                              "DELIVERED",
                              "CANCELLED",
                            ].map((s) => (
                              <button
                                key={s}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onStatusChange(order.id, s);
                                }}
                                className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize border transition-all text-left ${
                                  order.status === s
                                    ? STATUS_CONFIG[s].color +
                                      " border-current"
                                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                                }`}
                              >
                                {s.toLowerCase()}
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
  );
};

export default AdminOrdersPage;
