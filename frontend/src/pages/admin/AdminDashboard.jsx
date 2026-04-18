import React, { useEffect, useState } from "react";
import axiosConfig from "../../utils/axiosConfig";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";
import toast from "react-hot-toast";
import {
  ShoppingBag,
  BookOpen,
  Users,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const StatCard = ({ icon: Icon, label, value, color, bgColor, link }) => (
  <Link
    to={link}
    className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-4 hover:shadow-md transition-all duration-300 group"
  >
    <div className={`p-3 rounded-xl ${bgColor}`}>
      <Icon size={20} className={color} />
    </div>
    <div className="flex-1">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">
        {label}
      </p>
    </div>
    <ArrowUpRight
      size={16}
      className="text-gray-300 group-hover:text-[#C9A96E] transition-colors"
    />
  </Link>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    blogs: 0,
    customers: 0,
    orderCounts: {},
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [productsRes, blogsRes, customersRes, orderCountsRes, ordersRes] =
          await Promise.all([
            axiosConfig.get(API_ENDPOINTS.GETCOLLECTION),
            axiosConfig.get(API_ENDPOINTS.GETBLOGS),
            axiosConfig.get(API_ENDPOINTS.GET_PROFILES),
            axiosConfig.get(API_ENDPOINTS.ORDER_COUNTS),
            axiosConfig.get(API_ENDPOINTS.ALL_ORDERS),
          ]);

        setStats({
          products: productsRes.data?.length || 0,
          blogs: blogsRes.data?.length || 0,
          customers: customersRes.data?.length || 0,
          orderCounts: orderCountsRes.data || {},
        });

        setRecentOrders((ordersRes.data || []).slice(0, 5));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const STATUS_STYLES = {
    PENDING: {
      color: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      dot: "bg-amber-500",
    },
    PROCESSING: {
      color: "text-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200",
      dot: "bg-blue-500",
    },
    SHIPPED: {
      color: "text-purple-700",
      bg: "bg-purple-50",
      border: "border-purple-200",
      dot: "bg-purple-500",
    },
    DELIVERED: {
      color: "text-green-700",
      bg: "bg-green-50",
      border: "border-green-200",
      dot: "bg-green-500",
    },
    CANCELLED: {
      color: "text-red-700",
      bg: "bg-red-50",
      border: "border-red-200",
      dot: "bg-red-500",
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A96E] uppercase mb-2">
          Overview
        </p>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1.5 text-sm">
          Welcome back. Here's what's happening with your store.
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={ShoppingBag}
          label="Products"
          value={stats.products}
          color="text-[#C9A96E]"
          bgColor="bg-[#C9A96E]/10"
          link="/admin/products"
        />
        <StatCard
          icon={BookOpen}
          label="Blog Posts"
          value={stats.blogs}
          color="text-blue-500"
          bgColor="bg-blue-50"
          link="/admin/blogs"
        />
        <StatCard
          icon={Users}
          label="Customers"
          value={stats.customers}
          color="text-emerald-500"
          bgColor="bg-emerald-50"
          link="/admin/customers"
        />
        <StatCard
          icon={Package}
          label="Total Orders"
          value={stats.orderCounts.total || 0}
          color="text-violet-500"
          bgColor="bg-violet-50"
          link="/admin/orders"
        />
      </div>

      {/* Order Status Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {[
          {
            key: "PENDING",
            label: "Pending",
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            key: "PROCESSING",
            label: "Processing",
            icon: Package,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            key: "SHIPPED",
            label: "Shipped",
            icon: Truck,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            key: "DELIVERED",
            label: "Delivered",
            icon: CheckCircle2,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            key: "CANCELLED",
            label: "Cancelled",
            icon: XCircle,
            color: "text-red-500",
            bg: "bg-red-50",
          },
        ].map(({ key, label, icon: Icon, color, bg }) => (
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
              {stats.orderCounts[key] || 0}
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">Recent Orders</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Latest customer orders
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="text-sm text-[#C9A96E] font-medium hover:underline"
          >
            View all →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Package size={36} className="text-gray-200 mb-3" />
            <p className="font-medium text-gray-500">No orders yet</p>
            <p className="text-sm mt-1">
              Orders will appear here once customers place them.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase text-gray-400 tracking-[0.15em] bg-gray-50/60">
                  <th className="px-8 py-4 font-semibold">Order</th>
                  <th className="px-8 py-4 font-semibold">Customer</th>
                  <th className="px-8 py-4 font-semibold">Date</th>
                  <th className="px-8 py-4 font-semibold">Amount</th>
                  <th className="px-8 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => {
                  const style = STATUS_STYLES[order.status] || STATUS_STYLES.PENDING;
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="px-8 py-4">
                        <span className="text-sm font-bold text-gray-800">
                          #{order.id}
                        </span>
                      </td>
                      <td className="px-8 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {order.fullName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {order.userEmail}
                        </p>
                      </td>
                      <td className="px-8 py-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-4 text-sm font-semibold text-gray-800">
                        {order.totalAmount?.toFixed(2)} TND
                      </td>
                      <td className="px-8 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${style.color} ${style.bg} ${style.border}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${style.dot}`}
                          />
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
