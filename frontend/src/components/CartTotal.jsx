import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Truck, ShieldCheck, RefreshCw, Package } from "lucide-react";

const CartTotal = () => {
  const { currency, deliveryFee, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const total = subtotal + (deliveryFee || 0);
  const isFreeShipping = deliveryFee === 0;

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      {/* Clean & Professional Order Summary Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 lg:p-8 space-y-6">

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>

          {/* Subtotal */}
          <div className="flex justify-between items-center py-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-xl font-semibold text-gray-900">
              {currency}{subtotal.toLocaleString()}
            </span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between items-center py-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Truck className={`w-6 h-6 ${isFreeShipping ? "text-green-600" : "text-gray-600"}`} />
              <div>
                <p className="text-gray-800 font-medium">Shipping</p>
                {isFreeShipping && (
                  <p className="text-sm text-green-600 font-medium">
                    Free Shipping Applied
                  </p>
                )}
              </div>
            </div>
            <span className={`text-xl font-semibold ${isFreeShipping ? "text-green-600" : "text-gray-900"}`}>
              {isFreeShipping ? "FREE" : `${currency}${deliveryFee?.toLocaleString() || "0"}`}
            </span>
          </div>

          {/* Total */}
          <div className="pt-6 border-t-2 border-gray-300">
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-bold text-gray-900">Total</h4>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">
                  {currency}{total.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Including taxes & duties
                </p>
              </div>
            </div>
          </div>

          {/* Trust Badges – Simple & Reassuring */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-medium">100% Authentic Products</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <RefreshCw className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-medium">30-Day Returns</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Package className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-medium">Carefully Packaged</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Info – Clean & Helpful */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Estimated delivery:</span> 3–7 business days
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Ships worldwide with tracking
        </p>
      </div>
    </div>
  );
};

export default CartTotal;