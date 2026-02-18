import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ChevronRight,
  Truck,           // ← added
  ShoppingBag,     // if using in empty cart
  Lock,
  CheckCircle2,         // if using in summary header
} from "lucide-react";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, getCartAmount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const temp = [];
      for (const id in cartItems) {
        for (const size in cartItems[id]) {
          if (cartItems[id][size] > 0) {
            temp.push({ _id: id, size, quantity: cartItems[id][size] });
          }
        }
      }
      setCartData(temp);
    }
  }, [cartItems, products]);

  // ────────────────────────────────────────────────
  // Empty Cart State – Modern & inviting
  // ────────────────────────────────────────────────
  if (cartData.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-5 py-20">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto bg-amber-100/50 rounded-full flex items-center justify-center mb-8 shadow-md">
            <ShoppingBag size={40} className="text-amber-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Looks like you haven’t added anything yet.<br />
            Let’s find something you’ll love!
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium rounded-full hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Your Cart
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            {cartData.length} {cartData.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ────────────────────────────────────────────────
              LEFT: Cart Items – Modern product cards
          ──────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6 lg:space-y-8">
            {cartData.map((item) => {
              const product = products.find((p) => p._id === item._id);
              if (!product) return null;

              return (
                <div
                  key={`${item._id}-${item.size}`}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <Link
                      to={`/product/${product._id}`}
                      className="sm:w-48 md:w-56 lg:w-64 shrink-0 overflow-hidden bg-gray-50"
                    >
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-full h-64 sm:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                      <div>
                        <Link to={`/product/${product._id}`}>
                          <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 group-hover:text-amber-700 transition-colors duration-200">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="mt-3 space-y-1.5 text-gray-600 text-sm lg:text-base">
                          <p>
                            Size: <span className="font-medium text-gray-900">{item.size}</span>
                          </p>
                          <p className="font-medium text-amber-700">
                            {currency}{product.price.toLocaleString()} × {item.quantity}
                          </p>
                        </div>

                        <p className="mt-5 text-2xl lg:text-3xl font-bold text-gray-900">
                          {currency}{(product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity + Remove */}
                      <div className="flex items-center justify-between mt-6 lg:mt-8">
                        <div className="flex items-center bg-gray-100/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/60">
                          <button
                            onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2.5 hover:bg-gray-200 rounded-full transition disabled:opacity-40"
                          >
                            <Minus size={18} />
                          </button>

                          <span className="w-12 text-center font-semibold text-lg">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                            className="p-2.5 hover:bg-gray-200 rounded-full transition"
                          >
                            <Plus size={18} />
                          </button>
                        </div>

                        <button
                          onClick={() => updateQuantity(item._id, item.size, 0)}
                          className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50/60 rounded-full transition duration-200"
                          aria-label="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ────────────────────────────────────────────────
              RIGHT: Sticky Summary + CTA
          ──────────────────────────────────────────────── */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
              <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <h2 className="text-xl font-semibold flex items-center gap-2.5 text-gray-900">
                  <Lock size={20} className="text-amber-600" />
                  Order Summary
                </h2>
              </div>

              <div className="p-6 lg:p-8">
                <CartTotal getCartAmount={getCartAmount} isCartPage={true} />
              </div>
            </div>

            <button
              onClick={() => navigate("/place-order")}
              className="w-full py-5 px-8 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:from-amber-700 hover:to-amber-800 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              Proceed to Checkout
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-center text-sm text-gray-500 flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2">
                <Truck size={16} className="text-amber-600" />
                Shipping calculated at checkout
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                Secure & Encrypted
              </div>
            </div>

            <div className="text-center mt-6">
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-700 font-medium transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;