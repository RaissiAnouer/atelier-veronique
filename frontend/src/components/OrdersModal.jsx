import React, { useEffect, useState } from "react";
import { X, Package, Clock, CheckCircle, XCircle } from "lucide-react";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";

const OrdersModal = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axiosConfig.get(API_ENDPOINTS.MY_ORDERS, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
      setOrders(response.data.sort((a,b) => new Date(b.orderDate) - new Date(a.orderDate)));
    } catch (error) {
      console.error("Failed to fetch orders", error);
      toast.error("Failed to load your orders");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <Clock className="text-yellow-500 w-5 h-5" />;
      case "DELIVERED":
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case "CANCELLED":
        return <XCircle className="text-red-500 w-5 h-5" />;
      default:
        return <Package className="text-blue-500 w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 min-h-screen z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white mx-4 w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <Package className="text-gray-700 w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">My Orders</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
              <p className="text-gray-500 text-sm">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium text-lg">No orders found</p>
              <p className="text-gray-400 text-sm mt-1">Looks like you haven't made any purchases yet.</p>
              <button 
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center justify-between border-b border-gray-50 pb-4 mb-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Order #{order.trackingCode || order.id}</p>
                      <p className="text-sm text-gray-700 font-medium">
                        {new Date(order.orderDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-semibold text-gray-700 capitalize">{String(order.status).toLowerCase()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {order.orderItems && order.orderItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 font-medium">{item.quantity}x</span>
                          <span className="text-gray-800">{item.productTitle || item.productId}</span>
                        </div>
                        <span className="text-gray-600 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
                    <span className="text-sm text-gray-500">Shipping: {order.shippingMethod || "Standard"}</span>
                    <p className="text-base font-bold text-gray-900">
                      Total: ${order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersModal;
