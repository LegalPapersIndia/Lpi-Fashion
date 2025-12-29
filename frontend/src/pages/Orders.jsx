import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { Package, Truck, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allItems = [];
        response.data.orders.reverse().forEach((order) => {  // Latest orders first
          order.items.forEach((item) => {
            allItems.push({
              ...item,
              orderId: order._id,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allItems);
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusInfo = (status) => {
    const lower = status?.toLowerCase();
    switch (lower) {
      case "delivered":
        return { icon: <CheckCircle2 className="w-5 h-5" />, color: "text-green-600", bg: "bg-green-50" };
      case "shipped":
      case "out for delivery":
        return { icon: <Truck className="w-5 h-5" />, color: "text-blue-600", bg: "bg-blue-50" };
      case "processing":
        return { icon: <Clock className="w-5 h-5" />, color: "text-amber-600", bg: "bg-amber-50" };
      default:
        return { icon: <Package className="w-5 h-5" />, color: "text-gray-600", bg: "bg-gray-50" };
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-amber-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (orderData.length === 0) {
    return (
      <section className="min-h-screen bg-gray-50 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            No Orders Yet
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Start your journey with something special from our collection.
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition"
          >
            Explore Collection
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    );
  }

  // Main Orders View
  return (
    <section className="py-16 lg:py-24 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            My Orders
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {orderData.length} {orderData.length === 1 ? "item" : "items"} purchased
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-8">
          {orderData.map((item) => {
            const statusInfo = getStatusInfo(item.status);

            return (
              <div
                key={`${item.orderId}-${item._id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6 lg:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

                    {/* Product Info */}
                    <div className="flex items-center gap-5">
                      <div className="shrink-0">
                        <img
                          src={item.image[0]}
                          alt={item.name}
                          className="w-24 h-32 object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          Size: {item.size} • Qty: {item.quantity}
                        </p>
                        <p className="text-xl font-bold text-gray-900 mt-3">
                          {currency}{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="text-center lg:text-left">
                      <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full ${statusInfo.bg}`}>
                        {statusInfo.icon}
                        <span className={`font-medium capitalize ${statusInfo.color}`}>
                          {item.status || "Pending"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-3">
                        Ordered on {new Date(item.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="text-center lg:text-right">
                      <button
                        onClick={loadOrderData}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:border-amber-600 hover:text-amber-600 transition font-medium"
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Orders;