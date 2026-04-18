import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Package, ArrowRight, Home } from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, total } = location.state || {};

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute w-24 h-24 bg-green-100 rounded-full animate-ping opacity-30" />
          <div className="relative w-20 h-20 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8 text-left">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#C9A96E]/10 rounded-xl">
              <Package size={20} className="text-[#C9A96E]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Order Number
              </p>
              <p className="text-lg font-bold text-gray-900">
                #{orderId || "—"}
              </p>
            </div>
          </div>

          {total && (
            <div className="flex justify-between items-center py-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Total Paid</span>
              <span className="text-lg font-bold text-gray-900">
                {Number(total).toFixed(2)} TND
              </span>
            </div>
          )}

          <div className="flex justify-between items-center py-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">Status</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border text-amber-700 bg-amber-50 border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Pending
            </span>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            You will receive an email confirmation shortly. We'll notify you when
            your order ships.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/collection")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate("/home")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
          >
            <Home size={16} />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
