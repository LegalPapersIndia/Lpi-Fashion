import React, { useContext, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import CartTotal from "../components/CartTotal";
import axios from "axios";
import { toast } from "react-toastify";
import {
  MapPin,
  CreditCard,
  Truck,
  Smartphone,
  ChevronRight,
  Lock,
  CheckCircle2,
} from "lucide-react";

const PlaceOrder = () => {
  const {
    token,
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    getCartAmount,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

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

  const [calculatedDeliveryFee, setCalculatedDeliveryFee] = useState(100);

  const lowFeeStates = ["Delhi", "Uttar Pradesh", "Haryana", "Rajasthan"];

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "zipcode" && value.length === 6 && /^\d{6}$/.test(value)) {
      fetchStateFromPin(value);
    }
  };

  const fetchStateFromPin = async (pin) => {
    setLoadingLocation(true);
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
      const data = response.data[0];

      if (data?.Status === "Success" && data?.PostOffice?.length > 0) {
        const postOffice = data.PostOffice[0];
        const state = postOffice.State?.trim() || "";

        setFormData((prev) => ({
          ...prev,
          city: postOffice.District || postOffice.Name || prev.city,
          state,
        }));

        setCalculatedDeliveryFee(lowFeeStates.includes(state) ? 50 : 100);
      } else {
        setCalculatedDeliveryFee(100);
      }
    } catch {
      setCalculatedDeliveryFee(100);
    } finally {
      setLoadingLocation(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    try {
      const orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const product = products.find((p) => p._id === itemId);
            if (product) {
              orderItems.push({
                _id: itemId,
                name: product.name,
                price: product.price,
                image: product.image,
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
        amount: getCartAmount() + calculatedDeliveryFee,
        shippingFee: calculatedDeliveryFee,
      };

      let response;

      if (method === "cod") {
        response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
          headers: { token },
        });
      } else if (method === "phonepe") {
        response = await axios.post(`${backendUrl}/api/order/phonepe`, orderData, {
          headers: { token },
        });

        if (response.data.success && response.data.paymentUrl) {
          window.location.replace(response.data.paymentUrl);
          return;
        }
      }

      if (response?.data.success) {
        setCartItems({});
        toast.success("Order placed successfully!");
        navigate("/orders");
      } else {
        toast.error(response?.data.message || "Failed to place order");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <Lock className="text-amber-600" size={28} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Secure Checkout
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Complete your order securely in just a few steps
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left column - Address + Payment */}
          <div className="lg:col-span-8 space-y-8 lg:space-y-10">
            {/* Delivery Information */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
              <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <h2 className="text-xl font-semibold flex items-center gap-3 text-gray-900">
                  <MapPin className="text-amber-600" size={22} />
                  Delivery Details
                </h2>
              </div>

              <div className="p-6 lg:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FloatingInput
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={onChangeHandler}
                  />
                  <FloatingInput
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={onChangeHandler}
                  />
                </div>

                <FloatingInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChangeHandler}
                />

                <FloatingInput
                  label="Street Address, House No., Landmark"
                  name="street"
                  value={formData.street}
                  onChange={onChangeHandler}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FloatingInput
                    label="City / Town"
                    name="city"
                    value={formData.city}
                    onChange={onChangeHandler}
                  />
                  <FloatingInput
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
                  <FloatingInput
                    label="PIN Code"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={onChangeHandler}
                    maxLength={6}
                  >
                    {loadingLocation && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="animate-spin h-5 w-5 border-2 border-amber-500 rounded-full border-t-transparent" />
                      </div>
                    )}
                  </FloatingInput>

                  <FloatingInput
                    label="Mobile Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="flex items-center gap-2.5 text-sm pt-2">
                  <Truck size={16} className="text-amber-600" />
                  <span className="text-gray-700">
                    Shipping:{" "}
                    <strong className="text-gray-900 font-medium">
                      ₹{calculatedDeliveryFee}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
              <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <h2 className="text-xl font-semibold flex items-center gap-3 text-gray-900">
                  <CreditCard className="text-amber-600" size={22} />
                  Payment Method
                </h2>
              </div>

              <div className="p-6 lg:p-8 space-y-4">
                <PaymentOption
                  id="phonepe"
                  label="UPI, Cards & Net Banking"
                  description="Secure payment via PhonePe"
                  icon={<Smartphone size={20} />}
                  checked={method === "phonepe"}
                  onChange={() => setMethod("phonepe")}
                />

                <PaymentOption
                  id="cod"
                  label="Cash on Delivery"
                  description="Pay when your order arrives"
                  icon={<Truck size={20} />}
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                />
              </div>
            </div>
          </div>

          {/* Right column - Summary + Button */}
          <div className="lg:col-span-4 space-y-8">
            <div className="lg:sticky lg:top-8">
              <CartTotal
                deliveryFee={calculatedDeliveryFee}
                getCartAmount={getCartAmount}
              />

              <button
                type="submit"
                disabled={isPlacingOrder || loadingLocation}
                className={`
                  mt-8 w-full py-5 px-8 rounded-2xl font-semibold text-lg
                  transition-all duration-300 shadow-lg
                  flex items-center justify-center gap-3 group
                  ${
                    isPlacingOrder || loadingLocation
                      ? "bg-gray-400 cursor-not-allowed text-white/80"
                      : "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white hover:shadow-xl hover:scale-[1.02]"
                  }
                `}
              >
                {isPlacingOrder ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order Securely
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                Secure & Encrypted Checkout
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

/* Floating label input */
const FloatingInput = ({ label, children, ...props }) => {
  const hasValue = props.value?.length > 0;

  return (
    <div className="relative">
      <input
        {...props}
        className={`
          peer w-full px-5 pt-6 pb-2 rounded-xl border border-gray-200
          focus:border-amber-500 focus:ring-4 focus:ring-amber-100/50
          bg-white/70 backdrop-blur-sm transition-all duration-200
          outline-none shadow-sm hover:border-gray-300
          ${hasValue ? "pt-6" : "pt-4"}
        `}
        placeholder=" "
      />
      <label
        className={`
          absolute left-5 text-gray-500 transition-all duration-200 pointer-events-none
          ${hasValue
            ? "text-xs top-2 text-amber-700 font-medium"
            : "text-base top-4 peer-focus:text-xs peer-focus:top-2 peer-focus:text-amber-700 peer-focus:font-medium"}
        `}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

/* Payment Option Card */
const PaymentOption = ({ id, label, description, icon, checked, onChange }) => (
  <label
    htmlFor={id}
    className={`
      flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all duration-200
      ${
        checked
          ? "border-amber-600 bg-amber-50/40 shadow-sm"
          : "border-gray-200 hover:border-gray-300 bg-white/60 hover:bg-white/80"
      }
    `}
  >
    <input
      type="radio"
      id={id}
      name="payment"
      checked={checked}
      onChange={onChange}
      className="w-5 h-5 text-amber-600 border-gray-300 focus:ring-amber-500"
    />
    <div className="ml-4 flex-1">
      <div className="flex items-center gap-3">
        <div className="text-amber-700">{icon}</div>
        <p className="font-medium text-gray-900">{label}</p>
      </div>
      <p className="text-sm text-gray-500 mt-0.5">{description}</p>
    </div>
  </label>
);

export default PlaceOrder;