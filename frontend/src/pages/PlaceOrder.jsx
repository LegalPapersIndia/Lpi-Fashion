import React, { useContext, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import CartTotal from "../components/CartTotal";
import axios from "axios";
import { toast } from "react-toastify";
import { Package, Smartphone, ArrowRight } from "lucide-react";

const PlaceOrder = () => {
  const {
    token,
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "India",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    try {
      // Build order items array
      const orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const productData = products.find((p) => p._id === itemId);
            if (productData) {
              orderItems.push({
                _id: itemId,
                name: productData.name,
                price: productData.price,
                image: productData.image,
                size,
                quantity: cartItems[itemId][size],
              });
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + (deliveryFee || 0),
      };

      // Cash on Delivery
      if (method === "cod") {
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          { headers: { token } }
        );

        if (response.data.success) {
          setCartItems({});
          toast.success("Order placed successfully!");
          navigate("/orders");
        } else {
          toast.error(response.data.message || "Failed to place order");
        }
      }

      // Online Payment (PhonePe / UPI)
      if (method === "phonepe") {
        const response = await axios.post(
          `${backendUrl}/api/order/phonepe`,
          orderData,
          { headers: { token } }
        );

        if (response.data.success) {
          window.location.replace(response.data.paymentUrl);
        } else {
          toast.error(response.data.message || "Payment failed to start");
        }
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <section className="py-12 lg:py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Review your information and complete your order
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left: Delivery Address */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Delivery Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                required
                name="firstName"
                value={formData.firstName}
                onChange={onChangeHandler}
                placeholder="First Name"
                className="px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
              />
              <input
                required
                name="lastName"
                value={formData.lastName}
                onChange={onChangeHandler}
                placeholder="Last Name"
                className="px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
              />
            </div>

            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              placeholder="Email Address"
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
            />

            <input
              required
              name="street"
              value={formData.street}
              onChange={onChangeHandler}
              placeholder="Street Address"
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                required
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                placeholder="City"
                className="px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
              />
              <input
                required
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                placeholder="State"
                className="px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                required
                name="zipcode"
                value={formData.zipcode}
                onChange={onChangeHandler}
                placeholder="PIN Code"
                className="px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
              />
              <input
                required
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                placeholder="Country"
                className="px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
              />
            </div>

            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              placeholder="Phone Number"
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
            />
          </div>

          {/* Right: Order Summary + Payment */}
          <div className="space-y-8">
            <CartTotal />

            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 lg:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Payment Method
              </h3>

              <div className="space-y-4">
                {/* Online Payment */}
                <label
                  className={`flex items-center gap-4 p-5 border-2 rounded-lg cursor-pointer transition-all ${
                    method === "phonepe"
                      ? "border-amber-600 bg-amber-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="phonepe"
                    checked={method === "phonepe"}
                    onChange={() => setMethod("phonepe")}
                    className="w-5 h-5 text-amber-600"
                  />
                  <Smartphone className="w-6 h-6 text-amber-700" />
                  <div>
                    <p className="font-medium">UPI, Cards & Net Banking</p>
                    <p className="text-sm text-gray-500">Secure payment via PhonePe</p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`flex items-center gap-4 p-5 border-2 rounded-lg cursor-pointer transition-all ${
                    method === "cod"
                      ? "border-amber-600 bg-amber-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={method === "cod"}
                    onChange={() => setMethod("cod")}
                    className="w-5 h-5 text-amber-600"
                  />
                  <Package className="w-6 h-6 text-amber-700" />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when you receive</p>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPlacingOrder}
                className="w-full mt-8 py-4 bg-gray-900 text-white font-semibold text-lg rounded-lg hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition flex items-center justify-center gap-3"
              >
                {isPlacingOrder ? (
                  "Processing..."
                ) : (
                  <>
                    Complete Order
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="mt-6 text-center text-sm text-gray-600">
                Secure checkout • Free returns • Fast delivery
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PlaceOrder;