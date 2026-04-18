import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import Input from "../components/Input";
import { ShieldCheck, Package, ArrowLeft, CreditCard } from "lucide-react";

const CheckoutPage = () => {
  const { cart, setCart } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [fetchingCart, setFetchingCart] = useState(true);
  const navigate = useNavigate();

  // Shipping info
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosConfig.get(API_ENDPOINTS.GETCART);
        if (response.status === 200) setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setFetchingCart(false);
      }
    };
    fetchCart();
  }, [setCart]);

  const cartItems = cart?.products || [];
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      // 1. Create payment intent
      const paymentRes = await axiosConfig.post(
        API_ENDPOINTS.CREATE_PAYMENT_INTENT,
        { amount: totalPrice }
      );

      if (!paymentRes.data?.clientSecret) {
        throw new Error("Failed to create payment");
      }

      // 2. Create order
      const orderPayload = {
        fullName,
        city,
        address,
        phone,
        totalAmount: totalPrice,
        items: cartItems.map((item) => ({
          productName: item.productName,
          size: item.productSize || "",
          quantity: item.quantity,
          price: item.price,
          image: item.images?.[0] || "",
        })),
      };

      const orderRes = await axiosConfig.post(
        API_ENDPOINTS.CREATE_ORDER,
        orderPayload
      );

      if (orderRes.status === 201) {
        // 3. Clear cart items
        for (const item of cartItems) {
          try {
            await axiosConfig.delete(
              API_ENDPOINTS.REMOVEFROMCART(item.productSizeId)
            );
          } catch (e) {
            // Continue even if one fails
          }
        }

        toast.success("Order placed successfully!");
        setCart({ products: [], totalPrice: 0 });
        navigate("/order-success", {
          state: { orderId: orderRes.data.id, total: totalPrice },
        });
      }
    } catch (err) {
      toast.error(err.message || "Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingCart) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-2 border-[#825E3F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back</span>
          </button>
          <h1 className="text-lg font-bold tracking-widest uppercase text-gray-800">
            Checkout
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <ShieldCheck size={14} />
            Secure Checkout
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Shipping Form — Left */}
          <form
            onSubmit={handleCheckout}
            className="lg:col-span-3 space-y-8"
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Shipping Information
              </h2>

              <div className="space-y-5">
                <Input
                  label="FULL NAME"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />

                <Input
                  label="PHONE"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+216 XX XXX XXX"
                  required
                />

                <Input
                  label="CITY"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Your city"
                  required
                />

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Address
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 h-24 focus:ring-2 focus:ring-[#825E3F] outline-none text-sm"
                    placeholder="Full delivery address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard size={20} className="text-[#825E3F]" />
                <h2 className="text-lg font-bold text-gray-900">Payment</h2>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Payment will be processed securely via Stripe. Your card details
                are never stored on our servers.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500">
                  Stripe payment is handled securely on submission.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || cartItems.length === 0}
              className="w-full bg-[#1A1A1A] text-white py-4 rounded-xl text-sm font-bold tracking-widest uppercase hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              {loading
                ? "PROCESSING..."
                : `PLACE ORDER · ${totalPrice.toFixed(2)} TND`}
            </button>
          </form>

          {/* Order Summary — Right */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-gray-400">
                  <Package size={32} className="mb-2 text-gray-200" />
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item, i) => (
                      <div key={i} className="flex gap-4 items-center">
                        <img
                          src={item.images?.[0] || ""}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-xl border border-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {item.productName}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Size: {item.productSize || "—"} · Qty:{" "}
                            {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-800 shrink-0">
                          {(item.price * item.quantity).toFixed(2)} TND
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span>{totalPrice.toFixed(2)} TND</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100">
                      <span>Total</span>
                      <span>{totalPrice.toFixed(2)} TND</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
