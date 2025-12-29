import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
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

  // Empty Cart State
  if (cartData.length === 0) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center max-w-lg py-24">
          <div className="w-32 h-32 mx-auto bg-gray-200 rounded-2xl mb-8" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-lg text-gray-600 mb-10">
            Looks like you haven't added anything yet. Let's fix that!
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Your Cart</h1>
          <p className="mt-3 text-lg text-gray-600">
            {cartData.length} {cartData.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Main Grid: Products + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">

          {/* LEFT: Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cartData.map((item) => {
              const product = products.find((p) => p._id === item._id);
              if (!product) return null;

              return (
                <div
                  key={`${item._id}-${item.size}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row"
                >
                  {/* Product Image */}
                  <Link to={`/product/${product._id}`} className="md:w-64 shrink-0">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${product._id}`}>
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-amber-700 transition">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="mt-4 space-y-2 text-gray-600">
                        <p>Size: <span className="font-medium">{item.size}</span></p>
                      </div>
                      <p className="mt-6 text-2xl font-bold text-gray-900">
                        {currency}{(product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls & Remove */}
                    <div className="flex items-center justify-between mt-8">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-gray-200 rounded-full transition disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className="p-2 hover:bg-gray-200 rounded-full transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="text-gray-500 hover:text-red-600 transition"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Sticky Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <CartTotal />

              <button
                onClick={() => navigate("/place-order")}
                className="w-full mt-8 py-4 bg-gray-900 text-white font-semibold text-lg rounded-full hover:bg-gray-800 transition shadow-md"
              >
                Proceed to Checkout
              </button>

              <p className="mt-5 text-center text-sm text-gray-600">
                Free shipping • 30-day returns • Secure checkout
              </p>
            </div>
          </div>
        </div>

        {/* Continue Shopping Link */}
        <div className="text-center mt-16">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-gray-700 font-medium hover:text-amber-700 transition"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;